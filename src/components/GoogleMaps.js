/*global google*/


import React, { Component } from 'react';

class Map extends Component {
    componentDidMount(){
        function initMap() {
            let uluru = {lat: -25.363, lng: 131.044};
            let map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: uluru
            });
            let marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
        }
        initMap();
    }
    render() {
        let styles = {
            height: '50vh',
        width: '100%'
        };
        return (
            <div>
                <div style={styles} id="map"></div>
            </div>
        );
    }
}

export default Map;