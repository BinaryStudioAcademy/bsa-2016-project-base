import MultiSelect from "./MultiSelectModel"
import LocationView from "./../components/Location"
import searchService from "./../../../../services/SearchService"
import { default as update } from "react-addons-update";
var labels = "ABCDEFGJKLMNOPRSTU";
var labelIndex=0;
export default class Location extends MultiSelect{
    constructor({component}) {
        super({
            title:"Location",
            values:[],
            custom:{},
            tips:[],
            component
        });
        this.ComponentClass = LocationView;
        this.isActive = true;
    }
    setMap(map){
        const self = this;
        this.map = map;
        this.markers = [];
        var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
        const marker = new google.maps.Marker({
            position: myLatlng,
            title:"My Place",
            map:this.map
        });
        marker.addListener("click", this.toggleBounce.bind(this,marker));
        this.markers.push(marker)
        google.maps.event.addListener(map, 'click', function(event) {
            self.addMarker(event.latLng, map);
        });
    }
    addMarker(latLng,map){
        var marker = new google.maps.Marker({
            position: latLng,
            label: labels[labelIndex++ % labels.length],
            map: map,
            draggable: true,
        });
        marker.setAnimation(google.maps.Animation.DROP);
        this.markers.push(marker);
        marker.addListener("click", this.toggleBounce.bind(this,marker))
    }
    toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
    getTips(custom, callback){
        searchService.getLications()
            .then(locs=>{
                callback(null,locs)
            });
    }
    startLoadTips(){
        this.isLoading = true;
        this.notifyUpdated();
        this.getTips(this.custom, function(error, tips){
            this.tipsError = error?"Not found":"";
            this.tips = tips.filter(tip=>{
                for (let value of this.values){
                    if (this.equals(value,tip)){
                        return false;
                    }
                }
                return true;
            });
            this.isLoading = false;
            this.notifyUpdated();
        }.bind(this))
    }
    equals(loc1,loc2){
        return loc1.lat == loc2.lat && loc1.lng == loc2.lng;
    }
}