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

    componentDidMount() {
        const {location} = this.props;
        const locationBase = location ? location : {Latitude: 49.844182, Longitude: 24.026997};
        const position = {lat: +locationBase.Latitude, lng: +locationBase.Longitude};

        let map = new google.maps.Map(this.refs.map, {
            center: position,
            zoom: this.mapZoom
        });

        let marker = new google.maps.Marker({
            map,
            position
        });

        let that = this;

        google.maps.event.addListener( map, 'click', function(e) {
            const position =  e.latLng;

            marker.setMap(null);
            marker = new google.maps.Marker({
                  position,
                  map
            });
            
            map.panTo(position);

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