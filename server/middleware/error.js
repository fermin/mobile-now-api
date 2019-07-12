const error = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || err.code || 500;
      ctx.body = {
        success: false,
        message: err.message,
      };
    }
  }
}

module.exports = error;