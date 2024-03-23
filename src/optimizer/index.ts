import Jimp from "jimp";
import path, { resolve } from "path";
import { SupportedImageTypes } from "./lib";

export const compress = async (file: string, config?: { scale?: number, quality?: number, resize?: number }, to?: SupportedImageTypes) => {
    const filename = path.basename(file)
    const filePath = file.split(filename)[0]
    const filenameSplit = filename.split(".")
    let scale = config?.scale || 0.5
    const quality = config?.quality || 99
    let resize = config?.resize || 0.3

    await Jimp.read(file)
        .then(fileRes => {
            switch (true) {
                case fileRes.bitmap.width < 500:
                    resize = 1
                    scale = 1
                    break;
                case fileRes.bitmap.width < 1500:
                    resize = 0.8
                    break;
                default:
                    break;
            }
            fileRes
                .resize(fileRes.bitmap.width * resize, fileRes.bitmap.height * resize)
                .scale(scale)
                .quality(quality)
                .write(`${filePath}/${filenameSplit[0]}_optimized_.${to ? to : filenameSplit[1]}`)
        }).catch((err: any) => {
            console.log("Errirrrru isssss", err);
        });
}
