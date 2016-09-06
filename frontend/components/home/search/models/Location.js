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
        this.currentActiveMapId = null;
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

    displayOnMap(map, value){
        value.marker.setMap(map);
        value.shouldShowInfo ?
            value.infoWindow.open(map, value.marker):
            value.infoWindow.close();
    }

    startLoadTips(map){
        this.currentActiveMapId = map.__unique__id__;
        this.getTips(map, function(error, tips){
            this.tips.forEach(tip=>tip.marker.setMap(null));
            this.tips = tips;
            this.notifyUpdated();
        }.bind(this))
    }

    getTips(map, callback) {
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
                            infoWindow.open(map, marker);
                        });

                        marker.addListener('mouseout', function() {//TODO: optimize closure memory leak
                            newTip.shouldShowInfo ? infoWindow.setContent(newTip.text) : infoWindow.close();
                        });

                        marker.addListener('click', function(){//TODO: optimize closure memory leak
                            self.addValue(map, newTip)
                        });

                        return newTip
                    }catch (e){/*empty*/}
                }).filter(tip=>tip).filter(tip=>{
                        for (let i = 0; i < self.values.length; i+=1){
                            if (self.equals(tip,self.values[i])){
                                self.values[i] = tip;
                                return false;
                            }
                        }
                        self.displayOnMap(map, tip);
                        return true;
                    });

                map.setCenter(newTips[0].marker.position);
                callback(res.err,newTips);
                res = null;
            })
    }

    addValue(map, value) {
        value.marker.setMap(null);
        super.addValue(value);
    }

    removeValue(map, value) {
        this.displayOnMap(map, value);
        super.removeValue(value)
    }

    getValueInRequest(){
        return this.values.map(value=>value.projectId)
    }
    getNameInRequest(){
        return "id"
    }
}