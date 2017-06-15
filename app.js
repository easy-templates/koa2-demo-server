const koa = require('koa');
const config = require('./config/config');
const router = require('koa-router')();
const index = require('./router/index');
const user = require('./router/user');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser')

const app = new koa();

// 使用ctx.body解析中间件
app.use(bodyParser())
// 支持跨域
app.use(cors());
// 指定静态资源路径
app.use(require('koa-static')(__dirname + config.static_path));
// 设置路由
router.use('/', index.routes(), index.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
app.use(router.routes(), router.allowedMethods());

app.listen(3200);
