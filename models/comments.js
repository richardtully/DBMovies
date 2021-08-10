'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.movietable = this.belongsTo(models.movietable, { foreignKeyConstraint: true, onDelete: 'CASCADE'})
    }
  };
  Comments.init({
    text: DataTypes.STRING,
    movietableId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};