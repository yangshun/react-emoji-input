import React from 'react';
import { storiesOf } from '@kadira/storybook';
import EmojiInput from '../src/EmojiInput';

const DEFAULT_ROWS = 10;

function Wrapper(component) {
  return (
    <div style={{ width: 400, fontFamily: 'sans-serif' }}>
      {component}
    </div>
  );
}

storiesOf('Emoji Input', module)
  .add('Default', () => (
    Wrapper(<EmojiInput rows={DEFAULT_ROWS}
      defaultValue="Start typing in this box! Type ':' to show emoji suggestions!"
    />)
  ))
  .add('Shortname', () => (
    Wrapper(<EmojiInput rows={DEFAULT_ROWS}
      defaultValue="Start typing in this box! Type ':' to show emoji suggestions! In this shortname mode, the selected emoji will appear as keywords instead."
      shortname
    />)
  ))
  .add('Input', () => (
    Wrapper(<EmojiInput
      defaultValue="Inputs are supported too!"
      input
    />)
  ));
