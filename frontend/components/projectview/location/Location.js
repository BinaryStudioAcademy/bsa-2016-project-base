import  React, { Component } from 'react';

import styles from './location.sass';

class Location extends Component {
    constructor(){
        super();
        this.mapZoom = 8;
    }

    /*componentWillMount() {console.log('inside componentWillMount of Location.js: '+this.props.location);}
    componentDidMount() {console.log('inside componentDidMount of Location.js: '+this.props.location);}
    componentWillReceiveProps(nextProps) {console.log('inside componentWillReceiveProps of Location.js: '+this.props.location+' nextProps: '+nextProps);}
    componentWillUpdate(nextProps) {console.log('inside componentWillUpdate of Location.js: '+this.props.location+' nextProps: '+nextProps);}*/
    componentDidUpdate(prevProps) {//console.log('inside componentDidUpdate of Location.js: '+this.props.location+' prevProps: '+prevProps);
        if (this.props.location == undefined) {var location = {Latitude:0.0,Longitude:0.0};}
        else {var location = this.props.location;}

        this.map = new google.maps.Map(this.refs.map, {
            center: {lat: +location.Latitude, lng: +location.Longitude},
            zoom: this.mapZoom
        });

        this.marker = new google.maps.Marker({
            map: this.map,
            position: {lat: +location.Latitude, lng: +location.Longitude}
        });
    }
    //componentWillUnmount() {console.log('inside componentWillUnmount of Location.js: '+this.props.location);}

    render() {
        return (
            <div>
                <div id="map" ref="map"></div>
            </div>
        );
    }
}

export default Location;