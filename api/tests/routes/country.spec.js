/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  IDD: 'ARG',
  name: 'Argentina',
  flags: 'https://flagcdn.com/ar.svg',
  continent: "Americas",
  capital: "Buenos Aires",
  subregion: "South America",
  area: 2780400,
  population: 45376763
};
const country2 = {
  IDD: 'BRA',
  name: 'Brazil',
  flags: 'https://flagcdn.com/br.svg',
  continent: "Americas",
  capital: "Brasília"
};
const country3 = {
  IDD: 'GIB',
  name: 'Gibraltar',
  flags: 'https://flagcdn.com/gi.svg',
  continent: "Europe",
  capital: "Gibraltar"
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  before(
        () => conn.sync({ force: true })
        .then(() => Country.create(country))
        .then(() => Country.create(country2))
        .then(() => Country.create(country3))
     );

  describe('GET /countries', () => {
    it('Deberia responder con 200', () =>
      agent.get('/countries').expect(200).expect('Content-Type', /json/)
    );
  });

  describe('GET /countries', () => {
    it('Deberia responder con los datos del registro agregado', () =>
      agent.get('/countries')
      .expect(function(res) {
        expect(res.body[0].name).to.eql('Argentina'); 
        expect(res.body[0].IDD).to.eql('ARG'); 
        expect(res.body[0].continent).to.eql('Americas'); 
        expect(res.body[0].capital).to.eql('Buenos Aires'); 
        expect(res.body[0].area).to.eql('2780400'); 
        expect(res.body[0].population).to.eql('45376763'); 
        })
    );
  });

  describe('GET /countries/:id', () => {
    it('Deberia responder con los datos del detalle', () =>
      agent.get('/countries/ARG')
      .expect(function(res) {
        expect(res.body.name).to.eql('Argentina'); 
        expect(res.body.IDD).to.eql('ARG'); 
        expect(res.body.continent).to.eql('Americas'); 
        expect(res.body.capital).to.eql('Buenos Aires'); 
        expect(res.body.area).to.eql('2780400'); 
        expect(res.body.population).to.eql('45376763'); 
        expect(res.body.activities.length).to.eql(0);
        })
    );
  });

  describe('GET /countries?', () => {
    it('Deberia responder con los datos de Argentina', () =>
      agent.get('/countries?name=argen')
      .expect(function(res) {
        expect(res.body[0].name).to.eql('Argentina'); 
        expect(res.body[0].IDD).to.eql('ARG'); 
        })
    );
  });

  describe('GET /countries?', () => {
    it('Deberia responder con datos de 2 Paises (Brazil y Gibraltar', () =>
      agent.get('/countries?name=bra')
      .expect(function(res) {
        expect(res.body[0].name).to.eql('Brazil'); 
        expect(res.body[1].name).to.eql('Gibraltar'); 
        })
    );
  });

 });
