import React, { Component } from 'react';
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import Form from './components/Form';


class App extends Component {
  render() {
    return (
      <div>
          <Navbar/>
        <Map />
          <Form/>
      </div>
    );
  }
}

export default App;
