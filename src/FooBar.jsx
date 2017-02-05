import React, { PropTypes } from 'react';

const FooBar = (props) => {
  return (
    <div className="foo-bar">
      <h3>Foo Bar</h3>
      <p>{props.contents}</p>
    </div>
  );
};

FooBar.propTypes = {
  contents: PropTypes.string,
};

FooBar.defaultProps = {
  contents: 'Default contents.',
};

export default FooBar;
