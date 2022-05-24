import React from 'react';
import { configure, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import isReact from 'is-react';
import Pais from '../src/Components/Pais.js'
import thunk from 'redux-thunk';
import * as ReactRedux from 'react-redux';
import * as actions from '../src/Actions/actions.js'
import nock from 'nock';
import * as data from './db.json'

describe('<Pais />', () => {
    
    let countryDetail, useSelectorStub, useSelectorFn, useEffect;

    const pais = {
        idd: 'ARG',
        name: 'Argentina',
        continent: 'Americas',
        flags: 'https://flagcdn.com/ar.svg'
    }

    const mockStore = configureStore([thunk]);

    beforeAll(() => expect(isReact.classComponent(Pais)).toBeFalsy());
    const mockUseEffect = () => useEffect.mockImplementation((fn) => fn());

    beforeEach(() => {

        const apiMock = nock('http://localhost:3001').persist();
    
        // "/countries" => Retorna la propiedad products del archivo data.json
        apiMock.get('/countries').reply(200, data.countries);
    
        // "/countries/:id" => Retorna un producto matcheado por su id
        apiMock.get(/\/countries\/\d/).reply(200, (uri, requestBody) => {
          const idStr = uri.split('/').pop();
          const id = Number(idStr);
          return data.countries.find((country) => country.idd === id);
        });
        useSelectorStub = jest.spyOn(ReactRedux, 'useSelector');
        useSelectorFn = (id) =>
          useSelectorStub.mockReturnValue(store(id).getState().countryDetail);
        useEffect = jest.spyOn(React, 'useEffect');
        countryDetail = (id) =>
          mount(
            <ReactRedux.Provider store={store(id)}>
              <MemoryRouter initialEntries={[`/countries/${id}`]}>
                <ProductDetail match={match(id)} />
              </MemoryRouter>
            </ReactRedux.Provider>,
          );
        mockUseEffect();
        mockUseEffect();
      });

    afterEach(() => jest.restoreAllMocks());

    it('Deberia.....', async () => {
        // Nuevamente testeamos todo el proceso. Tenes que usar un useEffect, y despachar la acción "getProductDetail".
        const useDispatch = jest.spyOn(ReactRedux, 'useDispatch');
        const getCountriesDetail = jest.spyOn(actions, 'getCountriesDetail');
        countryDetail(1);
        expect(useEffect).toHaveBeenCalled();
        expect(useDispatch).toHaveBeenCalled();
        expect(getCountriesDetail).toHaveBeenCalled();
    
        productDetail(2);
        expect(useEffect).toHaveBeenCalled();
        expect(useDispatch).toHaveBeenCalled();
        expect(getCountriesDetail).toHaveBeenCalled();
      });



})