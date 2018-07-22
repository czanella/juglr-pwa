import React from 'react';
import { storiesOf, action } from '@storybook/react';
import Home from './Home';

storiesOf('Home', module)
    .add('Default Home props', () => (
        <Home message={'there'} changeHello={action('changeHello')} />
    ));
