'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movietable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.Comments = this.hasMany(models.Comments, { onDelete: 'cascade'})
      this.movietable = this.belongsToMany(models.tags, { through: models.movietabletags})
    }
  };
  movietable.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'movietable',
  });
  return movietable;
};