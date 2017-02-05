import React, { Component, PropTypes } from 'react';

class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  traverseSuggestions(increment) {
    const index = this.state.selectedIndex + (increment ? 1 : -1);
    this.setState({
      selectedIndex: (index + this.props.options.length) % this.props.options.length,
    });
  }

  selectSuggestion() {
    this.props.onSelect(this.props.options[this.state.selectedIndex]);
  }

  render() {
    return (
      <div className="ei-suggestions-container" style={this.props.style}>
        <ul className="ei-suggestions">
          {this.props.options.map((option, index) => {
            return (
              <li
                key={option.value}
                className={index === this.state.selectedIndex ? 'selected' : ''}
                onClick={() => {
                  this.props.onSelect(option);
                }}
                onMouseOver={() => {
                  this.setState({
                    selectedIndex: index,
                  });
                }}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

Suggestions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.any,
  })).isRequired,
  style: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Suggestions;
