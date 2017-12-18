module.exports = function (sequelize, DataTypes) {
    sequelize.sync()
    return sequelize.define("issues", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      recordId: DataTypes.STRING,
      issue: DataTypes.TEXT,
      resolved: {
        type:DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
  };