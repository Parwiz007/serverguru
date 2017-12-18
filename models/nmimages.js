module.exports = function (sequelize, DataTypes) {
    sequelize.sync();
    return sequelize.define("nmimages", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      domain: DataTypes.STRING,
      filename: DataTypes.STRING
    });
  };