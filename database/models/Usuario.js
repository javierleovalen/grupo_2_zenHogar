module.exports = (sequelize, dataTypes) => {
  const Usuario = sequelize.define('Usuarios', {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: dataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    password: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    apellido: {
      type: dataTypes.STRING(45),
    },
    celular: {
      type: dataTypes.STRING(45),
    },
    avatar: {
      type: dataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'default.jpg'
    },
    rol_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    }
  },
  {
    underscored: true,
    timestamps: false,
  })

  Usuario.associate = function(db) {
    Usuario.hasMany(db.Carritos, {
      as: 'carrito',
      foreignKey: 'usuario_id',
    })

    Usuario.hasMany(db.Roles, {
      foreignKey: 'rol_id',
      as: 'rol',
    })

    Usuario.hasMany(db.Productos, {
      foreignKey: 'created_by',
      as: 'createdby',
    })
  }

  return Usuario;
}