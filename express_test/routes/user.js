const express = require('express');
const router = express.Router();
const {login} = require('../controller/user');
const { successModule,errorModule} = require('../module/resModule');
router.get('/login',(req,res,next)=>{
    if (req.method == 'POST' && path == '/login'){
        const {username, password} = req.body;
        const result = login(username,password);
        result.then(data=>{
            if(data.username) {
                res.setHeader('Set-Cookie',`username=${data.username};path=/;httpOnly;expries=${getCookieExpries()}`);
                req.session.username = data.username;
                req.session.realname = data.realname;
                res.json(new successModule());
            }
            res.json(new errorModule('登录失败'));
        })
    }
})
router.get('/detail',(req,res,next)=>{
    res.json({
        error: 0,
        data: 'ok'
    })
})
module.exports = router;
