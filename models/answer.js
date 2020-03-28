'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    uuid_answer: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
      unique: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false
    },
    career: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.questions, { foreignKey: 'questions_uuid', as: 'questions' });
    Answer.belongsTo(models.Tourgroups, { foreignKey: 'tour_uuid', as: 'Tourgroups' });
    Answer.hasMany(models.AnswerRate, {
      foreignKey: {
        field: 'answer_uuid',
        allowNull: false
      },
      as: 'AnswerRate'
    });
  };
  return Answer;
};