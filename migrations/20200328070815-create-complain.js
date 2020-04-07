'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Complains', {
      uuid_complains: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false,
        unique: true
      },
      visible: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      date_start: {
        type: Sequelize.DATE,
        allowNull: false
      },
      date_end: {
        type: Sequelize.DATE,
        allowNull: false
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
    return queryInterface.dropTable('Complains');
  }
};