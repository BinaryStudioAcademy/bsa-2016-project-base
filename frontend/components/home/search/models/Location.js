import MultiSelectModel from "./MultiSelectModel"
import LocationView from "./../components/Location"
import searchService from "./../../../../services/SearchService"
var labels = "ABCDEFGJKLMNOPRSTU";
var labelIndex = 0;
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
        this.mapZoom = 5;
    }

    startLoadTips() {
        var self = this;
        this.isLoading = true;
        this.notifyUpdated();
        this.getTips(undefined, function (error, tip) {
            //this.tipsError = error ? "Not found" : "";
            for (let value of self.values) {
                if (self.equals(value, tip)) {
                    return tip.marker.setMap(null);
                }
            }
            for (let value of self.tips) {
                if (self.equals(value, tip)) {
                    return tip.marker.setMap(null);
                }
            }
            tip.marker.setMap(this.map);
            tip.infoWindow.open(this.map, tip.marker);
            this.tips.push(tip);
            this.isLoading = false;
            //this.notifyUpdated();
        }.bind(this))
    }

    getTips(value, callback) {
        searchService.getLocations()
            .then(function (locs) {
                var count = 0;
                var loadData = function (loc, zeroResult) {
                    this.geocoder.geocode({location: loc}, function (results, status) {
                        console.log(status, count);
                        if (status === google.maps.GeocoderStatus.OK) {
                            var res = results[0];
                            var marker = new google.maps.Marker({
                                position: res.geometry.location
                            });
                            var infoWindow = new google.maps.InfoWindow({
                                content: res.formatted_address
                            });
                            var tip = {
                                marker: marker,
                                text: res.formatted_address,
                                infoWindow: infoWindow
                            };
                            marker.addListener("click", this.addValue.bind(this, tip));
                            marker.addListener('mouseover', function () {
                                infoWindow.open(self.map, marker);
                            });

                            /*marker.addListener('mouseout', function() {
                             infoWindow.close();
                             });*/
                            callback(null, tip);

                        }
                        if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                            return setTimeout(function () {
                                loadData(loc);
                            }, 2500);
                        }
                        if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                            setTimeout(function () {
                                if (zeroResult < 4) {
                                    loadData(loc, (zeroResult||0) + 1);
                                }
                            }, 4000);
                        }

                        if (locs[count+1]) {
                            count += 1;
                            loadData(locs[count])
                        }
                    }.bind(this))
                }.bind(this);
                loadData(locs[0], 0);
            }.bind(this));
    }

    addValue(value) {
        value.marker.setMap(null);
        super.addValue(value);
    }

    removeValue(value) {
        value.marker.setMap(this.map);
        value.infoWindow.open(this.map, value.marker);
        super.removeValue(value)
    }

    setMap(map) {
        this.map = map;
        map.setZoom(this.mapZoom);
        this.geocoder = new google.maps.Geocoder();
        this.startLoadTips();
    }
    getValueInRequest(){
        return this.values.map(value=>JSON.stringify(value.marker.position))
    }
    getNameInRequest(){
        return "locations"
    }
}