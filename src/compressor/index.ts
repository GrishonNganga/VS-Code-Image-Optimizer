import Jimp from "jimp";
import path from "path";

export const compress = async (file: string, config?: { scale?: number, quality?: number, resize?: number }) => {
    const filename = path.basename(file)
    const filePath = file.split(filename)[0]
    const filenameSplit = filename.split(".")
    const scale = config?.scale || 0.5
    const quality = config?.quality || 99
    const resize = config?.resize || 0.3
    await Jimp.read(file)
        .then(fileRes => {
            console.log("FILE", fileRes)
            const updated = fileRes
                .resize(fileRes.bitmap.width * resize, fileRes.bitmap.height * resize)
                .scale(scale)
                .quality(quality)
                .write(filePath + "/" + filenameSplit[0] + "_optimized_" + "." + filenameSplit[1])
        }).catch((err: any) => {
            console.log("Errirrrru isssss", err);
        });
}