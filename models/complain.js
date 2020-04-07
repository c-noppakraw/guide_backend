'use strict';
module.exports = (sequelize, DataTypes) => {
  const Complain = sequelize.define('Complain', {
    uuid_complains: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
      unique: true
    },
    visible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    date_start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_end: {
      type: DataTypes.DATE,
      allowNull: false
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
  Complain.associate = function(models) {
    Complain.belongsTo(models.User, { foreignKey: 'user_uuid', as: 'User' });
    Complain.belongsTo(models.Tourgroups, { foreignKey: 'tour_uuid', as: 'Tourgroups' });
  };
  return Complain;
};