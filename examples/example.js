
let fs = require('fs')
let mdParser = require('../lib/index')

let samplePath = "test/md/sample1.md"
let resultPath = "test/result/sample.json"

async function writeTestFile()  {
    const result = await mdParser.run(samplePath, true);
    console.log(result);
    fs.writeFile(resultPath, result, () => {});
}

writeTestFile();