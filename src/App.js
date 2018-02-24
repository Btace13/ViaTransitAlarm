import React, { Component } from 'react';
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import Form from './components/Form';
import GoogleMap from './components/GoogleMaps';


class App extends Component {
  render() {
    return (
      <div>
          <Navbar/>
          <GoogleMap/>
        {/*<Map />*/}
          <Form/>
      </div>
    );
  }
}

export default App;
