module.exports = (sequelize, dataTypes) => {
  const Rol = sequelize.define('Roles', {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: dataTypes.STRING(45),
      allowNull: false,
    }
  },
  {
    timestamps: false,
    underscored: true,
  })

  Rol.associate = function(db) {
    Rol.belongsTo(db.Usuarios, {
      as: 'rol',
      foreignKey: 'rol_id'
    })
  }

  return Rol;
}