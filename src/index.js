import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import TargetSumGame from './components/TargetSumGame';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {gameId: 0};

    this.restartGame = this.restartGame.bind(this);
  }

  restartGame() {
    this.setState((prevState, props) => ({gameId: prevState.gameId + 1}))
  }

  render() {
    const randomNumberBetween = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const challengeNumbers = () =>
      Array.from({ length: 6 })
        .map(() => randomNumberBetween(...[2, 9]));

    const computeTarget = (numbers) => _.sampleSize(numbers, 4).reduce((acc, curr) => acc + curr, 0);

    return (
      <TargetSumGame
        gameId={this.state.gameId}
        targetComputer={computeTarget}
        numberSource={challengeNumbers}
        onRestart={this.restartGame}
      />
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
