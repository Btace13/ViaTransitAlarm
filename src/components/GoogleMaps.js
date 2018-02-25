/*global google*/

import React, { Component } from "react";
import stop from ".././assets/stop.svg";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Form from '../components/Form';
import current from ".././assets/current.png";

class Map extends Component {
    constructor() {
        super();
        this.state = {
            direction: 'Inbound',
            departureTimes: [],
            selectedDepatureTime: '',
            notiftyTime: 0,
            selectedTimeInc: '',
            textOrCall: true,
            phoneNumber: 0,
            isDisabled: true
        }
    }

    initMap() {
        let sa = { lat: 29.424065, lng: -98.48891 };
        let map = new google.maps.Map(document.getElementById("map"), {
            zoom: 16,
            center: sa
        });

        let stops = this.state.stops;
        stops.forEach(e => {

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
                this.enableForm();
            });
        });
        new google.maps.Marker({
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
            this.state.direction === 'Inbound' ? this.getInBound(): this.getOutBound()
    }


    INBOUND_API_URL = "https://joelgilbert.io/buses/closestops?routeid=17&longitude=-98.48891&latitude=29.424065&isOutbound=false&radius=1600";
    OUTBOUND_API_URL = "https://joelgilbert.io/buses/closestops?routeid=17&longitude=-98.48891&latitude=29.424065&isOutbound=true&radius=1600";
    getOutBound = () => {
        axios.get(this.OUTBOUND_API_URL)
            .then(response => {
                this.setState({
                    stops: response.data
                });

                this.initMap();
            });
    };
    getInBound = () => {
        axios.get(this.INBOUND_API_URL)
            .then(response => {
                this.setState({
                    stops: response.data
                });

                this.initMap();
            });
    };

    updateParent = (value) => {
        this.setState({
            Inbound: value.Inbound,
            selectedDepatureTime: value.selectedDepatureTime,
            notiftyTime: value.notiftyTime,
            selectedTimeInc: value.selectedTimeInc,
            textOrCall: value.textOrCall,
            phoneNumber: value.phoneNumber

        });
    };

    updateMap = () => {
        this.state.direction === 'Inbound' ? this.getInBound(): this.getOutBound()
    };

    enableForm = () => {
        this.setState({
            isDisabled: false
        })
    };

    changeDirection = (direction) => {
        this.setState({
            direction: direction
        });

        console.log(this.state.direction);

        this.updateMap();
    };

    handleChangeDirection = (event) => {
        console.log(event.target.id);
        this.setState({
            direction: event.target.id
        });
        this.updateMap();
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
                <div className="container">
                    <ul className="tabs" style={{marginBottom: '30px'}}>
                        <li className="tab"><a onClick={this.handleChangeDirection} id={'Inbound'} className="active">Inbound</a></li>
                        <li className="tab"><a onClick={this.handleChangeDirection} id={'Outbound'} >Outbound</a></li>
                    </ul>
                </div>
                <Form  changeDirection={this.changeDirection} isDisabled={this.state.isDisabled} updateParent={this.updateParent}/>
                <ToastContainer />
            </div>
        );
    }
}

export default Map;
