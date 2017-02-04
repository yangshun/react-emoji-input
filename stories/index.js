import React from 'react';
import { storiesOf } from '@kadira/storybook';
import FooBar from '../src';

storiesOf('FooBar', module)
  .add('default', () => (
    <FooBar/>
  ))
  .add('with contents', () => (
    <FooBar contents="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
  ));
