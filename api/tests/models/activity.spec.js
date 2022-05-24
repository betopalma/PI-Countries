const { Activity, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Modelo: Activity', () => {

  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validaciones', () => {
    before(() => Activity.sync({ force: true }));

    describe('idd', () => {
      
      it('No deberia crear la actividad si el idd tiene mas de 6 caracteres', async () => {
        try {
            await Activity.create({idd:'ASSDDD123', name:'Error',dificultad:2,duracion:100,temporada:'Verano'});
          } catch (error) {
            expect(error.message).to.equal('el valor es demasiado largo para el tipo character varying(6)');
          }
      });

      it('Deberia crear la actividad si los datos son validos', async () => {

            const act = await Activity.create({idd:'ASSDDD', name:'Actividad Valida',dificultad:2,duracion:100,temporada:'Verano'});
            expect(act.idd).to.equal('ASSDDD')
      });
      
      it('No deberia crear la actividad si el idd ya existe', async () => {
            try {
                const act = await Activity.create({idd:'ASSDDD', name:'Actividad Duplicada',dificultad:2,duracion:100,temporada:'Verano'});
            }  
            catch (error) {
                expect(error.message).to.equal('llave duplicada viola restricción de unicidad «activities_pkey»')
            }
        });
    });

    describe('Temporada', () => {
      it('No deberia crear la actividad si la temporada no es valida', async () => {
        try {
            await Activity.create({idd:'ASSDDD', name:'Error',dificultad:2,duracion:100,temporada:'Anual'});
          } catch (error) {
            expect(error.message).to.include('la sintaxis de entrada no es válida para el enum enum_activities_temporada');
          }
      });
    });

    describe('Dificultad', () => {
        it('No deberia crear la actividad si la dificultad no esta entre 1 y 5', async () => {
            try {
                await Activity.create({idd:'ASSDDD', name:'Error',dificultad:8,duracion:100,temporada:'Verano'});
            } catch (error) {
                expect(error.message).to.include('La dificultad debe estar entre 1 y 5');
            }
        });
    });
  })
})
