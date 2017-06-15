const router = require('koa-router')();
const dbServer = require('../db/dbServer');
const server = new dbServer();

router.get('/:code', async function(ctx, next) {
    // 对应 url
    // http://localhost:3200/user/liuyk
    var code = ctx.params.code;
    var rows = await server.query('user', '*', 'code = \'' + code + '\'');
    await next();
    console.log('next after');
    ctx.body = {
        users: rows
    }
}, async function(ctx, next) {
    console.log('next fun');
});

router.all('/', async function(ctx, next) {
    // 对应url
    // http://localhost:3200/user?id=1
    // http://localhost:3200/user?code=liuyk
    // 根据id或者code进行查询,否则查询所有
    // POST请求会通过bodyParser来将参数处理为ctx.request.body
    var code = ctx.request.query.code || ctx.request.body.code;
    var id = ctx.request.query.id || ctx.request.body.code;
    var rows = []
    if (id) {
        var rows = await server.query('user', '*', 'id = ' + id);
    } else if (code) {
        var rows = await server.query('user', '*', 'code = \'' + code + '\'');
    } else {
        var rows = await server.query('user', '*');
    }
    ctx.body = {
        users: rows
    }
});


module.exports = router;
