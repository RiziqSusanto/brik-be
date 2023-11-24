'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
      });
    }
  }
  Category.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    name: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Categories',
    paranoid: true
  });
  return Category;
};
