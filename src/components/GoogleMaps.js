/*global google*/

import React, { Component } from "react";
import stop from ".././assets/stop.svg";
import inactive from ".././assets/inactive_stop.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Form from "../components/Form";
import current from ".././assets/current.png";
import moment from "moment";

import stops from ".././data/stops.json";
import times from ".././data/times.json";

class Map extends Component {
    map = {};
    INBOUND_API_URL = "https://joelgilbert.io/buses/closestops?routeid=17&longitude=-98.48891&latitude=29.424065&isOutbound=false&radius=1600";
    OUTBOUND_API_URL = "https://joelgilbert.io/buses/closestops?routeid=17&longitude=-98.48891&latitude=29.424065&isOutbound=true&radius=1600";

    constructor(props) {
        super(props);
        this.state = {
            selectedStop: 0,
            direction: "Inbound",
            departureTimes: [],
            selectedDepartureTime: "",
            notifyTime: 0,
            selectedTimeInc: "",
            textOrCall: true,
            phoneNumber: 0,
            isDisabled: true
        };
    }

    initMap() {
        console.log("Inside initMap()");
        let sa = { lat: 29.424065, lng: -98.48891 };
        this.map = new google.maps.Map(document.getElementById("map"), {
            zoom: 16,
            center: sa
        });

        //let stops = this.state.stops;

        // console.log("stops:", stops);

        stops.forEach(e => {
            let marker = new google.maps.Marker({
                position: {
                    lat: e.Latitude,
                    lng: e.Longitude
                },
                map: this.map,
                icon: e.IsActive ? stop : inactive,
                title: e.stop_id
            });

            if (e.IsActive) {
                marker.addListener("click", () => {
                    this.setState({ selectedStop: marker.getTitle() });
                    toast.info("BUS STOP: " + marker.getTitle());
                    this.enableForm();
                    this.getTimes();
                });
            } else {
                marker.addListener("click", () => {
                    toast.error("INACTIVE");
                });
            }
        });

        new google.maps.Marker({
            position: sa,
            height: 20,
            width: 20,
            map: this.map,
            icon: {
                url: current,
                scaledSize: new google.maps.Size(70, 70) // scaled size
            }
        });
    }

    componentDidMount() {
        // this.state.direction === "Inbound"
        //     ? this.getInBound()
        //     : this.getOutBound();
        // this.state.direction === "Outbound"
        //     ? this.getInBound()
        //     : this.getOutBound();
        // this.state.direction === "Inbound" ? this.initMap() : this.initMap();
        this.initMap();
    }

    getTimes = () => {
        // axios
        //     .get(
        //         `https://joelgilbert.io/buses/GetUpdatedDepartureTimes?routeId=17&stopId=${
        //         this.state.selectedStop
        //         }&currentTime=12:00`
        //     )
        //     .then(response => {
        //         console.log(response.data[0]);
        //         this.setState({
        //             departureTimes: response.data,
        //             selectedDepartureTime: response.data[0]
        //         });
        //     });
        this.setState({
            departureTimes: times
        })
    };

    // getOutBound = () => {
    //     axios.get(this.OUTBOUND_API_URL).then(response => {
    //         this.setState({
    //             stops: response.data
    //         });
    //         // console.log("this.map:", this.map);
    //         console.log(response.data);

    //         this.initMap();
    //     });
    // };
    // getInBound = () => {
    //     axios.get(this.INBOUND_API_URL).then(response => {
    //         this.setState({
    //             stops: response.data
    //         });
    //         this.initMap();
    //     });
    // };

    updateParent = formData => {
        // this.setState({
        //     Inbound: value.Inbound,
        //     selectedDepartureTime: value.selectedDepartureTime,
        //     notifyTime: value.notifyTime,
        //     selectedTimeInc: value.selectedTimeInc,
        //     textOrCall: value.textOrCall,
        //     phoneNumber: value.phoneNumber
        // });
        // console.log(JSON.stringify(this.state, null, 4));
        this.sendData(formData);
        // setTimeout(() => { this.sendData(); window.location.reload(true); }, 1000);
    };

    updateMap = () => {
        // console.log("Inside updateMap");
        // this.state.direction === "Inbound"
        //     ? this.getOutBound()
        //     : this.getInBound();
        this.state.direction === "Inbound" ? this.initMap() : this.initMap();
    };

    enableForm = () => {
        this.setState({
            isDisabled: false
        });
    };

    changeDirection = direction => {
        this.setState({
            direction: direction
        });

        console.log(this.state.direction);

        this.updateMap();
    };

    handleChangeDirection = (e, data) => {
        // console.log(e.target.text);

        this.setState({
            direction: e.target.text
        });

        this.updateMap();
    };

    sendData = (data) => {
        console.log("Inside sendData()");
        console.log("data:", JSON.stringify(data, null, 4));
        // console.log(this.state);

        // let data = this.state;

        let convertedTime = moment(data.selectedDepartureTime).format("H:MM");
        // console.log(data.selectedDepartureTime);
        // console.log(convertedTime);

        let convertedNotifyType = data.textOrCall ? 0 : 1;

        let dataString = `https://joelgilbert.io/buses/CreateNotification?routeId=17&stopId=${
            this.state.selectedStop
            }&phone=1${data.phoneNumber}&depart=${convertedTime}&notifyTime=${
            data.notifyTime
            }&notifyType=${convertedNotifyType}&notifyTimeLabel=${
            data.selectedTimeInc
            }`;

        console.log(dataString);
    };
    render() {
        let styles = {
            height: "40vh",
            width: "100%",
            transitionDuration: "1s"
        };
        const beginStyles = {
            height: "79vh",
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
                <div
                    style={this.state.isDisabled ? beginStyles : styles}
                    id="map"
                />
                <div className="container">
                    <ul className="tabs" style={{ marginBottom: "30px" }}>
                        <li className="tab">
                            <a
                                onClick={this.handleChangeDirection}
                                id={"Inbound"}
                                value="Pizza"
                                className="active"
                            >
                                Inbound
                            </a>
                        </li>
                        <li className="tab">
                            <a
                                onClick={this.handleChangeDirection}
                                id={"Outbound"}
                                value="Pizza"
                            >
                                Outbound
                            </a>
                        </li>
                    </ul>
                </div>
                <Form
                    changeDirection={this.changeDirection}
                    isDisabled={this.state.isDisabled}
                    updateParent={this.updateParent}
                    departureTimes={this.state.departureTimes}
                    sendData={this.sendData}
                />
                <ToastContainer />
            </div>
        );
    }
}

export default Map;
