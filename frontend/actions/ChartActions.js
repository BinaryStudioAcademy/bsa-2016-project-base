import chartService from "./../services/chartService";
import techService from "./../services/TechnologieService";
import tagService from "./../services/admin/AdminTagService";

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
        const type = getState().ChartReducer.chartType;
        if (type == "projTechs"){
            chartService.getTechs()
                .then(arrTechs =>{
                    //console.log('loadData() -> arrTechs: ', arrTechs);
                    const labels = arrTechs.map(tech =>tech.techName);
                    console.log('Techs labels: ', labels);
                    const data = arrTechs.map(tech => tech.count);
                    console.log('Techs data: ', data);
                    dispatch(addData({
                        options:{
                            title: {
                                display:true,
                                text:"Most popular Technologies used in the projects:"
                            }
                        },
                        labels,
                        datasets:[{
                            label:"Technologies",
                            data
                        }]

                    }))
                });
        }
        else if (type == "projTags"){
            chartService.getTags()
                .then(arrTags => {
                    console.log('arrTags: ', arrTags);
                    // const labels = arrTags.slice(0,9).map(tag=> tag.tagName).concat(["Other"]);
                    const labels = arrTags.map(tag => tag.tagName);
                    console.log('Tags labels: ', labels);
                    const data = arrTags.map(tag => tag.count);
                    console.log('Tags data: ', data);
                    dispatch(addData({
                        options:{
                            title: {
                                display:true,
                                text:"Most popular Tags in the projects"
                            }
                        },
                        labels,
                        datasets:[{
                            label:"Quantity of usage",
                            data
                        }]
                    }))
                });
        } else if (type == "projCountries"){
            chartService.getCountries()
                .then(arrCountr => {
                    console.log('arrCountr: ', arrCountr);
                    const labels = arrCountr.map(countryName => (countryName._id.length > 0)? countryName._id : 'Undefined');
                    console.log('Country labels: ', labels);
                    const data = arrCountr.map(countryCount => countryCount.count);
                    console.log('Country data: ', data);
                    dispatch(addData({
                        options:{
                            title: {
                                display:true,
                                text:"Project's country distribution"
                            }
                        },
                        labels,
                        datasets:[{
                            label:"Quantity of projects origin",
                            data
                        }]
                    }))
                });
        } else if (type == "projStartDate"){
            chartService.getProjsByStartDate()
                .then(arrIntervals => {
                    console.log('arrIntervals: ', arrIntervals);
                    // const labels = arrTags.slice(0,9).map(tag=> tag.tagName).concat(["Other"]);
                    //const labels = arrIntervals.cummulatIntervals.map(interval => interval.dateTo);
                    const labels = arrIntervals.labels;
                    console.log('Interval labels: ', labels);
                    // const data = arrIntervals.cummulatIntervals.map(interval => interval.count);
                    const data = arrIntervals.data;
                    console.log('Intervals data: ', data);
                    dispatch(addData({
                        options:{
                            title: {
                                display:true,
                                text:"The count of Projects by start date:"
                            }
                        },
                        labels,
                        datasets:[{
                            label:"Count of started",
                            data
                        }]
                    }))
                });
        } else if (type == "projEndDate"){
            chartService.getProjsByEndDate()
                .then(arrIntervals => {
                    console.log('arrIntervals: ', arrIntervals);
                    const labels = arrIntervals.labels;
                    console.log('Interval labels: ', labels);
                    const data = arrIntervals.data;
                    console.log('Intervals data: ', data);
                    dispatch(addData({
                        options:{
                            title: {
                                display:true,
                                text:"The count of Projects by End date:"
                            }
                        },
                        labels,
                        datasets:[{
                            label:"Count of completed",
                            data
                        }]
                    }))
                });
        }
    }
}
export function errorHandler(error) {
    return {
        type: 'SOMETHING_GONE_WRONG',
        error: error
    }
}