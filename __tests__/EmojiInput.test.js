import React from 'react';
import { shallow } from 'enzyme';

import EmojiInput from '../src/EmojiInput';

describe('<EmojiInput/>', () => {
  it('should render', () => {
    const wrapper = shallow(<EmojiInput />);
    expect(wrapper.find('textarea').length).toBe(1);
  });

  it('should render <input> for input mode', () => {
    const wrapper = shallow(<EmojiInput input />);
    expect(wrapper.find('input').length).toBe(1);
  });
});
