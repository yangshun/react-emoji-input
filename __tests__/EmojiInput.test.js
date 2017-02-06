import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';

import EmojiInput, { initialState } from '../src/EmojiInput';

describe('<EmojiInput/>', () => {
  describe('TextComponent rendering', () => {
    it('should render <textarea> for default mode', () => {
      const wrapper = shallow(<EmojiInput />);
      expect(wrapper.find('textarea').length).toBe(1);
    });

    it('should render <input> for input mode', () => {
      const wrapper = shallow(<EmojiInput input />);
      expect(wrapper.find('input').length).toBe(1);
    });
  });

  describe('getValue', () => {
    it('should return the value of the TextComponent', () => {
      const wrapper = shallow(<EmojiInput value="Lorem ipsum" />);
      expect(wrapper.find('textarea').prop('value')).toBe('Lorem ipsum');
    });
  });

  describe('resetState', () => {
    it('should reset to initial state', () => {
      const wrapper = shallow(<EmojiInput />);
      wrapper.setState({ leftIndex: 1, caretPosition: 2 });
      expect(_.isEqual(wrapper.state(), Object.assign({}, initialState,
        { leftIndex: 1, caretPosition: 2 }))).toBe(true);
    });
  });
});
