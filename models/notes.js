module.exports = function (sequelize, DataTypes) {
    sequelize.sync()
    return sequelize.define("notes", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product: DataTypes.STRING,
      productid: DataTypes.STRING,
      source: DataTypes.STRING,
      content: DataTypes.TEXT
    });
  };