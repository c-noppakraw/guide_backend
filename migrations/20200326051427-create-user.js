'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      uuid_user: {
				allowNull: false,
				autoIncrement: false,
				primaryKey: true,
				unique: true,
				type: Sequelize.UUID
      },
      img: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
				allowNull: false
      },
      password: {
				type: Sequelize.STRING,
				allowNull: false
      },
      visible: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 1
			},
			level: {
				type: Sequelize.INTEGER,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};