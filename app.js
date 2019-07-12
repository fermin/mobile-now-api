const Koa = require('koa');
const app = new Koa();

const bodyParser = require('koa-bodyparser');
const routers = require('./server/routers');
const logger = require('./server/middleware/logger');
const error = require('./server/middleware/error');

app.use(logger());
app.use(error());
app.use(bodyParser());
app.use(routers.routes());

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})

module.exports = app;

