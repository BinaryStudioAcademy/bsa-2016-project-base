import techService from "./../services/TechnologieService"
import tagService from "./../services/admin/AdminTagService"
import chartService from "./../services/chartService"

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
        else if (type == "Bar"){
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
        }else if (type == "Linear"){
            dispatch(addData({
                options:{
                    title: {
                        display:true,
                        text:"Active projects quantity by the time"
                    }
                },
                labels: ['1st January', '1st February', '1st March', '1st April', '1st May', '1st June', '1st July'],
                datasets:[{
                    label:"Active projects",
                    data: [23,25,14,16,21,16,27]
                }]
            }));
        } else if (type == "Bar2"){
            dispatch(addData({
                options:{
                    title: {
                        display:true,
                        text:"Test"
                    }
                },
                labels: ['1st January', '1st February', '1st March', '1st April', '1st May', '1st June', '1st July'],
                datasets:[{
                    label:"Active projects",
                    data: [30,30,30,16,21,16,27]
                }]
            }));
        }

    }
}
export function errorHandler(error) {
    return {
        type: 'SOMETHING_GONE_WRONG',
        error: error
    }
}