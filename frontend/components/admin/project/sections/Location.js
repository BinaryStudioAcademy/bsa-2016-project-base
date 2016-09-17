import  React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';

import styles from './styles/Location.sass';

class Location extends Component {
    constructor(){
        super();
        this.mapZoom = 6;
        this.setLocation = this.setLocation.bind(this);
    }
    setLocation(position) {
       
        this.props.setLocation({
            Latitude: position.lat(),
            Longitude: position.lng()
        });
    }
    componentWillReceiveProps(nextProps){
        const {location} = nextProps.props;
        const locationBase = location ? location : {Latitude: 49.844182, Longitude: 24.026997};
        const position = {lat: +locationBase.Latitude, lng: +locationBase.Longitude};
        that.marker.setMap(null);
            that.marker = new google.maps.Marker({
                position,
                map: that.map
            });
            
        that.map.panTo(position);
    }

    componentDidMount() {
        const {location} = this.props;
        const locationBase = location ? location : {Latitude: 49.844182, Longitude: 24.026997};
        const position = {lat: +locationBase.Latitude, lng: +locationBase.Longitude};

        this.map = new google.maps.Map(this.refs.map, {
            center: position,
            zoom: this.mapZoom
        });

        this.marker = new google.maps.Marker({
            map:this.map,
            position
        });

        let that = this;

        google.maps.event.addListener(this.map, 'click', function(e) {
            const position =  e.latLng;

            that.marker.setMap(null);
            that.marker = new google.maps.Marker({
                position,
                map: that.map
            });
            
            that.map.panTo(position);

            that.setLocation(position);
        });

    }

    render() {
        return (
            <div>
                <div id="map" ref="map"></div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return {
        location: state.UpsertProjectReducer.location
    };
};

  
export default connect(mapStateToProps, mapDispatchToProps)(Location);