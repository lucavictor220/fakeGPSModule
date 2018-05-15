import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RouteListItem from './components/routeListItem';

class App extends Component {
  constructor() {
    super();

    this.state = {
      routes: [{
        id: 1,
        type: "bus",
        nr: 1,
        step: 1,
        timeInterval: 3000,
      },
        {
          id: 2,
          type: "trolleybus",
          nr: 3,
          step: 1,
          timeInterval: 4000,
        }
      ]
    }
  }

  onUpdate = () => {
    console.log('UDATE')
  };

  onRemove = () => {
    console.log('REmove')
  };

  onListItemChange = (newItem) => {
    const routes = this.state.routes.map(item => {
      if (item.id !== newItem.id) return item;
      return {
        ...newItem,
      }
    });
    this.setState({ routes })
  };


  render() {
    const { routes } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Dashboard</h1>
        </header>
        <div className="Dashboard">
          <div className="dashboard-heading">
            <div className="header-item"><h2>Route</h2></div>
            <div className="header-item"><h2>Type</h2></div>
            <div className="header-item"><h2>N-th Point</h2></div>
            <div className="header-item"><h2>Time(ms)</h2></div>
            <div className="header-item"><h2>Actions</h2></div>
          </div>
          {routes.map(item => {
            return (
              <RouteListItem
                key={item.id}
                route={item}
                onUpdate={this.onUpdate}
                onRemove={this.onRemove}
                onChange={this.onListItemChange}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
