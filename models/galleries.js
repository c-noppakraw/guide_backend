'use strict';
module.exports = (sequelize, DataTypes) => {
  const Galleries = sequelize.define('Galleries', {
    uuid_galleries: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
      unique: true
    },
    img_name: {
      type: DataTypes.TEXT,
      allowNull: true
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
  Galleries.associate = function(models) {
    Galleries.belongsTo(models.User, { foreignKey: 'articles_uuid', as: 'Articles' });
  };
  return Galleries;
};