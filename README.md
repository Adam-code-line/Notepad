# notePad

基于 **Node.js + Express + EJS** 的记事本应用，支持账户注册与登录、笔记创建与管理，并使用 MongoDB 存储数据。项目涵盖认证、REST API、视图模板渲染和静态资源处理等常见场景。

---

## 功能特性

- 用户注册 / 登录 / Token 校验中间件
- 记事条目（Note）新增、列表、详情、删除
- 书籍（Book）分类管理，按类别归档笔记
- 支持资源上传，文件存储于 `public/uploads`
- 基于 EJS 的服务端渲染页面 + REST API 双入口
- 全局错误处理与自定义 404 页

## 技术栈

| 层 | 说明 |
| --- | --- |
| 语言 | Node.js |
| Web 框架 | Express |
| 视图引擎 | EJS |
| 数据库 | MongoDB（Mongoose 模型：Book / Note / User）|
| 中间件 | 登录校验、Token 校验、静态资源、上传等 |
| 前端资源 | `public/stylesheets/style.css`, `public/javascripts/main.js` |

## 环境要求

- Node.js >= 18
- MongoDB 实例
- npm / pnpm / yarn

## 快速开始

1. **克隆仓库**

	```bash
	git clone https://github.com/Adam-code-line/notePad.git
	cd notePad
	```

2. **安装依赖**

	```bash
	npm install
	```

3. **配置环境变量**

	在 `config/config.js` 或 `.env` 中配置以下项：

	```js
	export default {
	  mongodbUrl: 'mongodb://localhost:27017/notepad',
	  sessionSecret: 'your-session-secret',
	  jwtSecret: 'your-jwt-secret'
	}
	```

4. **启动应用**

	```bash
	npm start        # 生产模式
	# 或
	npm run dev     # 若 package.json 中定义了 nodemon
	```

5. **访问项目**

	- 浏览器访问 `http://localhost:3000`
	- Web 端体验登录、注册、笔记管理
	- REST API 参见 `routes/api/`

## 项目结构

```
├── app.js                 # Express 主入口
├── bin/www                # 启动脚本
├── config/config.js       # 项目配置
├── db/db.js               # 数据库初始化
├── models/                # Mongoose 模型（Book、Note、User）
├── routes/
│   ├── api/               # REST API 路由
│   ├── web/               # 页面路由
│   └── users.js           # 用户相关接口
├── views/                 # EJS 模板
├── public/                # 静态资源与上传目录
└── middlewares/           # 登录、Token 校验等中间件
```

## API 与页面

- **Web 页面路由**
  - `/auth/login` – 登录页面
  - `/auth/register` – 注册页面
  - `/` – 首页，笔记概览
  - `/note/create` – 新建笔记
  - `/note/:id` – 查看单条笔记

- **REST API**（详见 `routes/api`）
  - `/api/auth/login`
  - `/api/auth/register`
  - `/api/account/profile`
  - 其他接口可按目录自行查看

## 开发建议

- 使用 `nodemon` 或 `pm2` 进行开发调试与生产守护
- 编写单元测试覆盖模型与中间件逻辑
- 将上传文件 `public/uploads` 迁移至 OSS 等对象存储可提升稳定性
- 根据业务扩展权限控制、速率限制等中间件

## 贡献

欢迎提交 Issue 或 Pull Request，共同完善 notePad。

## License

未指定，可根据需要补充（如 MIT）。
