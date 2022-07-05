module.exports = (sequelize, dataTypes) => {
  const Categoria = sequelize.define('Categorias', {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: dataTypes.STRING(45),
      unique: true,
      allowNull: false,
    }
  },
  {
    timestamps: false,
    underscored: true,
  })

  Categoria.associate = function(db) {
    Categoria.hasMany(db.Productos, {
      as: 'categoria',
      foreignKey: 'categoria_id'
    })
  }

  return Categoria;
}