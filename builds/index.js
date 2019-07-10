const fs = require('fs');
const path = require('path');

const sourcePath = path.resolve(__dirname, '../app')
const targetPath = path.resolve(__dirname, '../compile/src')

let sourceStr = fs.readFileSync(sourcePath+'/pages/test/index.vue',"utf-8");
let targetStr = fs.readFileSync(targetPath+'/demo.vue',"utf-8");
let template = sourceStr.match(/<template>([\s\S]*)<\/template>/)[1];
let newTemplate = targetStr.replace('${{1}}',template)

fs.writeFileSync(targetPath+'/test.vue', newTemplate);


