module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    lastname: {
      type: dataTypes.STRING(45),
    },
    email: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    phone: {
      type: dataTypes.STRING,
      unique: true,
    },
    password: {
      type: dataTypes.STRING.BINARY,
      allowNull:false,
    },
    profileImg: {
      type: dataTypes.STRING(100),
      defaultValue: 'default.jpg'
    }
  },
  {
    paranoid: true,
  })
  
  /*
  *-> Aca van las relaciones
  */
  User.associate = function(db) {
    User.belongsToMany(db.Product,{through: 'Cart', as: 'accountCart'});
    User.hasMany(db.Product, {
      foreignKey: 'createdBy'
    });
    User.belongsTo(db.Role,{foreignKey:'rolId',as:'Rol'});
  }


  return User;
}