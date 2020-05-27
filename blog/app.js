const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const queryString = require('querystring');
// session数据
const SESSION_DATA = {};
const getCookieExpries = () =>{
    const d = new Date();
    d.setTime(d.getTime()+ (24*60*60*1000));
    return d.toGMTString();
}
const getPostData = (req) => {
    const promise = new Promise((resolve,reject)=>{
        if (req.method !== 'POST'){
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json'){
            resolve({});
            return;
        }
        let postData = '';
        req.on('data', chunk => {
            postData = chunk.toString();
        })
        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }
            resolve(JSON.parse(postData));
        })
    });
    return promise;
}
const serverHandle = (req, res) => {
    res.setHeader('content-type', 'application/json');
    const url = req.url;
    req.path = url.split('?')[0];
    req.query = queryString.parse(url.split('?')[1]);
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item=>{
        if(!item){
            return;
        }
        const arr = item.split('=');
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;
    })
    let needSetCookie = false;
    if(req.cookie.userId){
        if(!SESSION_DATA[req.cookie.userId]){
            SESSION_DATA[req.cookie.userId] = {};
        }
    } else {
        needSetCookie = true;
        req.cookie.userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[req.cookie.userId] = {};
    }
    req.session = SESSION_DATA[req.cookie.userId];
    getPostData(req).then(postData => {
        req.body = postData;
        const blogData = handleBlogRouter(req, res);
        const userData = handleUserRouter(req, res);
        console.log(blogData);

        if (blogData) {
            blogData.then(data=>{
                if (needSetCookie){
                    res.setHeader('Set-Cookie',`userId=${req.cookie.userId};path=/;httpOnly;expries=${getCookieExpries()}`);
                }
                res.end(JSON.stringify(data));
            });
            return;
        }
        if (userData) {
            userData.then(data=>{
                if (needSetCookie){
                    res.setHeader('Set-Cookie',`userId=${req.cookie.userId};path=/;httpOnly;expries=${getCookieExpries()}`);
                }
                res.end(JSON.stringify(data));
            });
            return;
        }
        res.writeHead(404, {"content-type": "text/plain"});
        res.write("404 not found\n");
        res.end();
    })

}
module.exports = serverHandle
// process.env.NODE_ENV
