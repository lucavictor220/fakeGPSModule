import React, { Component } from 'react';

class Step extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: this.props.step,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    console.log('console.log(nextProps);');
    console.log(nextProps);
    console.log('console.log(nextProps);');
    return {
      step: nextProps
    }
  }

  increment = () => {
    this.props.onChange(this.props.step + 1)
  };

  decriment = () => {
    if (this.props.step === 1) return;
    this.props.onChange(this.props.step - 1)
  };

  render () {
    return (
      <div className="step-container">
        <button className="increment" onClick={() => this.increment()}>+</button>
        <div className="step-value">
          <span>{this.props.step}</span>
        </div>
        <button className="decrement" onClick={() => this.decriment()}>-</button>
      </div>
    )
  }
}


export default Step;



