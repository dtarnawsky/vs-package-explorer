const { exec } = require('child_process');
const { version } = require('os');
const fs = require('fs')

const names = require('all-the-package-names')
    .filter(name => name === name.toLowerCase());

const failed = [];
let boring = [];
let interesting = [];

try {
    const txt = fs.readFileSync('package-data/boring-package-list.json', { encoding: 'utf8' });
    boring = JSON.parse(txt);
} catch {}

try {
    const txt = fs.readFileSync('package-data/interesting-package-list.json', { encoding: 'utf8' });
    interesting = JSON.parse(txt);
} catch {}

(async () => {

    while (names.length > 0) {

        const i = randomInRange(0, names.length - 1);
        const name = names[i];        
        try {
            if (!boring.includes(name) && !failed.includes(name)) {
                await getPackageData(name);
            }

        } catch (err) {
            failed.push(name);
            fs.writeFileSync('package-data/failed-package-list.json', JSON.stringify(failed));
        }
        names.splice(i, 1);
    }
})();

function randomInRange(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
}


async function getPackageData(name) {
    const txt = await getRunOutput(`npm view --json ${name}`);
    const data = JSON.parse(txt);
    const pck = { name: data.name, version: data.version, description: data.description, keywords: data.keywords };

    const isBoring =
        !data.name.includes('cordova')
        && !data.name.includes('capacitor')
        && !data.keywords.includes('cordova')
        && !data.keywords.includes('capacitor')
        && !data.keywords.includes('react')
        && !data.keywords.includes('vue')
        && !data.keywords.includes('angular')
        && !data.keywords.includes('ionic');



    if (isBoring) {
        boring.push(name);
        fs.writeFileSync('package-data/boring-package-list.json', JSON.stringify(boring));
    } else {
        console.log(names.length + ' '+JSON.stringify(pck));
        interesting.push(name);
        fs.writeFileSync('package-data/' + name + '.json', JSON.stringify(pck));
        fs.writeFileSync('package-data/interesting-package-list.json', JSON.stringify(interesting));
    }


}

async function getRunOutput(command) {
    return new Promise((resolve, reject) => {
        let out = '';
        exec(
            command,
            undefined,
            (error, stdout, stderror) => {
                if (stdout) {
                    out += stdout;
                }
                if (!error) {
                    resolve(out);
                } else {
                    if (stderror) {
                        reject(stderror);
                    } else {
                        // This is to fix a bug in npm outdated where it returns an exit code when it succeeds
                        resolve(out);
                    }
                }
            }
        );
    });
}