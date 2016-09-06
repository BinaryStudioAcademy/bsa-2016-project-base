import MultiSelectModel from "./MultiSelectModel"
import LocationView from "./../components/Location"
import searchService from "./../../../../services/SearchService"
import SmallProjectView from "./../../components/Project"
import React from "react"
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
        this.onMarkerMouseOver = this.onMarkerMouseOver.bind(this);
        //this.mapZoom = 5;
        this.displayOnMap = this.displayOnMap.bind(this);
        if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
    }

    onMarkerMouseOver(mapContentToDestination, projectId){
        searchService.getProject(projectId)
            .then(res=>{
                var project = res.project;
                mapContentToDestination(`
Project Name: ${project.projectName}`);//TODO: make better layout
            })
    }

    displayOnMap(value){
        value.marker.setMap(this.map);
        value.shouldShowInfo ?
            value.infoWindow.open(this.map, value.marker):
            value.infoWindow.close();

    }

    getTips(value, callback) {
        var self = this;
        searchService.getLocations()
            .then(function(res){
                var shouldShowInfo = res.locations.length < 30;
                var newTips = res.locations.map(tip=>{
                    try {
                        if (!tip.location || !tip.location.Latitude || !tip.location.Longitude)return;

                        var marker = new google.maps.Marker({
                            position:{
                                lat: parseFloat(tip.location.Latitude),
                                lng: parseFloat(tip.location.Longitude)
                            }
                        });
                        var text = tip.label;
                        var infoWindow = new google.maps.InfoWindow({
                            content: shouldShowInfo?text:undefined
                        });

                        var newTip = {
                            marker,
                            text,
                            infoWindow,
                            shouldShowInfo,
                            projectId:tip.projId
                        };

                        marker.addListener('mouseover', function () {//TODO: optimize closure memory leak
                            self.onMarkerMouseOver(content=>
                                infoWindow.setContent(content), tip.projId
                            );
                            infoWindow.open(self.map, marker);
                        });

                        marker.addListener('mouseout', function() {//TODO: optimize closure memory leak
                            newTip.shouldShowInfo ? infoWindow.setContent(newTip.text) : infoWindow.close();
                        });

                        marker.addListener('click', function(){//TODO: optimize closure memory leak
                            self.addValue(newTip)
                        });

                        self.displayOnMap(newTip);
                        return newTip
                    }catch (e){/*empty*/}
                });
                self.map.setCenter(newTips[0].marker.position)
                callback(res.err,newTips.filter(tip=>tip))
                res = null;
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
        /*if (this.tips){
            this.tips.forEach(this.displayOnMap)
        }*/
        map.setZoom(5);
        if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
        this.startLoadTips();
    }
    getValueInRequest(){
        return this.values.map(value=>JSON.stringify(value.projectid))
    }
    getNameInRequest(){
        return "project_ids"
    }
}