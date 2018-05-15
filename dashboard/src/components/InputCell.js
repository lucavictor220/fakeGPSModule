import React, { Component } from 'react';

class InputCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      value: nextProps.value,
    }
  }

  render() {
    return(
      <div className="input-cell ">
        <input type="text" value={this.props.value} onChange={this.props.onChange}/>
      </div>
    )
  }
}

export default InputCell;
