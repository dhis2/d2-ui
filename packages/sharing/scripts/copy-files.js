const fse = require('fs-extra')
const path = require('path')

function copyFile(file) {
    const buildPath = path.resolve(__dirname, '../build/', path.basename(file));
    fse.copySync(file, buildPath);
    console.log(`Copied ${file} to ${buildPath}`);
}

//['README.md', 'CHANGELOG.md', 'LICENSE'].map(copyFile)

const packageData = createPackageFile()

function createPackageFile() {
    const packageData = fse.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')

    const { ...packageDataOther } = JSON.parse(packageData);

    const newPackageData = {
        ...packageDataOther,
        main: './index.js',
        private: false,
    };

    try {
        fse.ensureDirSync(path.resolve(__dirname, '../build'))
    } catch (e) {
        console.log('Path exists, skip creation', e)
    }

    const buildPath = path.resolve(__dirname, '../build/package.json');

    fse.writeFileSync(buildPath, JSON.stringify(newPackageData, null, 2), 'utf8');
    console.log(`Created package.json in ${buildPath}`);

    return newPackageData;
}
