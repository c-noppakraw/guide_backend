'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    uuid_profile: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
      unique: true
    },
    guide_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    first_name_th: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name_th: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name_en: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name_en: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passport_no: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    passport_exp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    visa_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    visa_exp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    user_created: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_update: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  Profile.associate = function(models) {
    Profile.belongsTo(models.User, { foreignKey: 'user_uuid', as: 'User' });
  };
  return Profile;
};