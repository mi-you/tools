const fs = require('fs');
const path = require('path');
const time = Date.now();
// 读文件
let code = fs.readFileSync(path.resolve(__dirname, 'code.json'), 'utf-8')
// 写文件
if (code) {
    const last = [...Object.values(JSON.parse(code))]
    fs.appendFileSync(path.resolve(__dirname, 'decode.txt'), Buffer.from(last[last.length - 1], 'base64'))  
    fs.appendFileSync(path.resolve(__dirname, 'decode.txt'), '\r') 
}
