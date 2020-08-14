# Markdoen Hierarchical Parser
[MDAST](https://github.com/syntax-tree/mdast) well describes the syntax and structure of markdown, but it has single problem - there is no hierarchical relations between headings. It is obvious the `h2` following `h1` is the children of `h1`, but MDAST treats them as same heading, and just gives depth info as attribute. 

This parser parses markdown and generates json structure following MDAST form, with structural infos included. The parser is implemented based on [streamich/md-mdast](https://github.com/streamich/md-mdast).

### Install 
`npm install md-hierarchical-parser`
(yet published...)

### Example
```javascript
let mdParser = require('md-hierarchical-parser')
mdParser.run("path/to/markdown.md", true)
```

### Description

```javascript
run(path, isString=false)
```
Reads markdown file in the `path` and generates json object representing the structure. 

- `path`: denotes the path to the markdown
- `isString`: if false, returns JSON object. Else, returns stringified value. Default value=`true`