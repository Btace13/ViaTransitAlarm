import React, { Component } from 'react';
import Navbar from "./components/Navbar";
import GoogleMap from './components/GoogleMaps';


class App extends Component {
  render() {
    return (
      <div>
          <Navbar/>
          <GoogleMap/>
          {/*<Form changeDirection={this.changeDirection} isDisabled={this.state.isDisabled} updateParent={this.getDataFromChild}/>*/}
      </div>
    );
  }
}

export default App;
