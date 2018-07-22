import { configure } from '@storybook/react';

function loadStories() {
  require('../src/views/Home/story');
}

configure(loadStories, module);
