/*global google*/

import React, { Component } from "react";

class Map extends Component {
    componentDidMount() {
        function initMap() {
            let sa = { lat: 29.424065, lng: -98.48891 };
            let map = new google.maps.Map(document.getElementById("map"), {
                zoom: 17,
                center: sa
            });
            let marker = new google.maps.Marker({
                position: sa,
                map: map
            });
        }
        initMap();
    }
    render() {
        let styles = {
            height: "50vh",
            width: "100%"
        };
        return (
            <div>
                <div style={styles} id="map" />
            </div>
        );
    }
}

export default Map;
