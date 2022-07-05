const Carrito = require("./Carrito");

module.exports = (sequelize, dataTypes) => {
  const CarritoDetalle = sequelize.define('carritos_detalles', {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    carrito_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Carritos',
        key: 'id',
      }
    },
    producto_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Productos',
        key: 'id',
      }
    },
    cantidad: {
      type: dataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    }
  },
  {
    timestamps: false,
    underscored: true,
  })

  CarritoDetalle.associate = function(db) {
    CarritoDetalle.belongsTo(db.Productos, {
      foreignKey: 'producto_id',
      as: 'producto',
    })
    
    CarritoDetalle.belongsTo(db.Carritos, {
      foreignKey: 'carrito_id',
      as: 'carrito',
    })
  }

  return CarritoDetalle;
}