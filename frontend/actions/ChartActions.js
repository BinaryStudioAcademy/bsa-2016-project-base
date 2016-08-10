/**
 * Created by user on 09.08.2016.
 */

import techService from "./../services/TechnologieService"
import tagService from "./../services/admin/AdminTagService"
export function addData(data){
    return {
        type:"CHART_ADD_DATA",
        data
    }
}

export function changeChartType(chartType){
    return {
        type: "CHANGE_CHART_TYPE",
        chartType
    }
}

export function loadData(){
    return (dispatch, getState)=>{
        /*mock*/
        const type = getState().ChartReducer.chartType;
        if (type == "Circle"){
            techService.getAllTechnologies()
                .then(res=>res.json())
                .then(techs=>{
                    const names = techs.map(tech=>tech.techName)
                    const values = names
                        .map(tech=>tech.split("")
                            .reduce((s,char)=>s+char.charCodeAt(0),0)%13+5)
                    dispatch(addData({
                        title:"Modern IT Technologies used on projects",
                        names,
                        values
                    }))
                });
        }
        else if (type == "Bar"){
            tagService.getAllTags()
                .then(res=>res.json())
                .then(tags=>{
                    const names = tags.slice(0,9).map(tag=>tag.tagName).concat(["Other"])
                    const values = [110,94,78,65,45,32,21,18,14,150]
                    dispatch(addData({
                        title:"Most popular Tags on projects",
                        names,
                        values
                    }))
                });
        }else if (type == "Linear"){
            dispatch(addData({
                title: "Active projects quantity by the time",
                names: ['1st January', '1st February', '1st March', '1st April', '1st May', '1st June', '1st July'],
                values: [23,25,14,16,21,16,27]
            }));
        }

    }
}