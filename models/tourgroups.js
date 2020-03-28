'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tourgroups = sequelize.define('Tourgroups', {
    uuid_tour: {
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
    code_tour_group: {
      type: DataTypes.STRING,
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
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airlines: {
      type: DataTypes.STRING,
      allowNull: false
    },
    num_people: {
      type: DataTypes.INTEGER,
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
  Tourgroups.associate = function(models) {
    Tourgroups.belongsTo(models.User, { foreignKey: 'user_uuid', as: 'User' });
    Tourgroups.hasMany(models.Answer, {
      foreignKey: {
        field: 'tour_uuid',
        allowNull: false
      },
      as: 'Answer'
    });
    Tourgroups.hasMany(models.Complain, {
      foreignKey: {
        field: 'tour_uuid',
        allowNull: false
      },
      as: 'Complain'
    });
  };
  return Tourgroups;
};