'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('questions', {
      uuid_questions: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false,
        unique: true
      },
      question: {
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
    return queryInterface.dropTable('questions');
  }
};