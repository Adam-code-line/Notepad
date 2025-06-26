var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

//导入配置文件
const{secret} = require('../../config/config')

// 登录处理
router.post('/login', function (req, res, next) {
    const { username, password } = req.body;

    // 检查用户名和密码是否为空
    if (!username || !password) {
        return res.status(400).render('error', { msg: '用户名和密码不能为空！' });
    }

    // 使用md5加密密码
    const hashPwd = md5(password);

    // 查找用户
    UserModel.findOne({ username, password: hashPwd })
        .then(user => {
            if (!user) {
                res.json({
                    code: '2002',
                    msg: '用户名或密码错误',
                    data: null
                })
                return
            }

            //创建用户当前的token
            let token = jwt.sign({
                username: user.username,
                _id: user._id
            }, secret, {
                expiresIn: 60 * 60 * 24 * 7
            })


            // 登录成功，响应token
            res.json({
                code: '0000',
                msg: '登录成功',
                data: token
            })

        })
        .catch(err => {
            res.json({
                code:'2001',
                msg:'数据库读取失败',
                data:null
            })
            return
        });
});

//退出登录
router.post('/logout', function (req, res, next) {
    res.json({ code: '0000', msg: '退出成功' });
});

module.exports = router;