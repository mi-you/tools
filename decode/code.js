const fs = require('fs');
const path = require('path');
const time = Date.now();
// 读文件
const context = fs.readFileSync(path.resolve(__dirname, 'decode.txt')).toString('base64')
// 写文件
if (context) { 
    let code = fs.readFileSync(path.resolve(__dirname, 'code.json'), 'utf-8')
    code = code ? JSON.parse(code) : {}
    code[time] = context
    fs.writeFileSync(path.resolve(__dirname, 'code.json'), JSON.stringify(code))
}
