module.exports = (sequelize, dataTypes) => {
  const Cart = sequelize.define('Cart', {
    items: {
      type: dataTypes.STRING(45)
    },
  },
  {
    timestamps:false,
  })

  return Cart;
}