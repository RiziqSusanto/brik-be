'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
      });
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    categoryId: {
      type:DataTypes.UUID,
      references: {
        model: 'Category',
        key: 'id'
      }
    },
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    weight: DataTypes.FLOAT,
    width: DataTypes.FLOAT,
    length: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    image: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    paranoid: true
  });
  return Product;
};
