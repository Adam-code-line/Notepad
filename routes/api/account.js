//导入express
const express = require('express');
const router = express.Router();

const monment = require('moment');
const AccountModel = require('../../models/BookModel');
//导入jwt
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

//导入checkToken中间件
let checkTokenMiddleware =  require('../../middlewares/checkTokenMiddleware');

//记账本的列表
router.get('/account', checkTokenMiddleware, async function (req, res, next) {

    try {
        const data = await AccountModel.find().sort({ date: -1 }).exec();
        res.json({
            code: '0000',
            msg: '查询成功',
            accounts: data,
            monment: monment
        });

    } catch (err) {
        res.json({
            code: '1001',
            msg: '查询失败了~~~',
            error: err
        });
    }
});

router.post('/account', checkTokenMiddleware, function (req, res, next) {
    //插入数据库
    AccountModel.create({
        item: req.body.item,
        date: monment(req.body.date).toDate(), // 将日期转换为Date对象
        type: req.body.type,
        amount: req.body.amount,
        note: req.body.note
    }).then(() => {

        //成功提醒
        res.json({
            code: '0000',
            msg: '添加成功了~~~',
            data: {
                item: req.body.item,
                date: monment(req.body.date).format('YYYY-MM-DD'), // 格式化日期
                type: req.body.type,
                amount: req.body.amount,
                note: req.body.note
            }
        });

    }).catch(err => {
        //失败提醒
        res.json({
            code: '1002',
            msg: '添加失败了~~~',
            error: err
        });
    });
});

//删除记录
router.delete('/account/:id', checkTokenMiddleware, function (req, res, next) {
    let id = req.params.id;

    //删除数据库
    AccountModel.findByIdAndDelete(id).then(() => {
        //删除成功
        res.json({
            code: '0000',
            msg: '删除成功了~~~',
            data: { id: id }
        });

    }).catch(err => {
        res.json({
            code: '1003',
            msg: '删除失败了~~~',
            error: err
        });
    });
});

//获取单个账单
router.get('/account/:id', checkTokenMiddleware, async function (req, res, next) {
    let id = req.params.id;

    try {
        const data = await AccountModel.findById(id).exec();
        if (!data) {
            return res.json({
                code: '1004',
                msg: '记录不存在'
            });
        }
        res.json({
            code: '0000',
            msg: '查询成功',
            account: data,
            monment: monment
        });
    } catch (err) {
        res.json({
            code: '1005',
            msg: '查询失败了~~~',
            error: err
        });
    }
});

//更新单个账单
router.put('/account/:id', checkTokenMiddleware, async function (req, res, next) {
    let id = req.params.id;

    try {
        const data = await AccountModel.findByIdAndUpdate(id, {
            item: req.body.item,
            date: monment(req.body.date).toDate(),
            type: req.body.type,
            amount: req.body.amount,
            note: req.body.note
        }, { new: true }).exec();

        if (!data) {
            return res.json({
                code: '1006',
                msg: '记录不存在'
            });
        }

        res.json({
            code: '0000',
            msg: '更新成功',
            account: data
        });
    } catch (err) {
        res.json({
            code: '1007',
            msg: '更新失败了~~~',
            error: err
        });
    }
});

module.exports = router;
