//导入jwt
const jwt = require('jsonwebtoken');
//导入配置文件
const { secret } = require('../config/config')

module.exports = (req, res, next) => {
    // 获取token
    let token = req.get('token');
    // 判断
    if (!token) {
        return res.json({
            code: '2003',
            msg: 'token缺失',
            user: null
        });
    }

    // 校验token
    try {
        const decoded = jwt.verify(token, secret);
        // 保存用户信息到req对象，供后续中间件或路由使用
        req.user = decoded;
    } catch (err) {
        return res.json({
            code: '2004',
            msg: 'token校验失败',
            user: null
        });
    }

    next();
}