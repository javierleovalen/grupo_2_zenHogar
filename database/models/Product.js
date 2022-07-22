module.exports = (sequelize, dataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
    type: dataTypes.STRING(45),
    allowNull: false,  
    },
    description: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: dataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    productImg: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: dataTypes.INTEGER,
      defaultValue: 0,
    },
    active: {
      type: dataTypes.BOOLEAN,
      defaultValue: 1,
    }
  },
  {
    paranoid: true 
  })

  Product.associate = function(db) {
    Product.belongsToMany(db.User,{through: 'Cart'});
    Product.belongsTo(db.User, {
      foreignKey: 'createdBy',
    })
    Product.belongsTo(db.Category)
  }

  return Product;
}