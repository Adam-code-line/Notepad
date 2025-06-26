// 引入mongoose模块
const mongoose = require('mongoose');

//创建一个Schema对象
let UserSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
        unique: true, // 确保用户名唯一
    },
    password: {
        type: String,
        required: true,
    }

});

//创建一个Model对象
let UserModel = mongoose.model('users', UserSchema);

//导出UserModel
module.exports = UserModel;