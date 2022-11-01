import * as jwt from "jsonwebtoken";
import {HASH_KEY} from "../app.constant";

export const JWT = async (token) => {
    try {
        return jwt.verify(token, HASH_KEY);
    } catch (error) {
        return null;
    }
};
