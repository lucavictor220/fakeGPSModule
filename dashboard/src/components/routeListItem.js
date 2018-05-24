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

  static getDerivedStateFromProps(nextProps) {
    console.log('Get derived state', nextProps);
    return {
      route: nextProps.route,
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

  updateListItem = () => {
    console.log('UDDATE WITH NEW VALUES:', this.state.route);
    this.props.onUpdate({
      ...this.state.route,
    })
  };

  removeListItem = () => {
    console.log('Remove item with id: ', this.state.route.id);
    this.props.onRemove(this.state.route.id);
  };

  render() {
    const { route } = this.props;
    console.log('State', this.state);

    return (
      <div className="route-list-item">
        <TextCell info={route.nr} />
        <TextCell info={route.type} />
        <Step step={route.step} onChange={this.onStepChange}/>
        <InputCell value={route.timeInterval} onChange={this.handleTimeChange}/>
        <ActionButtons onUpdate={this.updateListItem} onRemove={this.removeListItem} />
      </div>
    )
  }
}

export default RouteListItem;