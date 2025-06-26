/**
 * 
 * @param {*} success // 成功回调函数
 * @param {*} error // 错误回调函数
 */

module.exports =function (success,error) {

    if (typeof error !== 'function') {
    error = function () {
        console.log('数据库连接失败');
    };
}
//导入mongoose
const mongoose = require('mongoose');

//导入配置文件
const {DBHOST,DBPORT,DBNAME} = require('../config/config');

//连接数据库
mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)


mongoose.connection.once('connected', async () => {
    success()
});

mongoose.connection.on('error', () => {
    error()
});//连接失败

mongoose.connection.on('disconnected', () => {
    console.log('数据库连接断开');
});//断开连接
}