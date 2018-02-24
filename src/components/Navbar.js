import React, { Component } from 'react';
import {Navbar} from 'react-materialize';

class Navigation extends Component {
    render() {
        const styles = {
            paddingLeft: '10px',
            background: '#e51937'
        };
        return (
            <Navbar brand='VIA Transit Alarm' style={styles}/>
        );
    }
}

export default Navigation;