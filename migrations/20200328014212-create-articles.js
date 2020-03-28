'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Articles', {
      uuid_articles: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false,
        unique: true
      },
      title: {
        type: Sequelize.STRING,
        autoIncrement: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      imag_cover: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      season: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      visible: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      user_created: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_update: {
        type: Sequelize.STRING,
        allowNull: true
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Articles');
  }
};