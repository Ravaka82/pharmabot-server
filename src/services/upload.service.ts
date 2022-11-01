import * as path from "path";
import * as fs from "fs";
import {finished} from "stream/promises";
import {TryCatch} from "../utils/error.handler";

export const self =  {
    upload: async (file, folder = '', filename = '') => {
        return TryCatch(async () => {
            const metafile = await file;
            console.log(metafile)
            const extension = path.extname(metafile.filename);
            const stream = metafile.createReadStream();

            fs.mkdirSync(path.resolve('upload', folder),{recursive: true})
            const filePath = path.resolve(process.cwd(), 'upload', folder, `${filename}${extension}`);
            const out = fs.createWriteStream(filePath);
            stream.pipe(out);
            await finished(out);

            return `/upload/${folder}/${filename}${extension}`.replace(/\/\//g,'/')
        }, `Cannot upload. Error occured.`)

    },

    removeEmptyFolder: (folder: string) => {
        let folderPath: any = path.parse(folder).dir;
        if (fs.readdirSync(folderPath).length === 0 ) {
            fs.rmdirSync(folderPath);
            const lastFolder = folderPath.split('/');
            const nextDeletedFolderName = lastFolder.pop();
            if (nextDeletedFolderName !== 'upload') {
                self.removeEmptyFolder(lastFolder.join('/'));
            }
        }
    },

    delete: (filePath) => {
        fs.unlinkSync(filePath);
        self.removeEmptyFolder(filePath);
    },
}
