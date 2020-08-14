
let fs = require('fs')
let mdParser = require('../lib/index')

let samplePath = "test/md/sample1.md"
let resultPath = "test/result/sample.json"

async function writeJsonFile() {
    const result = await mdParser.run(samplePath, true, true);
    fs.writeFile(resultPath, result, () => {});
    console.log("SUCEESS!!")
}

async function printJson() {
    const result = await mdParser.run(samplePath, true, false);
    console.log(result)
}

printJson()
writeJsonFile()