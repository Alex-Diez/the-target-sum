import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TargetSumGame from '../TargetSumGame';

configure({adapter: new Adapter()});

describe('target sum game', () => {
  test('check initial state of the game', () => {
    const game = mount(<TargetSumGame/>);

    const target = game.find('.target');
    const numbers = game.children('.number');
    const start = game.find('.start');

    expect(target.text()).toBe('?');
    expect(numbers.map(item => item.text())).toBeEqual(['?', '?', '?', '?', '?', '?']);
    expect(start.text()).toBe('start the game');
  });
});
