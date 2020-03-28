'use strict';
module.exports = (sequelize, DataTypes) => {
  const Articles = sequelize.define('Articles', {
    uuid_articles: {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imag_cover: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    season: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
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
    },
  }, {});
  Articles.associate = function(models) {
    Articles.belongsTo(models.User, { foreignKey: 'user_uuid', as: 'User' });
    Articles.hasMany(models.Galleries, {
      foreignKey: {
        field: 'articles_uuid',
        allowNull: false
      },
      as: 'Galleries'
    });
  };
  return Articles;
};