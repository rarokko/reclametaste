import React from 'react';
import Request from '../helpers/Request/Request';

describe('Request', () => {
  it('the same userid on login', async () => {

    let response = await Request.loginUser('rarokko@msn.com', '123456');
    expect(response.user.uidu).toMatchSnapshot();

  });

  it('check user session', async () => {

    let response = await Request.checkUserSession();
    expect(response).not.toBe(null);

  });

  it('get marvel likes', async () => {

    let response = await Request.getUserLikes('marvel');
    expect(response).not.toBe(null);

  });

  it('insert marvel likes', async () => {

    let response = await Request.toogleUserLike('marvel', 1011334, true);
    expect(response).toMatchSnapshot();

  });

  it('remove marvel likes', async () => {

    let response = await Request.toogleUserLike('marvel', 1011334, false);
    expect(response).toMatchSnapshot();

  });

  it('get beer likes', async () => {

    let response = await Request.getUserLikes('beer');
    expect(response).not.toBe(null);

  });

  it('insert beer likes', async () => {

    let response = await Request.toogleUserLike('beer', 1011334, true);
    expect(response).toMatchSnapshot();

  });

  it('remove beer likes', async () => {

    let response = await Request.toogleUserLike('beer', 1011334, false);
    expect(response).toMatchSnapshot();

  });
});