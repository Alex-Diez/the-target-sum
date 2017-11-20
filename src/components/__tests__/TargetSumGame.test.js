import 'jsdom-global/register';
import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TargetSumGame from '../TargetSumGame';

configure({adapter: new Adapter()});

describe('target sum game', () => {
  let game;
  let target;
  let numbers;
  let start;

  beforeEach(() => {
    const dummyGenerator = () => [1, 2, 3, 4, 5, 6];

    game = mount(
      <TargetSumGame
        gameId={1}
        targetComputer={(numbers) => 12}
        numberSource={dummyGenerator}
        onRestart={() => {}}
      />
    );

    target = game.find('.target');
    numbers = game.find('.number');
    start = game.find('.start');
  });

  const startGame = () => start.simulate('click');

  const contentOf = (nodes) => nodes.map(node => node.text());

  test('check initial state of the game', () => {
    expect(target.text()).toBe('?');
    expect(numbers.map(num => num.text())).toEqual(['?', '?', '?', '?', '?', '?']);
    expect(start.text()).toBe('start the game');
  });

  test('target and numbers should be generated when start button is clicked', () => {
    startGame();

    expect(target.text()).toBe('12');
    expect(contentOf(numbers)).toEqual(['1', '2', '3', '4', '5', '6']);
  });

  test('number button becomes clicked and can\'t be clicked again', () => {
    startGame();

    numbers.at(0).simulate('click');

    let clickedNumbers = game.find('.clicked');

    expect(contentOf(clickedNumbers)).toContain('1');
  });

  test('target must have green color when player succeeds', () => {
    startGame();

    numbers.at(0).simulate('click');
    numbers.at(4).simulate('click');
    numbers.at(5).simulate('click');

    expect(game.find('.success').exists()).toBe(true);
  });

  test('target must have red color when player failed', () => {
    startGame();

    numbers.at(0).simulate('click');
    numbers.at(1).simulate('click');
    numbers.at(3).simulate('click');
    numbers.at(5).simulate('click');

    expect(game.find('.failure').exists()).toBe(true);
  });

  test('number can be clicked only once', () => {
    startGame();

    numbers.at(0).simulate('click');
    numbers.at(4).simulate('click');
    numbers.at(4).simulate('click');
    numbers.at(4).simulate('click');
    numbers.at(5).simulate('click');

    expect(game.find('.success').exists()).toBe(true);
  });

  test('game should be restarted when "start game" clicked', () => {
    startGame();

    numbers.at(0).simulate('click');
    numbers.at(4).simulate('click');

    startGame();

    let newNumbers = game.find('.number');
    newNumbers.at(5).simulate('click');

    expect(game.find('.success').exists()).toBe(false);
  });

  test('numbers are not clickable when game finished', () => {
    startGame();


    numbers.at(0).simulate('click');
    numbers.at(4).simulate('click');
    numbers.at(5).simulate('click');

    expect(game.find('.success').exists()).toBe(true);

    numbers.at(1).simulate('click');

    expect(contentOf(game.find('.clicked'))).toEqual(['1', '5', '6']);
    expect(contentOf(game.find('.clicked'))).not.toContain('2');
    expect(game.find('.failure').exists()).toBe(false);
  });
});
