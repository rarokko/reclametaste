import React from 'react';
import BeerApi from '../helpers/Request/BeerApi';

describe('BeerApi', () => {
  it('return characters without filters', async () => {

    let response = await BeerApi.getBeers();
    expect(response.data).toMatchSnapshot();

  });

  it('return beers with name', async () => {

    let response = await BeerApi.getBeers('buzz', 'beer_name');
    expect(response.data).toMatchSnapshot();

  });

  it('return beers by ibu', async () => {

    let response = await BeerApi.getBeers('1000', 'ibu_gt');
    expect(response.data).toMatchSnapshot();

  });

  it('return beers by food', async () => {

    let response = await BeerApi.getBeers('pizza', 'food');
    expect(response.data).toMatchSnapshot();

  });
});