'use strict';
module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    uuid_news: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    visible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    user_created: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_update: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  News.associate = function(models) {
    News.belongsTo(models.User, { foreignKey: 'user_uuid', as: 'User' });
  };
  return News;
};