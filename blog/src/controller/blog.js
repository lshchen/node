const { exec } = require('../db/mysql');
const getList = (author,keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if (author) {
        sql += `and author=${author} `;
    }
    if (keyword) {
        sql += `and title like %${author}& `;
    }
    sql += `order by createtime desc`;
    return exec(sql);
}
const getDetail = (id) => {
    const sql = `select * from blogs where id=${id}`;
    return exec(sql).then(rows=>{
        return rows[0];
    })
}
const newBlog = (blogData = {}) => {
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const creatTime = Date.now();
    const sql = `insert into blogs (title,content,createtime,author) values('${title}','${content}','${author}','${creatTime}'`;
    return exec(sql).then(insertData=>{
        return {
            id: insertData.insertId
        };
    })
}
const updateBlog = (id,blogData={})=>{
    const title = blogData.title;
    const content = blogData.content;
    const sql = `update blogs set title='${title}', content='${content}' where id='${id}'`;
    return exec(sql).then(data=>{
        if (data.affectedRows > 0){
            return true;
        } else {
            return false;
        }
    });
}
const deleteBlog = (id,author)=>{
    const sql = `delete from blogs where id='${id}' and ahthor='${author}'`;
    return exec(sql).then(data=>{
        if (data.affectedRows > 0){
            return true;
        } else {
            return false;
        }
    });
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}
