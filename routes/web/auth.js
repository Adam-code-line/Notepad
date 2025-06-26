var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel');
const md5 = require('md5');

router.get('/reg', function(req, res, next) {
  res.render('auth/reg', { title: '注册' });
});

router.post('/reg', function(req, res, next) {
    const { username, password } = req.body;
    
    // 检查用户名和密码是否为空
    if (!username || !password) {
        return res.status(400).render('error', { msg: '用户名和密码不能为空！' });
    }

    // 检查用户名是否已存在
    UserModel.findOne({ username })
        .then(user => {
            if (user) {
                return res.status(400).render('error', { msg: '用户名已存在，请选择其他用户名！' });
            }
            // 如果用户名不存在，则创建新用户，密码用md5加密
            const hashPwd = md5(password);
            return UserModel.create({ username, password: hashPwd });
        })
        .then(user => {
            res.render('success', { msg: '注册成功！', url: '/login' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('注册失败，请稍后再试。');
        });

});

// 登录页面
router.get('/login', function(req, res, next) {

  res.render('auth/login', { title: '登录' });

});

// 登录处理
router.post('/login', function(req, res, next) {
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
                return res.status(400).render('error', { msg: '用户名或密码错误！' });
            }
            // 登录成功，设置session
            req.session.userId = user._id;
            req.session.username = username;
            res.render('success', { msg: '登录成功！', url: '/account' });
        })
        .catch(err => {
            console.error('登录出错:');
            res.status(500).send('登录失败，请稍后再试。');
        });
});

//退出登录
router.post('/logout' , function(req, res, next) {
    //销毁session
    req.session.destroy( () => {
        res.render('success', {msg:'退出成功', url:'/login'});
    });
});

module.exports = router;
