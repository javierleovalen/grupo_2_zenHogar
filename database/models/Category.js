module.exports = (sequelize, dataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: dataTypes.STRING(45),
      allowNull: false,
    }
  },
  {
    timestamps:false,
  })

  Category.associate = function(db) {
    Category.hasMany(db.Product)
  } 

  return Category;
}