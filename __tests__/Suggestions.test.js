import React from 'react';
import { shallow } from 'enzyme';

import Suggestions from '../src/Suggestions';

describe('<Suggestions/>', () => {
  const style = { top: 0, left: 0 };
  const options = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
    { value: 'baz', label: 'Baz' },
  ];

  it('should render correctly', () => {
    const wrapper = shallow(<Suggestions style={style} options={options} onSelect={() => {}} />);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('ul > li').length).toBe(3);
    expect(wrapper.state().selectedIndex).toBe(0);
  });

  describe('traverseSuggestions', () => {
    it('should move forwards correctly', () => {
      const wrapper = shallow(<Suggestions style={style} options={options} onSelect={() => {}} />);
      expect(wrapper.state().selectedIndex).toBe(0);
      wrapper.instance().traverseSuggestions(true);
      expect(wrapper.state().selectedIndex).toBe(1);
      wrapper.instance().traverseSuggestions(true);
      expect(wrapper.state().selectedIndex).toBe(2);
      wrapper.instance().traverseSuggestions(true);
      expect(wrapper.state().selectedIndex).toBe(0);
    });

    it('should move backwards correctly', () => {
      const wrapper = shallow(<Suggestions style={style} options={options} onSelect={() => {}} />);
      expect(wrapper.state().selectedIndex).toBe(0);
      wrapper.instance().traverseSuggestions();
      expect(wrapper.state().selectedIndex).toBe(2);
      wrapper.instance().traverseSuggestions();
      expect(wrapper.state().selectedIndex).toBe(1);
      wrapper.instance().traverseSuggestions();
      expect(wrapper.state().selectedIndex).toBe(0);
    });

    it('should be able to move forwards and backwards', () => {
      const wrapper = shallow(<Suggestions style={style} options={options} onSelect={() => {}} />);
      expect(wrapper.state().selectedIndex).toBe(0);
      wrapper.instance().traverseSuggestions();
      expect(wrapper.state().selectedIndex).toBe(2);
      wrapper.instance().traverseSuggestions(true);
      expect(wrapper.state().selectedIndex).toBe(0);
      wrapper.instance().traverseSuggestions(true);
      expect(wrapper.state().selectedIndex).toBe(1);
      wrapper.instance().traverseSuggestions(true);
      expect(wrapper.state().selectedIndex).toBe(2);
      wrapper.instance().traverseSuggestions();
      expect(wrapper.state().selectedIndex).toBe(1);
      wrapper.instance().traverseSuggestions();
      expect(wrapper.state().selectedIndex).toBe(0);
    });
  });

  describe('selectSuggestion', () => {
    it('should call onSelect with the selectedOption', () => {
      const mockOnSelect = jest.fn();
      const wrapper = shallow(<Suggestions style={style} options={options} onSelect={mockOnSelect} />);
      wrapper.setState({ selectedIndex: 1 });
      wrapper.instance().selectSuggestion();
      expect(mockOnSelect).toBeCalledWith({ value: 'bar', label: 'Bar' });
    });
  });

  describe('clicking on suggestion', () => {
    it('should call onSelect with the selectedOption', () => {
      const mockOnSelect = jest.fn();
      const wrapper = shallow(<Suggestions style={style} options={options} onSelect={mockOnSelect} />);
      wrapper.find('li').at(2).simulate('click');
      expect(mockOnSelect).toBeCalledWith({ value: 'baz', label: 'Baz' });
    });
  });

  describe('mouseOver of suggestion', () => {
    it('should update the selectedIndex', () => {
      const wrapper = shallow(<Suggestions style={style} options={options} onSelect={() => {}} />);
      expect(wrapper.state().selectedIndex).toBe(0);
      wrapper.find('li').at(1).simulate('mouseOver');
      expect(wrapper.state().selectedIndex).toBe(1);
      wrapper.find('li').at(2).simulate('mouseOver');
      expect(wrapper.state().selectedIndex).toBe(2);
    });
  });
});
