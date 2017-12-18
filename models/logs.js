module.exports = (sequelize, DataTypes)=> {
    sequelize.sync();
    return sequelize.define("logs", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fileName: DataTypes.STRING,
      functionName: DataTypes.STRING,
      detail: DataTypes.TEXT
    });
  };