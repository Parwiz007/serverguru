module.exports = function (sequelize, DataTypes) {
    sequelize.sync();
    return sequelize.define("records", {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: DataTypes.STRING,
      product: DataTypes.STRING,
      type: DataTypes.STRING,
      value: DataTypes.STRING,
      tags: DataTypes.BLOB,
      active: {
        type:DataTypes.BOOLEAN,
        defaultValue: true
      },
      notes: DataTypes.STRING(255)
    });
  };