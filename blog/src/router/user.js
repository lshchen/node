const {login} = require('../controller/user');
const { successModule,errorModule} = require('../module/resModule');
const getCookieExpries = () =>{
    const d = new Date();
    d.setTime(d.getTime()+ (24*60*60*1000));
    return d.toGMTString();
}
const handleUserRouter = (req, res) => {
    const method = req.method;
    if (method == 'POST' && path == '/api/user/login'){
        const {username, password} = req.body;
        const result = login(username,password);
        result.then(data=>{
            if(data.username) {
                res.setHeader('Set-Cookie',`username=${data.username};path=/;httpOnly;expries=${getCookieExpries()}`);
                req.session.username = data.username;
                req.session.realname = data.realname;
                return new successModule();
            }
            return new errorModule('登录失败')
        })
    }
    // if (method == 'GET' && path == '/api/user/login_test') {
    //     if(req.session.username) {
    //         return new successModule({
    //             username: req.cookie.username
    //         });
    //     }
    //     return new errorModule('尚未登录');
    // }
}
module.exports = handleUserRouter
