module.exports = (sequelize, dataTypes) => {
  const Foto = sequelize.define('Fotos', {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    filename: {
      type: dataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    path: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    producto_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Productos',
        key: 'id'
      },
    }
  },
  {
    timestamps: false,
    underscored: true,
  })

  Foto.associate = function(db) {
    Foto.belongsTo(db.Productos, {
      as: 'imagenes',
      foreignKey: 'producto_id'
    })
  }

  return Foto;
}