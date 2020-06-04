const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readDir = promisify(fs.readdir);
const path = require('path');
const handlebars = require('handlebars');
const source = fs.readFileSync(path.join(__dirname,"../templates/dir.tpl"));
const template = handlebars.compile(source.toString());
const config = require('../config/defaultConfig');
const types = require('../utils/mine');
const compress = require('../utils/compress');
const range = require('../utils/range');
const isFresh = require('../utils/cache')
module.exports = async function (req,res,filePath) {
    try{
        const stats = await stat(filePath);
        if (stats.isFile()){
            const type = types(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', type);
            if (isFresh(stats,req,res)){
                res.statusCode = 304;
                res.end();
                return;
            }
            const {code,start,end} = range(stats.size,req,res);
            let rs;
            if (code == 200) {
                 rs = fs.createReadStream(filePath);
            } else {
                rs = fs.createReadStream(filePath,{
                    start,end
                });
            }
            if (filePath.match(config.compress)){
               rs = compress(rs,req,res);
            }
            rs.pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readDir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const dir = path.relative(config.root,filePath);
            const data = {
                files,
                dir: dir ? `/${dir}` : '',
                title: path.basename(filePath)
            }
            console.log(data);
            res.end(template(data));
            // res.end(files.join(','));
            // fs.readdir(filePath,(err,files)=>{
            //     res.statusCode = 200;
            //     res.setHeader('Content-Type', 'text/plain');
            //     res.end(files.join(','));
            // })
        }
    } catch (e) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('hello world' + 404);
    }
}
