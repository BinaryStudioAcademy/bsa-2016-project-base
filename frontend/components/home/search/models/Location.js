import MultiSelectModel from "./MultiSelectModel"
import LocationView from "./../components/Location"
import searchService from "./../../../../services/SearchService"
export default class Location extends MultiSelectModel {
    constructor({component}) {
        super({
            title: "Locations",
            values: [],
            custom: "",
            tips: [],
            component
        });
        this.ComponentClass = LocationView;
        //this.mapZoom = 5;
        //this.displayOnMap = this.displayOnMap.bind(this);
        if (!this.geocoder) this.geocoder = new google.maps.Geocoder();

    }

    displayOnMap(value){
        value.marker.setMap(this.map);
        value.infoWindow.open(this.map, value.marker);
    }
    getTips(value, callback) {
        var self = this;
        searchService.getLocations()
            .then(function(res){
                var newTips = res.map(tip=>{
                    var marker = new google.maps.Marker({
                        position:tip.latLng
                    });

                    var infoWindow = new google.maps.InfoWindow({
                        content:tip.label
                    });

                    var newTip = {
                        marker,
                        text:tip.label,
                        infoWindow
                    };

                    marker.addListener('mouseover', function () {
                        infoWindow.open(self.map, marker);
                    });

                    marker.addListener('mouseout', function() {
                        infoWindow.setContent(newTip.text)
                    });

                    marker.addListener('click', function(){
                        self.addValue(newTip)
                    })

                    self.displayOnMap(newTip)
                    return newTip

                });
                self.map.setCenter(newTips[0].marker.position)
                callback(res.err,newTips)
            })
    }

    addValue(value) {
        value.marker.setMap(null);
        super.addValue(value);
    }

    removeValue(value) {
        this.displayOnMap(value)
        super.removeValue(value)
    }

    setMap(map) {
        this.map = map;
        if (this.tips){
            this.tips.forEach(this.displayOnMap)
        }
        map.setZoom(5);
        if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
        this.startLoadTips();
    }
    getValueInRequest(){
        return this.values.map(value=>JSON.stringify(value.marker.position))
    }
    getNameInRequest(){
        return "locations"
    }
}