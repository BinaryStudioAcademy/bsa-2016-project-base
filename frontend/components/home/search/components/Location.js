import React from "react"
/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
import Modelable from "./Modelable"
export default class Location extends Modelable {
    setMapElementReference(mapElementReference) {
        this.mapElement = mapElementReference;
    }

    componentDidMount() {
        const {model} = this.props;
        const map = new google.maps.Map(this.mapElement, {
            zoom: 8,
            center: {
                lat: -25.5085300,
                lng: 131.1257400
            }
        });
        model.setMap(map);
    }

    render() {
        const {model} = this.props,
            self = this;
        return (<div style={{display:"flex"}}>
            <div style={{width:"30%",height:"350px"}}>
                left
            </div>

            <div ref={this.setMapElementReference.bind(this)} style={{height: `350px`,width:"70%"}}>

            </div>

        </div>);
    }
}