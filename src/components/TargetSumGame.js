import React, {Component} from 'react';

const GAME_STATE = {
  NEW: 'new',
  PLAYING: 'playing',
  WIN: 'win',
  LOST: 'lost'
};

export default class TargetSumGame extends Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.state = {
      gameState: GAME_STATE.NEW,
      selectedNumbers: [],
      points: 0
    };

    this.generate = this.generate.bind(this);
    this.checkNumber = this.checkNumber.bind(this);
  }

  generate(e) {
    e.preventDefault();
    this.props.onRestart();
    const numbers = this.props.numberSource();
    const target = this.props.targetComputer(numbers);
    this.setState(
      {
        target: target,
        numbers: numbers,
        gameState: GAME_STATE.PLAYING,
        selectedNumbers: [],
        points: 0,
      }
    );
  }

  checkNumber(index, value) {
    const computeNextState = (prevState) => {
      const points = prevState.points + value;
      let gameState;
      if (points === prevState.target) {
        gameState = GAME_STATE.WIN;
      } else if (points >= prevState.target) {
        gameState = GAME_STATE.LOST;
      } else {
        gameState = prevState.gameState;
      }
      const selectedNumbers = prevState.selectedNumbers.concat(index);
      return {
        gameState: gameState,
        points: points,
        selectedNumbers: selectedNumbers
      };
    };
    this.setState(
      (prevState, props) => computeNextState(prevState)
    );
  }

  render() {
    const isNumberClickable = (index) => {
      return this.state.selectedNumbers.indexOf(index) === -1;
    };

    const createNumberNode = (index, number) => {
      return (
        <Number
          key={index}
          value={number}
          gameState={this.state.gameState}
          clickable={isNumberClickable(index)}
          onCheck={() => this.checkNumber(index, number)}
        />
      )
    };

    const target = this.state.target === undefined ? '?' : this.state.target;
    const numbers = this.state.numbers === undefined ? new Array(6).fill('?') : this.state.numbers;

    return (
      <div className='game'>
        <TargetSum target={target} gameState={this.state.gameState}/>
        <div className='challenge-numbers'>
          {numbers.map((num, index) => createNumberNode(index, num))}
        </div>
        <button
          className='start'
          onClick={this.generate}
        >
          start the game
        </button>
      </div>
    )
  }
}

class Number extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.checkIn = this.checkIn.bind(this);
  }

  checkIn(e) {
    e.preventDefault();

    if (this.props.clickable && this.props.gameState === GAME_STATE.PLAYING) {
      this.props.onCheck();
    }
  }

  render() {
    const classes = this.props.clickable ? 'number clickable' : 'number clicked';

    return (
      <div
        className={classes.toString()}
        onClick={this.checkIn}
      >
        {this.props.value}
      </div>
    )
  }
}

class TargetSum extends Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    let stateClass;
    if (this.props.gameState === GAME_STATE.WIN) {
      stateClass = 'target success';
    } else if (this.props.gameState === GAME_STATE.LOST) {
      stateClass = 'target failure';
    } else {
      stateClass = 'target';
    }
    return <div className={stateClass.toString()}>{this.props.target}</div>;
  }
}
