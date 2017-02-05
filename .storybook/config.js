import { configure } from '@kadira/storybook';
import '../css/styles.scss';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
