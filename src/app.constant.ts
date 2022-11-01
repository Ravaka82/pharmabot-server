import * as dotenv from "dotenv";
import * as path from "path";

const GET = (param: string): string => {
    return process.env[param]
}

dotenv.config({ path: path.resolve(process.cwd(), `.env`) });


export const APP_HOST = GET('APP_HOST');
export const ANGULAR_HOST = GET('ANGULAR_HOST');
export const APP_PORT = GET('APP_PORT');
export const BODY_PARSER_LIMIT = GET('BODY_PARSER_LIMIT');
export const DIST_PATH = GET('DIST_PATH');
export const HASH_KEY = GET('HASH_KEY');
export const GRAPHQL_PATH = GET('GRAPHQL_PATH') || '/graphql';

export const DB_HOST = GET('DB_HOST');
export const DB_PORT = GET('DB_PORT');
export const DB_NAME = GET('DB_NAME');
export const DB_PASSWORD = GET('DB_PASSWORD');
export const DB_USER = GET('DB_USER');

let AUTH_DB = '';
if (DB_USER) { AUTH_DB += DB_USER }
if (DB_PASSWORD) { AUTH_DB += `:${DB_PASSWORD}@`}

export const MONGOOSE_URI = `mongodb://${AUTH_DB}${DB_HOST}:${DB_PORT}/${DB_NAME}?authMode=scram-sha1`;

