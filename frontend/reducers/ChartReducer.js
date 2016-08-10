/**
 * Created by user on 09.08.2016.
 */

const initialState = {
    data:{
        names:[],
        values:[]
    },
    chartType: ""
};
export default function chartReducer(state=initialState,action){
    switch (action.type){
        case "CHART_ADD_DATA":
            return Object.assign({}, state, {
                data:action.data
            });

        case "CHANGE_CHART_TYPE":
            return Object.assign({}, state, {
                chartType: action.chartType
            })
    }
    return state;
}