import React, { Component, PropTypes } from 'react';

const styles = {
  border: '1px solid #ccc',
  borderRadius: 10,
  fontFamily: '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif',
  maxWidth: 400,
  padding: 10,
};

class FooBar extends Component {
  render() {
    return (
      <div style={styles}>
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
