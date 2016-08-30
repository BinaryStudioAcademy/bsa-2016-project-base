import MultiSelect from "./MultiSelectModel"
import LocationView from "./../components/Location"
import searchService from "./../../../../services/SearchService"
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
        this.map = map;
        debugger
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