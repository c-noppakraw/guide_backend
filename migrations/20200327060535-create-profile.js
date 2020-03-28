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
      // code: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   type: Sequelize.INTEGER,
      //   defaultValue: '0000'
      // },
      guide_code: {
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
        allowNull: false
      },
      passport_exp: {
        type: Sequelize.DATE,
        allowNull: false
      },
      visa_no: {
        type: Sequelize.STRING,
        allowNull: false
      },
      visa_exp: {
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
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
    return queryInterface.dropTable('Profiles');
  }
};