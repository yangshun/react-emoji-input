import React from 'react';
import { shallow } from 'enzyme';

import FooBar from '../src/FooBar';

describe('<FooBar/>', () => {
  it('should render Foo Bar', () => {
    const wrapper = shallow(<FooBar />);
    expect(wrapper.find('h3').text()).toBe('Foo Bar');
  });

  it('should render Foo Bar with contents', () => {
    const wrapper = shallow(<FooBar contents="Some contents." />);
    expect(wrapper.find('h3').text()).toBe('Foo Bar');
    expect(wrapper.find('p').text()).toBe('Some contents.');
  });
});
