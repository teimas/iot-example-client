import React, { Component } from 'react';
import ReactSpeedometer from "react-d3-speedometer";

class App extends Component {
  state = {
    value: 50
  };

  tick() {
    fetch("/value").then(response => {
      response.text().then(s => {
        var n = parseInt(s);
        if (this.state.value !== n) {
          this.setState({ value: n });
        }
      });
    });
  }

  getInitialState() {
    return { value: 0 };
  }

  componentDidMount() {
    this.tick();
    this.timer = setInterval(this.tick.bind(this), 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="App">
        <ReactSpeedometer
          maxValue={100}
          minValue={0}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default App;
