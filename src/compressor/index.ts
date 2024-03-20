import Jimp from "jimp";
import path from "path";

export const compress = async (file: string) => {
    const filename = path.basename(file)
    const filePath = file.split(filename)[0]
    const filenameSplit = filename.split(".")

    await Jimp.read(file)
        .then(fileRes => {
            console.log("FILE", fileRes)
            const updated = fileRes
                .resize(320, 240)
                .quality(20)
                .write(filePath + "/" + filenameSplit[0] + "_optimized_" + "." + filenameSplit[1])
        }).catch((err: any) => {
            console.log("Errirrrru isssss", err);
        });
}