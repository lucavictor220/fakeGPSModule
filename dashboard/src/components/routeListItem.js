import React, { Component } from 'react';

import Step from './step';
import TextCell from './TextCell';
import InputCell from './InputCell';
import ActionButtons from './ActionButtons';

class RouteListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
    }
  }

  handleTimeChange = (event) => {
    console.log('event:', event.target.value);
    this.props.onChange({
      ...this.state.route,
      timeInterval: event.target.value,
    });
  };

  onStepChange = (newValue) => {
    this.props.onChange({
      ...this.state.route,
      step: newValue,
    });
  };

  render() {
    const { route, onUpdate, onRemove } = this.props;
    console.log('State', this.state);

    return (
      <div className="route-list-item">
        <TextCell info={route.nr} />
        <TextCell info={route.type} />
        <Step step={route.step} onChange={this.onStepChange}/>
        <InputCell value={route.timeInterval} onChange={this.handleTimeChange}/>
        <ActionButtons onUpdate={onUpdate} onRemove={onRemove} />
      </div>
    )
  }
}

export default RouteListItem;