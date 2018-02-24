/*global google*/

import React, { Component } from "react";
import stop from ".././assets/stop.svg";
import current from ".././assets/current.png";
import axios from "axios";

class Map extends Component {
    constructor() {
        super();
        this.state = {
            selectedStop: "",
            stops: []
        };
    }

    initMap() {
        let sa = { lat: 29.424065, lng: -98.48891 };
        let map = new google.maps.Map(document.getElementById("map"), {
            zoom: 16,
            center: sa
        });

        let stops = this.state.stops;
        console.log("stops:", stops);
        stops.forEach(e => {
            console.log(e);

            let marker = new google.maps.Marker({
                position: {
                    lat: e.Latitude,
                    lng: e.Longitude
                },
                map: map,
                icon: stop,
                title: e.stop_id
            });

            marker.addListener("click", () => {
                this.setState({ selectedStop: marker.getTitle() });
                this.props.selectStop(this.state.selectedStop);
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

    componentWillMount() {
        axios
            .get(
                "https://joelgilbert.io/buses/closestops?routeid=17&longitude=-98.48891&latitude=29.424065&isOutbound=false&radius=1600"
            )
            .then(response => {
                this.setState({
                    stops: response.data
                });
                console.log(JSON.stringify(this.state.stops, null, 4));

                this.initMap();
            });
    }

    componentDidMount() {
        // let _this = this;
        // function initMap() {
        //     let sa = { lat: 29.424065, lng: -98.48891 };
        //     let map = new google.maps.Map(document.getElementById("map"), {
        //         zoom: 16,
        //         center: sa
        //     });
        //     // let temp = {
        //     //     lat: sa.lat + 0.2,
        //     //     lng: sa.lng + 0.2
        //     // };
        //     // let marker = new google.maps.Marker({
        //     //     position: temp,
        //     //     map: map,
        //     //     icon: stop
        //     // });
        //     // let markers = [
        //     //     {
        //     //         stopId: "59886",
        //     //         position: { lat: 29.524509, lng: -98.392061 }
        //     //     },
        //     //     {
        //     //         stopId: "91139",
        //     //         position: { lat: 29.424065, lng: -98.48891 }
        //     //     },
        //     //     {
        //     //         stopId: "92399",
        //     //         position: { lat: 29.422739, lng: -98.483171 }
        //     //     }
        //     // ];
        //     let stops = _this.state.stops;
        //     console.log("stops:", stops);
        //     stops.forEach(e => {
        //         // let position = {
        //         //     lat: e.Latitude,
        //         //     lon: e.Longitude
        //         // };
        //         console.log(e);
        //         let marker = new google.maps.Marker({
        //             position: {
        //                 lat: e.Latitude,
        //                 lng: e.Longitude
        //             },
        //             map: map,
        //             icon: stop,
        //             title: e.stop_id
        //         });
        //         marker.addListener("click", () => {
        //             _this.setState({ selectedStop: marker.getTitle() });
        //             _this.props.selectStop(_this.state.selectedStop);
        //         });
        //     });
        //     let currentLocation = new google.maps.Marker({
        //         position: sa,
        //         height: 20,
        //         width: 20,
        //         map: map,
        //         icon: {
        //             url: current,
        //             scaledSize: new google.maps.Size(70, 70) // scaled size
        //         }
        //     });
        // }
        // initMap();
    }

    render() {
        let styles = {
            height: "50vh",
            width: "100%"
        };
        // let info = {
        //   height: '30px',
        //   width: '200px',
        //   position: 'absolute',
        //   top: '50px',
        //     right: 0,
        //     background: '#e51937',
        //     zIndex: 999,
        //     boxShadow: '1px 1px 0px 1px #555',
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     borderRadius: '0px 0px 10px  10px',
        //     color: "white"
        // };
        return (
            <div>
                <div style={styles} id="map" />
                <div className="container">
                    <p
                        className={"flow-text left"}
                        style={{ marginBottom: 0, paddingBottom: 0 }}
                    >{`BUS STOP: ${this.state.selectedStop}`}</p>
                </div>
            </div>
        );
    }
}

export default Map;
