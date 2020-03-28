'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tourgroups', {
      uuid_tour: {
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
      code_tour_group: {
        type: Sequelize.STRING,
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
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      airlines: {
        type: Sequelize.STRING,
        allowNull: false
      },
      num_people: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('Tourgroups');
  }
};