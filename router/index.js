var router = require('koa-router')();

router.get('/', async function(ctx, next) {
    var data = {
        text: 'this is a jsonp api',
        time: new Date().getTime(),
    }
    ctx.body = data
});

module.exports = router;
