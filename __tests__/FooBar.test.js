import React from 'react';
import { shallow } from 'enzyme';

import FooBar from '../src/FooBar';

describe('<FooBar/>', () => {
  it('should render Foo Bar', () => {
    const wrapper = shallow(<FooBar />);
    expect(wrapper.text()).toBe('Foo Bar');
  });
});
