'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('News', {
      uuid_news: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false,
        unique: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      img: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      detail: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      pin: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date_start: {
        type: Sequelize.DATE,
        allowNull: false
      },
      date_end: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('News');
  }
};