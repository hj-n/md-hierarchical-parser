let fs = require('fs');

function processMdFile(path, isString = false) {
    let md_str = "";
    return fs.readFile(path, 'utf8', function(err, data) {
        if (err) throw err;
        md_str = data;
        const {create} = require('md-mdast');
        const parser = create();
        console.log(parser.tokenizeBlock(md_str));
        outputJson = parser.tokenizeBlock(md_str);
        if(isString) return JSON.stringify(outputJson);
        else         return outputJsonStr = JSON.stringify(outputJson);
        
    });
}

processMdFile("./test/md/sample1.md")