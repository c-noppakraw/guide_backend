'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Profiles', {
      uuid_profile: {
				allowNull: false,
				autoIncrement: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
				unique: true,
				type: Sequelize.UUID
      },
      guide_code: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      first_name_th: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name_th: {
        type: Sequelize.STRING,
        allowNull: false
      },
      first_name_en: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name_en: {
        type: Sequelize.STRING,
        allowNull: false
      },
      passport_no: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      passport_exp: {
        type: Sequelize.DATE,
        allowNull: false
      },
      visa_no: {
        type: Sequelize.STRING,
        allowNull: true
      },
      visa_exp: {
        type: Sequelize.DATE,
        allowNull: true
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      user_created: {
        type: Sequelize.STRING,
        allowNull: true
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
    return queryInterface.dropTable('Profiles');
  }
};