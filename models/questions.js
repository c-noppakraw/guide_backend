'use strict';
module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    uuid_questions: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
      unique: true
    },
    question: {
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
    }
  }, {});
  questions.associate = function(models) {
    questions.belongsTo(models.User, { foreignKey: 'user_uuid', as: 'User' });
    questions.hasMany(models.Answer, {
      foreignKey: {
        field: 'questions_uuid',
        allowNull: false
      },
      as: 'Answer'
    });
  };
  return questions;
};