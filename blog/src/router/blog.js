const { getList,getDetail,newBlog,updateBlog,deleteBlog } = require('../controller/blog');
const { successModule,errorModule} = require('../module/resModule');
//统一登录验证
const loginCheck = (req) =>{
    if(!req.session.username) {
        return Promise.resolve(new errorModule('尚未登录'));
    }
}
const handleBlogRouter = (req, res) => {
    const method = req.method;
    // const url = req.url;
    // const path = url.split('?')[0];
    if (method == 'GET' && req.path == '/api/blog/list'){
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        // const listData = getList(author,keyword);
        // return new successModule(listData)
        const result = getList(author,keyword);
        return result.then(data=>{
            return new successModule(data);
        });
    }
    if (method == 'GET' && req.path == '/api/blog/detail'){
        const id = req.query.id;
        const result = getDetail(id);
        return result.then(data=>{
            return new successModule(data);
        })
    }
    if (method == 'POST' && req.path == '/api/blog/new'){
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheck;
        }
        req.body.author = req.session.username;
        const blogData = req.body;
        const result = newBlog(blogData);
        return result.then(data=>{
            return new successModule(data);
        });
    }
    if (method == 'POST' && req.path == '/api/blog/update'){
        const id = req.query.id;
        const result = updateBlog(id, req.body);
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheck;
        }
        result.then(data=>{
            if (data) {
                return new successModule();
            } else {
                return new errorModule('更新失败');
            }
        })


    }
    if (method == 'POST' && req.path == '/api/blog/delete'){
        const id = req.query.id;
        const author = req.session.username;
        const result = deleteBlog(id,author);
        result.then(val=>{
            if (val) {
                return new successModule();
            } else {
                return new errorModule('删除失败');
            }
        })
    }
}
module.exports = handleBlogRouter
