const fs = require('fs');
const path = require('path');
const filename = path.resolve(__dirname,'data.text');
console.log(filename);
console.log(fs);
fs.readFile(filename,(err,data)=>{
    console.log(data.toString());
})
const content = '000000';
const opt = {
    flag: 'a', //追加 w覆盖
}
fs.writeFile(filename,content,opt,(err)=>{
    console.log(err);
})
fs.exists(filename,(exist)=>{
    console.log(exist);
})
process.stdin.pipe(process.stdout);
// http req.pipe(res);
const readStream = fs.createReadStream(filename);
const writeStream = fs.createWriteStream(filename);
readStream.pipe(writeStream);
readStream.on('data',function () {
    console.log('读取中。。。。');
})
readStream.on('end',function () {
    console.log('拷贝完成');
})
