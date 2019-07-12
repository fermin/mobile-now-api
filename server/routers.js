const Router = require('koa-router');
const orders = require('./controllers/orders');
const validate = require('koa2-validation');
const router = new Router({
  prefix: '/api'
});

const routers = router.post('/freightFee', validate(orders.v.freightFee), orders.freightFee);

module.exports = routers;
