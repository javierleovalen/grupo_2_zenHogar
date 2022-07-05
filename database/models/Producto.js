module.exports = (sequelize, dataTypes) => {
  const Producto = sequelize.define('Productos', {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    sku: {
      type: dataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    descripcion: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    dimensiones: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    peso: {
      type: dataTypes.INTEGER,
    },
    precio: {
      type: dataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    stock: {
      type: dataTypes.INTEGER,
      defaultValue: 0,
    },
    active: {
      type: dataTypes.BOOLEAN,
      defaultValue: 1,
      allowNull: false,
    },
    created_by: {
      type: dataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id'
      }
    },
    categoria_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categorias',
        key: 'id'
      }
    }
  },
  {
    timestamps: false,
    underscored: true,
  })

  Producto.associate = function(db) {
    Producto.belongsTo(db.Categorias, {
      as: 'categoria',
      foreignKey: 'categoria_id',
    })

    Producto.hasMany(db.Fotos, {
      as: 'imagenes',
      foreignKey: 'producto_id',
    })

    Producto.belongsTo(db.Usuarios, {
      as: 'createdby',
      foreignKey: 'created_by'
    })

    Producto.belongsToMany(db.Carritos, {
      as: 'carritos',
      through: 'carrito_detalles',
      foreignKey: 'producto_id',
      otherKey: 'carrito_id',
      timestamps: false,
      underscored: true,
    })
  }

  return Producto;
}