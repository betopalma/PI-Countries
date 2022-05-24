const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {

  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));

    describe('name', () => {
      
      xit('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      
      xit('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });

    });
    
    describe('idd', ()=> {  

      xit('should work when its a valid IDD', () => {
        Country.create({ idd: 'ARG' });
      });

    })
  })
})
