import React, { Component } from 'react';
import Navbar from "./components/Navbar";
import Form from './components/Form';
import GoogleMap from './components/GoogleMaps';


class App extends Component {
    constructor(){
        super();
        this.state = {
            Inbound: 'Inbound',
            stopSelected: 0,
            departureTimes: [],
            selectedDepatureTime: '',
            notiftyTime: 0,
            selectedTimeInc: '',
            textOrCall: true,
            phoneNumber: 0,
            isDisabled: true
        }
    }
    getDataFromChild = (value) => {
        this.setState({
            Inbound: value.Inbound,
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

    enableForm = () => {
        this.setState({
            isDisabled: false
        })
    };

    changeDirection = (direction) => {
      this.setState({
          Inbound: direction
      });
        this.updateMap();
    };

    updateMap = () => {
        this.refs.child.updateMap(this.state.Inbound)
    };


  render() {
    return (
      <div>
          <Navbar/>
          <GoogleMap ref={'child'} direction={this.state.Inbound} enableForm={this.enableForm} selectStop={this.getStop}/>
          <Form changeDirection={this.changeDirection} isDisabled={this.state.isDisabled} updateParent={this.getDataFromChild}/>
      </div>
    );
  }
}

export default App;
