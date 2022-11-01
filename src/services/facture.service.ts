import {Facture} from "../model";
import {TryCatch} from "../utils/error.handler";
import * as fs from "fs";
import * as QRCode from 'qrcode';
import {ANGULAR_HOST, APP_HOST} from "../app.constant";

export default {

    create(payload) {
        return TryCatch(async () => {
            payload.updatedAt = new Date();
            if (!fs.existsSync(process.cwd() + '/upload/qrcode')) {
                fs.mkdirSync(process.cwd() + '/upload/qrcode');
            }
            const facture: any = await new Facture(payload);
            const qrcodeData = `${ANGULAR_HOST}/facturation-view?reference_id=${facture._id}&reference=${payload?.reference}`;

            let fileData = await QRCode.toDataURL(qrcodeData);
            fileData = fileData.replace(/^data:image\/png;base64,/, "");
            fs.writeFileSync(`upload/qrcode/${facture._id}.png`, fileData, 'base64');

            facture.qrcode = `${APP_HOST}/upload/qrcode/${facture._id}.png?reference=${payload?.reference}`;
            const newFacture = await facture.save();
            return newFacture.populate('catalogueGroupe').execPopulate();
        }, `Cannot create facture.`)
    },

    getAll(query) {
        return TryCatch(() => {
            return Facture.find(query).populate('catalogueGroupe');
        }, `Cannot get all facture.`)
    },

    get({_id}) {
        return TryCatch(() => {
            return Facture.findOne({_id}).populate('catalogueGroupe');
        }, `Cannot get one facture.`)
    },

    deleteById({_id}) {
        return TryCatch(() => {
            try{
                fs.unlinkSync(`${process.cwd()}/upload/qrcode/${_id}.png`);
            } catch (err){console.log(err)};
            return Facture.findByIdAndDelete(_id);
        }, `Cannot delete facture.`)
    },

    updateById({_id, changes}) {
        return TryCatch(() => {
            changes.updatedAt = new Date();
            return Facture.findByIdAndUpdate(_id, changes).populate('catalogueGroupe');
        }, `Cannot update facture.`)
    }
}

