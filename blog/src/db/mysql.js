const mysql = require('mysql');
const { config } = require('../../../express_test/utils/db');
const con = mysql.createConnection(config);
con.connect();
function exec(sql) {
    const promise = new Promise((resolve,reject)=>{
        con.query(sql, (err,result)=>{
            if (err) {
                reject(err);
                return;
            } else {
                resolve(result);
            }
        })
    });
    return promise;
}
module.exports = {
    exec
}
