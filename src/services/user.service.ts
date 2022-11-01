import {HASH_KEY} from "../app.constant";
import * as CryptoJS from 'crypto-js';
import * as jwt from "jsonwebtoken";
import {CatalogueGroupe, Role, User} from "../model";
import {ApolloError} from "apollo-server-express";
import {JWT} from "../middlewares/json-web-token.middleware";
import {TryCatch} from "../utils/error.handler";

export default {

    async create(payload) {
        return TryCatch(async () => {
            const isUserExist = await User.findOne({ pseudo: payload.pseudo });
            if (isUserExist) {
                return new ApolloError('User already exist!');
            }

            const password = CryptoJS.AES.encrypt(payload.password, HASH_KEY).toString();
            const user: any = await User.create({
                ...payload,
                connected: false,
                password
            });
            if (!payload.role) {
                const defaultRole: any = await Role.findOne({ name: 'TESTER' });
                user.role = defaultRole._id;
            }
            user.updatedAt = new Date();
            await user.save();
            await user.populate('role').execPopulate();
            return user;
        }, `Cannot create user.`)
    },

    getAll() {
        return TryCatch(() => User
                .find({}, { password: 0})
                .populate('role')
            , `Cannot get all users.`)
    },

    getById(id) {
        return TryCatch(() => User
                .findById(id, { password: 0})
                .populate('role')
            , `Cannot get user.`)
    },

    deleteById(id) {
        return TryCatch(() => User.findByIdAndDelete(id), `Cannot delete user.`);
    },

    updateById({_id, changes}) {
        return TryCatch(() => {
            if (changes.password) {
                changes.password = CryptoJS.AES.encrypt(changes.password, HASH_KEY).toString();
            } else {
                delete changes.password;
                delete changes.confirmPassword;
            }
            changes.updatedAt = new Date();
            return User.findByIdAndUpdate(_id, changes, {new: true})
                .populate('role')
        }, `Cannot update user.`)
    },

    login: async ({pseudo, password}) => {
        return TryCatch(async () => {
            const user: any = await User.findOne({pseudo});

            if(!user) {
                return new ApolloError('Identifiant ou mot de passe invalide.')
            }

            const pwd = CryptoJS.AES.decrypt(user.password, HASH_KEY).toString(CryptoJS.enc.Utf8);
            const check = password === pwd;

            if (check) {
                const isGroupe = await CatalogueGroupe.findOne({ _id: user.catalogueGroupe })
                if (!isGroupe?.active) {
                    return new ApolloError('Votre compte n\'est pas activé.')
                }
                user.connected = true;
                user.updatedAt = new Date();
                await user.save();
                await user.populate('role').execPopulate();
                const token = jwt.sign({
                    role: user.role && user.role.name,
                    _id: user._id
                }, HASH_KEY, { expiresIn: '24h' });

                return {...user._doc, token}
            } else {
                return new ApolloError('Identifiant ou mot de passe invalide.');
            }
        }, `Cannot login.`)
    },

    logout: async ({token, _id}) => {
        return TryCatch(async () => {
            const tokenInfo = await JWT(token);
            const userTokenId = tokenInfo?._id;

            if (_id && userTokenId) {
                try {
                    return await User.findByIdAndUpdate(_id, {
                        connected: false,
                        updatedAt: new Date()
                    });
                } catch(error) {
                    return new ApolloError('Erreur de déconnexion.')
                }
            }
        }, `Cannot logout.`)
    },

    validateToken: async (input) => {
        return TryCatch(async () => {
            const tokenInfo = await JWT(input);
            let user;
            if (tokenInfo?._id) {
                user = await User.findOne({ _id: tokenInfo._id }, {password: 0}).populate('role');
            }
            return { valid: !!(tokenInfo), user }
        }, `Cannot validate token.`)
    }
}
