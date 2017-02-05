import React, { Component, PropTypes } from 'react';

import './FooBar.scss';

class FooBar extends Component {
  render() {
    return (
      <div className="foo-bar">
        <h3>Foo Bar</h3>
        {this.props.contents && <p>{this.props.contents}</p>}
      </div>
    );
  }
}

FooBar.propTypes = {
  contents: PropTypes.string,
};

export default FooBar;
