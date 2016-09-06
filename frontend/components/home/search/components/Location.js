import React from "react"
/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
import MultiSelect from "./MultiSelect"
import TextField from "./../components/TextInput"
import DeletableList from "./DeletableList"

const getUniqueMapId = (function () {
    var i = 0;
    return function () {
        return "" + ++i;
    }
})();
export default class Location extends MultiSelect {
    constructor(params) {
        super(params);
        this.leftBlockWidth = "70%";
        this.rightBlockWidth = "30%";
    }

    setMapElementReference(mapElementReference) {
        this.mapElement = mapElementReference;
    }

    componentWillUnmount() {
        const {model} = this.props;
        model.currentActiveMapId = null;
        model.notifyUpdated();
    }

    componentDidMount() {
        const {model} = this.props;
        this.map = new google.maps.Map(this.mapElement, {
            zoom: 4,
            center: {lat: 53.52604744889203, lng: -1.08411407470703125}
        });
        this.map.__unique__id__ = getUniqueMapId();
        var map = this.map;
        model.currentActiveMapId = this.map.__unique__id__;
        model.startLoadTips(map);
        var input = /** @type {!HTMLInputElement} */
            document.createElement("input");
        input.setAttribute("style", `background-color: #fff;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
  margin-left: 12px;
  padding: 0 11px 0 13px;
  text-overflow: ellipsis;
  width: 300px;`)
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);


        autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();


            // If the place has a geometry, then present it on a map.
            if (place && place.geometry && place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);  // Why 17? Because it looks good.
            }

        });

    }

    getLeftBlock() {
        return (
            <div style={{height: `350px`,width:"70%"}}
                 ref={this.setMapElementReference.bind(this)}>
            </div>
        )
    }

    getRightBlock() {
        const {model} = this.props;
        const map = this.map;

        if (map) {
            if (!model.currentActiveMapId) {
                model.currentActiveMapId = map.__unique__id__;
            }
            if (map.__unique__id__ === model.currentActiveMapId) {
                setTimeout(function () {

                    model.tips.map(tip=> {
                        if (tip.marker.map.__unique__id__ !== map.__unique__id__) {
                            model.displayOnMap(map, tip)
                        }
                    });
                }, 500);
            }


            var values = <DeletableList model={model} onClick={function(value){
            model.removeValue(map,value)}
        }/>;
        }

        return (<div style={{width:this.rightBlockWidth,overflow:"auto", "maxHeight":"300px"}}>
            {values || null}
        </div>)
    }
}