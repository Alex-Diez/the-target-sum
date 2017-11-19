import React, {Component} from 'react';

export default class TargetSumGame extends Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.state = {
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
    this.setState({target: target, numbers: numbers, points: 0, selectedNumbers: []});
  }

  checkNumber(index, value) {
    this.setState(
      (prevState, props) => ({
        points: prevState.points + value,
        selectedNumbers: prevState.selectedNumbers.concat(index)
      })
    );
  }

  render() {

    const createNumberNode = (index, number) => {
      return (
        <Number
          key={index}
          value={number}
          clickable={this.state.selectedNumbers.indexOf(index) === -1}
          onCheck={() => this.checkNumber(index, number)}
        />
      )
    };

    const target = this.state.target === undefined ? '?' : this.state.target;
    const numbers = this.state.numbers === undefined ? new Array(6).fill('?') : this.state.numbers;

    return (
      <div className='game'>
        <TargetSum target={target} points={this.state.points}/>
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

    if (this.props.clickable) {
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
    if (this.props.target === this.props.points) {
      stateClass = 'target success';
    } else if (this.props.target <= this.props.points) {
      stateClass = 'target failure';
    } else {
      stateClass = 'target';
    }
    return <div className={stateClass.toString()}>{this.props.target}</div>;
  }
}
