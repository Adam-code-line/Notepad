// 引入mongoose模块
const mongoose = require('mongoose');

//创建一个Schema对象
let AccountSchema = new mongoose.Schema({

    item: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    type:{
        type: Number,
        default: -1
    },
    amount: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        default: '',
    },

});

//创建一个Model对象
let AccountModel = mongoose.model('accounts', AccountSchema);

//导出AccountModel
module.exports = AccountModel;