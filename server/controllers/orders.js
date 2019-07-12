const Joi = require('joi');
const _ = require('underscore');
const v = {};
v.freightFee = {
  body: Joi.array().items({
    product_count: Joi.number().required().label("商品数量"),
    product_price: Joi.number().required().label("商品价格"),
    product_weight: Joi.number().required().label("商品重量")
  }),
};
exports.v = v;

exports.freightFee = async (ctx) => {
  let products = ctx.request.body;
  let totalWeight = _.reduce(products, (sum, item) => { return sum + item.product_count * item.product_weight; }, 0);
  let totalPrice = _.reduce(products, (sum, item) => { return sum + item.product_count * item.product_price; }, 0);

  let freightFee = calculateFreightFee(totalWeight)(totalPrice);

  ctx.body = { success: true, freightFee };
};

const calculateFreightFee = function(totalWeight) {
  let fee = totalWeight <= 1 ? 10 : 10 + Math.ceil(totalWeight - 1) * 2;

  return function(totalPrice) {
    if (totalPrice > 100) {
      fee = fee - 10 - Math.floor((totalPrice - 100) / 50) * 2;
    }
    return fee < 0 ? 0 : fee;
  }
}