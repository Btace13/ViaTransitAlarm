/*global mapboxgl*/

import React, { Component } from 'react';
import { Tabs, Tab } from 'react-materialize';

import stop from '.././assets/stop.svg'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

export default class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //   lng: -98.5061646,
            //   lat: 29.429095,
            lng: -98.48891,
            lat: 29.424065,
            zoom: 16
        };
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;

        // create a DOM element for the marker
        let el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url(${stop})`;
        el.style.width = '30px';
        el.style.height = '30px';

        el.addEventListener('click', function() {
            window.alert('stop was clicked!');
        });

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [lng, lat],
            zoom,
        });

        map.on('move', () => {
            const { lng, lat } = map.getCenter();

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        // Add marker
        new mapboxgl.Marker(el)
            .setLngLat([-98.48891,29.424065])
            .addTo(map);
    }

    render() {
        const { lng, lat, zoom } = this.state;
        const styles = {
            height: '50vh',
            width: '100%'
        };
        return (
            <div>
                <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                    <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                </div>
                <div ref={el => this.mapContainer = el} className="absolute top left bottom" style={styles} />
                <Tabs>
                    <Tab title="Inbound" active></Tab>
                    <Tab title="Outbound"></Tab>
                </Tabs>
            </div>
        );
    }
}