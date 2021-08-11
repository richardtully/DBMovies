'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('movietabletags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movietableId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'movietables'
          },
          key: 'id'
        },
        allowNull: false
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'tags'
          },
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('movietabletags');
  }
};