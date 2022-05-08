const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    IDD: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    flags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subregion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.STRING,
    },
    poblacion: {
      type: DataTypes.BIGINT,
    }
  });
};
