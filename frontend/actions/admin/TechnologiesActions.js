/**
 * Created by razorka on 26.07.16.
 */
var request = require('superagent-bluebird-promise');
export  function initTechnology() {
    return dispatch => {
        return request.get('/api/technologie')
            .then(function(res) {
                const action = {
                    type: 'INIT_TECHNOLOGY',
                    listOfTechnologies: res.body,
                };
                dispatch(action);
            }, function(error) {
                const action = {
                    type: 'INIT_TECHNOLOGY',
                    listOfTechnologies: [],
                };
                dispatch(action);
            });

    };
};
export function saveTechology(params) {
    return dispatch => {
        return request.post('/api/technologie')
            .send(params)
            .end(function(err,res) {    
                if(!err) {
                    dispatch(initTechnology())
                }
            });

    };

}

export function deleteTechnology(params) {
    const action = {
        type: 'DELETE_TECHNOLOGY',
        listOfTechnologies: params.listOfTechnologies,
    };
    return action;
};

export function searchTechnology(params) {
    console.log(params);
    const action = {
        type: 'SEARCH_TECHNOLOGY',
        listOfTechnologies: params.listOfTechnologies,
        listOfTechnologiesFiltered: params.listOfTechnologiesFiltered
    };
    return action;
};
