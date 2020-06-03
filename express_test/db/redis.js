const redis = require('redis');
const { redisConfig } = require('../utils/db');
const redisClient = redis.createClient(redisConfig.port, redisConfig.host);
redisClient.on('error',err=>{
    console.error(err);
});
// redisClient.set('myname','zhangsan',redis.print);
// redisClient.get('myname', (err,val)=>{
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log(val);
//     redisClient.quit();
// })
// redis-cli.exe -h 127.0.0.1 -p 6379
// redis-server.exe redis.windows.conf
function set(key, val){
    if (typeof val == 'object'){
        val = JSON.stringify(val);
    }
    redisClient.set(key,val,redis.print);
}
function get(key){
    const promise = new Promise(((resolve, reject) => {
        redisClient.get(key, (err,val)=>{
            if(err){
                console.error(err);
                return;
            }
            console.log(val);
            if (val == null){
                resolve(null);
                return;
            }
            try{
                resolve(JSON.parse(val));
            } catch (ex){
                resolve(val);
            }



        })
    }));
    return promise;
}
module.exports = {
    set,
    get
}
