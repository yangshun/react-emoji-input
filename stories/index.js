import React from 'react';
import { storiesOf } from '@kadira/storybook';
import EmojiInput from '../src/EmojiInput';

const wrapperStyle = { width: 400, fontFamily: 'sans-serif' };

function Wrapper(component) {
  return (
    <div style={wrapperStyle}>
      {component}
    </div>
  );
}

class ControlledWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'This a controlled component. You have to provide an onChange prop.',
    };
  }

  render() {
    return (
      <div style={wrapperStyle}>
        <EmojiInput
          value={this.state.value}
          onChange={(value) => {
            this.setState({ value });
          }}
        />
      </div>
    );
  }
}

storiesOf('Emoji Input', module)
  .add('Default', () => (
    Wrapper(<EmojiInput
      defaultValue="Start typing in this box! Type ':' to show emoji suggestions!"
    />)
  ))
  .add('Shortname', () => (
    Wrapper(<EmojiInput
      defaultValue="Start typing in this box! Type ':' to show emoji suggestions! In this shortname mode, the selected emoji will appear as keywords instead."
      shortname
    />)
  ))
  .add('Controlled component', () => (
    <ControlledWrapper/>
  ))
  .add('Input', () => (
    Wrapper(<EmojiInput
      defaultValue="Inputs are supported too!"
      input
    />)
  ));
