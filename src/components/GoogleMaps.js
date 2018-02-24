/*global google*/

import React, { Component } from "react";
import stop from ".././assets/stop.svg";
import current from ".././assets/current.png";

class Map extends Component {
    componentDidMount() {
        function initMap() {
            let sa = { lat: 29.424065, lng: -98.48891 };
            let map = new google.maps.Map(document.getElementById("map"), {
                zoom: 16,
                center: sa
            });

            // let temp = {
            //     lat: sa.lat + 0.2,
            //     lng: sa.lng + 0.2
            // };
            // let marker = new google.maps.Marker({
            //     position: temp,
            //     map: map,
            //     icon: stop
            // });
            let markers = [
                {
                    stopId: "59886",
                    position: { lat: 29.524509, lng: -98.392061 }
                },
                {
                    stopId: "91139",
                    position: { lat: 29.424065, lng: -98.48891 }
                },
                {
                    stopId: "92399",
                    position: { lat: 29.422739, lng: -98.483171 }
                }
            ];

            markers.forEach(e => {
                let marker = new google.maps.Marker({
                    position: e.position,
                    map: map,
                    icon: stop,
                    title: e.stopId
                });

                marker.addListener("click", () => {
                    alert(marker.getTitle());
                });
            });

            let currentLocation = new google.maps.Marker({
                position: sa,
                height: 20,
                width: 20,
                map: map,
                icon: {
                    url: current,
                    scaledSize: new google.maps.Size(70, 70) // scaled size
                }
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
