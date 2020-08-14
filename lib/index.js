// Import libraries
let fs = require('fs').promises
const {create} = require('md-mdast');
const parser = create();

function applyHierarchy(mdast) {

}

exports.run = async function(path, isString = false) {
    let md_str = await fs.readFile(path, 'utf8');
    outputJson = parser.tokenizeBlock(md_str);
    if (isString) return JSON.stringify(outputJson);
    else          return outputJson;
}



 
