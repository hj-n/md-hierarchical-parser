# Markdown Hierarchical Parser
[MDAST](https://github.com/syntax-tree/mdast) well describes the syntax and structure of markdown, but it has a single problem - there are no hierarchical relations between headings. It is obvious the `h2` following `h1` is the children of `h1`, but MDAST treats them as the same heading and just gives depth info as an attribute. 

This parser parses markdown and generates JSON structure with hierarchical info. The parser is implemented based on [streamich/md-mdast](https://github.com/streamich/md-mdast).

### Install 
```sh
npm install md-hierarchical-parser
```
(yet published...)

### Example
```javascript
let mdParser = require('md-hierarchical-parser')
await mdParser.run("path/to/markdown.md", true)
```

### Description

```javascript
run(path, isString=false)
```
Reads markdown file in the `path` and generates json object representing the structure. 

- `path`: denotes the path to the markdown
- `isString`: if false, returns JSON object. Else, returns stringified value. Default value=`true`

### Example

.md file:

```markdown
## Header 2

paragraph 1

### Header 3

paragraph 2

#### Header 4

- first
- second
- third

paragraph 3

##### Header 5

`print("hello world")`

## Header 2

```

will be converted to JSON which follows below structure:

```
    ├── heading
    │   ├── paragraph
    │   ├── heading
    │   │   ├── paragraph
    │   │   ├── heading
    │   │   │   ├── list
    │   │   │   ├── paragraph
    │   │   │   ├── heading
    │   │   │   │   ├── code
    ├── heading
    
```