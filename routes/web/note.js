// routes/note.js
const express = require('express');
const router = express.Router();
const Note = require('../../models/NoteModel');

// 导入中间件检测登录
const checkloginMiddleware = require('../../middlewares/checkloginMiddleware');

// 展示所有笔记
router.get('/', checkloginMiddleware, async (req, res) => {
    const notes = await Note.find().sort({ date: -1 });
    res.render('list', { accounts: [], notes }); // accounts 也要传
});

// 新建笔记页面
router.get('/create', checkloginMiddleware, (req, res) => {
    res.render('note_create');
});

// 新建笔记提交
router.post('/create', checkloginMiddleware, async (req, res) => {
    await Note.create({ content: req.body.content });
    res.redirect('/');
});

// 删除笔记
router.post('/:id', checkloginMiddleware, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;