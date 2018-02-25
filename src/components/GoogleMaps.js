/*global google*/

import React, { Component } from "react";
import stop from ".././assets/stop.svg";
import current from ".././assets/current.png";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


class Map extends Component {
    constructor() {
        super();
        this.state = {
            selectedStop: "",
            stops: [],
            inBound: 'Inbound'
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
                toast.warn('BUS STOP: ' + marker.getTitle());
                this.props.selectStop(this.state.selectedStop);
                this.props.enableForm();
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
        {
            this.state.inBound === 'InBound' ? this.getInBound(): this.getOutBound()
        }

    }


    INBOUND_API_URL = "https://joelgilbert.io/buses/closestops?routeid=17&longitude=-98.48891&latitude=29.424065&isOutbound=false&radius=1600";
    OUTBOUND_API_URL = "https://joelgilbert.io/buses/closestops?routeid=17&longitude=-98.48891&latitude=29.424065&isOutbound=true&radius=1600";
    getOutBound = () => {
        axios.get(this.OUTBOUND_API_URL)
            .then(response => {
                this.setState({
                    stops: response.data
                });
                console.log(JSON.stringify(this.state.stops, null, 4));

                this.initMap();
            });
    };
    getInBound = () => {
        axios.get(this.INBOUND_API_URL)
            .then(response => {
                this.setState({
                    stops: response.data
                });
                console.log(JSON.stringify(this.state.stops, null, 4));

                this.initMap();
            });
    };

    updateMap = (direction) => {
        this.setState({
            inBound: direction
        });
        {
            this.state.direction === 'InBound' ? this.getInBound(): this.getOutBound()
        }
    };
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
                <ToastContainer />
            </div>
        );
    }
}

export default Map;
