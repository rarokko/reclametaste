import React from 'react';
import {HomeUnlogged} from '../containers/HomeUnlogged/HomeUnlogged';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';
import { Select } from '../components/Select/Select';
import { Grid } from '../components/Grid/Grid';
import { Loader } from '../components/Loader/Loader';
import { Header } from '../components/Header/Header';

describe('Button', () => {
  it('render properly', () => {
    const component = shallow(<Button/>);
    expect(component).toMatchSnapshot();
  });
});

describe('Grid', () => {
  it('render properly', () => {
    const component = shallow(
    <Grid>
      <div/>
      <div/>
      <div/>
    </Grid>
      );
    expect(component).toMatchSnapshot();
  });
});

describe('Header', () => {
  it('render properly', () => {
    const component = shallow(<Header/>);
    expect(component).toMatchSnapshot();
  });
});

describe('Input', () => {
  it('render properly', () => {
    const component = shallow(<Input/>);
    expect(component).toMatchSnapshot();
  });
});

describe('Loader', () => {
  it('render properly', () => {
    const component = shallow(<Loader/>);
    expect(component).toMatchSnapshot();
  });
});

describe('Select', () => {
  it('render properly', () => {
    const component = shallow(<Select/>);
    expect(component).toMatchSnapshot();
  });
});