'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswerRate = sequelize.define('AnswerRate', {
    uuid_rates: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
      unique: true
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  AnswerRate.associate = function(models) {
    AnswerRate.belongsTo(models.Answer, { foreignKey: 'answer_uuid', as: 'Answer' });
  };
  return AnswerRate;
};