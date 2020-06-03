const express = require('express');
const router = express.Router();
const { getList,getDetail,newBlog,updateBlog,deleteBlog } = require('../controller/blog');
const { successModule,errorModule} = require('../module/resModule');
router.get('/list',(req,res,next)=>{
    if (req.method == 'GET' && req.path == '/list'){
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        // const listData = getList(author,keyword);
        // return new successModule(listData)
        const result = getList(author,keyword);
        return result.then(data=>{
            res.json(new successModule(data));
        });
    }
})
router.get('/detail',(req,res,next)=>{
    res.json({
        error: 0,
        data: 'ok'
    })
})
module.exports = router;
