const http = require('http');
const config = require('./config/defaultConfig');
const chalk = require('chalk');
const route = require('./utils/route');
const path = require('path');
const server = http.createServer((req,res)=>{
    const filePath = path.join(config.root,req.url);
   route(req,res,filePath);
    // fs.stat(filePath,(err,info)=>{
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'text/plain');
    //     res.end('hello world' + filePath);
    //     console.log(info);
    // })

});
server.listen(config.port,config.hostname,()=>{
    console.log(chalk.green("server:localhost:3000"))
});
