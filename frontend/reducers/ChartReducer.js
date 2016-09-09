const initialState = {
    data: {
        options: {},
        labels: [],
        datasets: []
    },
    chartType: ""
};
export default function chartReducer(state = initialState, action) {
    switch (action.type) {
        case "CHART_ADD_DATA":
            return Object.assign({}, state, {
                data: action.data
            });

        case "CHANGE_CHART_TYPE":
            return Object.assign({}, state, {
                chartType: action.chartType
            })
    }
    return state;
}