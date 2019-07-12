const logger = () => {
  return async (ctx, next) => {
    const start = Date.now()
    await next()
    const responseTime = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - 响应时间: ${responseTime}ms`);
  }
}

module.exports = logger;