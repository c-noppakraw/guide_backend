'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid_user: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
      unique: true
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
			unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    visible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  User.associate = function(models) {
    User.hasOne(models.Profile, {
      onDelete: 'cascade',
      foreignKey: {
        field: 'user_uuid',
        allowNull: false
      },
      as: 'Profile'
    });
    User.hasMany(models.Tourgroups, {
      foreignKey: {
        field: 'user_uuid',
        allowNull: false
      },
      as: 'Tourgroups'
    });
    User.hasMany(models.Articles, {
      foreignKey: {
        field: 'user_uuid',
        allowNull: false
      },
      as: 'Articles'
    });
    User.hasMany(models.News, {
      foreignKey: {
        field: 'user_uuid',
        allowNull: false
      },
      as: 'News'
    });
    User.hasMany(models.questions, {
      foreignKey: {
        field: 'user_uuid',
        allowNull: false
      },
      as: 'questions'
    });
    User.hasMany(models.Complain, {
      foreignKey: {
        field: 'user_uuid',
        allowNull: false
      },
      as: 'Complain'
    });
  };
  return User;
};