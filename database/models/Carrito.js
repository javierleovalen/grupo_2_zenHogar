module.exports = (sequelize, dataTypes) => {
  const Carrito = sequelize.define('Carritos', {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    usuario_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id'
      }
    }
  },
  {
    timestamps: false,
    underscored: true,
  })

  Carrito.associate = function(db) {
    Carrito.belongsTo(db.Usuarios, {
      as: 'carrito',
      foreignKey: 'usuario_id',
    })

    Carrito.belongsToMany(db.Productos, {
      as: 'producto',
      through: 'carritos_detalles',
      foreignKey: 'carrito_id',
      otherKey: 'producto_id',
      timestamps: false,
    })
  }

  return Carrito;
}