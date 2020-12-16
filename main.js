const fs = require('fs');
const path = require('path');

const hexToDecimal = (hexStr) => {
    const hex = hexStr.replace(/[RC(\.png)]/g, '');
    const num = parseInt(hex, 16);
    return num;
};


const rootDir = path.resolve(__dirname, './_alllayers');

// 读取根目录下所有z层级的文件夹
const zDirs = fs.readdirSync(rootDir);

zDirs.forEach(zFolder => {
    // z目录
    const zDir = path.join(rootDir, zFolder);
    const newZFolder = zFolder.replace(/L(0?)/, '');
    const newZDir = path.join(rootDir, newZFolder);
    // 重命名层级z
    fs.renameSync(zDir, newZDir);
    // 读取z目录，获取旗下所有y目录
    const yDirs = fs.readdirSync(newZDir);

    // 遍历y目录，对每一个y目录读取旗下x图片
    yDirs.forEach(yFolder => {
        const yDir = path.join(newZDir, yFolder);
        const newYFoler = hexToDecimal(yFolder).toString();
        const newYDir = path.join(newZDir, newYFoler);

        // 重命名Y文件夹
        fs.renameSync(yDir, newYDir);

        const xFiles = fs.readdirSync(newYDir);
        xFiles.forEach(xFile => {
            const xFilePath = path.join(newYDir, xFile);
            const newXFileName = `${hexToDecimal(xFile)}.png`;
            const newXFilePath = path.join(newYDir, newXFileName);
            fs.renameSync(xFilePath, newXFilePath);
            console.log(`重命名:${zFolder}-${yFolder}-${xFile}===${newZFolder}-${newYFoler}-${newXFileName}`);
        });
    });
});

