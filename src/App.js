import React, { Component } from 'react';
import Navbar from "./components/Navbar";
import Map from "./components/Map";


class App extends Component {
  render() {
    return (
      <div>
        {/* <Navbar/> */}
        <Map />
      </div>
    );
  }
}

export default App;
