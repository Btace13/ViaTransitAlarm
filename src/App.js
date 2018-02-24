import React, { Component } from 'react';
import Navbar from "./components/Navbar";
import Form from './components/Form';
import GoogleMap from './components/GoogleMaps';


class App extends Component {
    constructor(){
        super();
        this.state = {
            inBound: '',
            stopSelected: 0,
            departureTimes: [],
            selectedDepatureTime: '',
            notiftyTime: 0,
            selectedTimeInc: '',
            textOrCall: true,
            phoneNumber: 0
        }
    }
    getDataFromChild = (value) => {
        this.setState({
            inBound: value.inBound,
            //stopSelected: value.stopSelected,
            selectedDepatureTime: value.selectedDepatureTime,
            notiftyTime: value.notiftyTime,
            selectedTimeInc: value.selectedTimeInc,
            textOrCall: value.textOrCall,
            phoneNumber: value.phoneNumber

        });
    };
    getStop = (stop) => {
        this.setState({
            stopSelected: stop,
        });
    };
  render() {
    return (
      <div>
          <Navbar/>
          <GoogleMap selectStop={this.getStop}/>
          <Form updateParent={this.getDataFromChild}/>
      </div>
    );
  }
}

export default App;
