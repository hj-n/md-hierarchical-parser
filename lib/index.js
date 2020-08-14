// Import libraries
let fs = require('fs').promises
const {create} = require('md-mdast');
const parser = create();

let Stack = require('stack-lifo');




function reformat(mdastJSON) {
    let stack = new Stack();
    let resultList = [];
    elementList = mdastJSON.children;
    elementList.forEach(elem => {
        if(stack.isEmpty()) {
            if(elem.type == "heading") stack.push(elem);
        }
        else {
            let topHeading = stack.peek()
            if(elem.type == "heading") {
                if(elem.depth > topHeading.depth) { // current header is lower 
                    stack.push(elem)
                }
                else {
                    let tempStack = new Stack();
                    do {
                        tempStack.push(topHeading);
                        stack.pop();
                        if(stack.isEmpty()) break;
                        topHeading = stack.peek();
                    } while (elem.depth <= topHeading.depth)

                    let tempArray = new Array();
                    do {
                        if(tempArray.length == 0 || tempStack.peek().depth <= tempArray[tempArray.length - 1].depth ) {
                            tempArray.push(tempStack.peek());
                            tempStack.pop();
                        }
                        else {
                            tempArray[tempArray.length - 1].children.push(tempStack.peek());
                            tempStack.pop();
                        }
                    } while(!tempStack.isEmpty())
                    if(!stack.isEmpty())
                        stack.peek().children = stack.peek().children.concat(tempArray);
                    else {
                        if(resultList.length == 0)  resultList = tempArray;
                        else resultList = resultList.concat(tempArray)
                    }
                    stack.push(elem)
                    
                }
            }
            else {
                topHeading.children.push(elem)
            }
        }
    });

    if(!stack.isEmpty()) {
        let topHeading = stack.peek()

        let tempStack = new Stack();
        do {
            tempStack.push(topHeading);
            stack.pop();
            if(stack.isEmpty()) break;
            topHeading = stack.peek();
        } while (1)

        let tempArray = new Array();
        do {
            if(tempArray.length == 0 || tempStack.peek().depth <= tempArray[tempArray.length - 1].depth ) {
                tempArray.push(tempStack.peek());
                tempStack.pop();
            }
            else {
                tempArray[tempArray.length - 1].children.push(tempStack.peek());
                tempStack.pop();
            }
        } while(!tempStack.isEmpty())
        if(resultList.length == 0)  resultList = tempArray;
        else resultList = resultList.concat(tempArray)
    }


    return resultList;

}

exports.run = async function(path, isHierarchy = true, isString = false,) {
    let md_str = await fs.readFile(path, 'utf8');
    outputJson = parser.tokenizeBlock(md_str);

    if(isHierarchy) outputJson = reformat(outputJson)
    
    if (isString) return JSON.stringify(outputJson);
    else          return outputJson;
}



 
