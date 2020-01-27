const fs = require('fs');
let conf = fs.readFileSync("builder.conf");
    conf = JSON.parse(conf);
let version = fs.readFileSync("src/manifest.json");
    version = JSON.parse(version);
    version = version.version;

const versionFolderName = `clean-the-mess_v${version}`; 
const buildPath = `build/${versionFolderName}`;

console.log(`Building Clean the mess!`);
console.log(`version: ${version}`);
console.log(`into: ${buildPath}\n`);

if(fs.existsSync(buildPath)) {
    throw `Dir "${buildPath}" already exists. Update version in manifest.json or remove the dir.`;
} 

fs.mkdirSync(buildPath);

const loop = (rootDir, dir) => {
    if(typeof rootDir === "undefined") rootDir = "./src/";
    if(typeof dir === "undefined") dir = fs.readdirSync(rootDir, {withFileTypes: true});

    for(let i=0; i<dir.length;i++){
        if(conf.ignore.includes(rootDir+dir[i].name)) {
            continue;
        }
        if(dir[i].isDirectory()){
            console.log(rootDir+dir[i].name+"/"); // directories
            fs.mkdirSync(buildPath+"/"+dir[i].name);
            loop.call(this, rootDir+dir[i].name+"/", fs.readdirSync(rootDir+dir[i].name+"/", {withFileTypes: true}));
            continue;
        }
        console.log(rootDir+dir[i].name); // files
        let innerFolderName = rootDir.replace("./src","");
        let source = rootDir+dir[i].name;
        let dest = buildPath+innerFolderName+dir[i].name;

        console.log(buildPath+innerFolderName+dir[i].name);
        fs.copyFileSync(source, dest);
    }

    return;
}

loop();
