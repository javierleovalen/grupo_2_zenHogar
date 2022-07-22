module.exports = (sequelize, dataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: dataTypes.STRING(45)
    }
  },
  {
    timestamps:false,
    freezeTableName: true,
  })

  Role.assiaciate = (db) => {
    Role.hasMany(db.User,{foreignKey:'rolId',as:'Rol'})
  }
  return Role;
}