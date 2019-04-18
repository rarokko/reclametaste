import React from 'react';
import MarvelApi from '../helpers/Request/MarvelApi';

describe('MarvelApi', () => {
  it('return characters without filters', async () => {

    let response = await MarvelApi.getCharacters();
    expect(response.data.data).not.toBe(null);

  });

  it('return characters with name', async () => {

    let response = await MarvelApi.getCharacters('spider');
    expect(response.data.data).toMatchSnapshot();

  });

  it('return characters with name and offset', async () => {

    let response = await MarvelApi.getCharacters('spider', 10);
    expect(response.data.data).toMatchSnapshot();

  });

  it('return comics without filters', async () => {

    let response = await MarvelApi.getComics();
    expect(response.data.data).not.toBe(null);

  });

  it('return comics with name', async () => {

    let response = await MarvelApi.getComics('spider');
    expect(response.data.data).toMatchSnapshot();

  });

  it('return comics with name and offset', async () => {

    let response = await MarvelApi.getComics('spider', 10);
    expect(response.data.data).toMatchSnapshot();

  });
});