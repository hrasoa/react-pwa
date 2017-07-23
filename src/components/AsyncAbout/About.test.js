import React from 'react';
import { shallow } from 'enzyme';
import About from './About';

describe('About suite', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<About />).contains(<h1>About</h1>)).toBe(true);
  });
});
