// const env = process.env.NODE_ENV;

const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'myblog'
}
const redisConfig = {
    port: 6379,
    host: "127.0.0.1"
}
module.exports = {
    config,
    redisConfig
}
