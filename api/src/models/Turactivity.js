const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('turactivity', {
    ID: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    dificultad: {
      type: DataTypes.INTEGER,
      validate: {
          inRange(value) {
              if (value < 1 || value > 5) {
                throw new Error("La dificultad debe estar entre 1 y 5")
              }
          }
      }
    },
    duracion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temporada: {
      type: DataTypes.ENUM('Verano','Otoño','Invierno','Primavera'),
    }
  });
};
