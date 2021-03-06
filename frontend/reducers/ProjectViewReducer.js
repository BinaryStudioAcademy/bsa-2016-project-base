import * as types from '../constants/ProjectViewActionTypes';

const initialState = {
    filters: {
        features: [],
        user: {
            name: "",
            right: ""
        }
    },
    questionsOptions: {
        showMess: {
            showQ: true,
            showA: []
        },
        newMess: {
            newQ: {
                textarea: '',
                checkbox: false
            },
            newA: []
        },
        editMess: []
    }
}

export default function ProjectViewReducer(state = initialState, action) {
    switch (action.type) {
        case types.PROJECT_VIEW_START_LOADING : 
            return Object.assign({
                isLoading: true,   
            },state);

        case types.PROJECT_VIEW_END_LOADING: 
            return Object.assign({},state,
                { isLoading: false },
                action['project']
            );

        case types.PROJECT_VIEW_ERROR_LOADING: 
            return Object.assign({},state,
                { isLoading: false },
                action['error']
            );

        case types.UPDATE_PROJECT_RATING:

            return { ...state, rating: action.rating };

        case types.SHOW_OR_HIDE_Q:

            var newState = Object.assign({},state);
            Object.assign(
                newState.questionsOptions.showMess,
                {
                    showQ: !newState.questionsOptions.showMess.showQ,
                    showA: []
                }
            );

            return newState;

        case types.SHOW_OR_HIDE_A:

            var newState = Object.assign({},state);
            newState.questionsOptions.showMess.showA[action.index] = !newState.questionsOptions.showMess.showA[action.index];

            return newState;

        case types.NEW_MESSAGE_IN_ADD_Q_TEXTAREA:

            var newState = Object.assign({},state);
            newState.questionsOptions.newMess.newQ.textarea = action.message;

            return newState;

        case types.NEW_CHECK_ATTR_IN_ADD_Q_CHECKBOX:

            var newState = Object.assign({},state);
            newState.questionsOptions.newMess.newQ.checkbox = action.checkAttr;

            return newState;

        case types.ADDING_Q_SUCCESS:

            var newState = Object.assign({},state);
            var newQ = action.newQuestion;
            newQ.question.author = action.senderInfo;
            newState.questions.push(newQ);
            newState.questionsOptions.newMess.newQ.textarea = '';
            newState.questionsOptions.newMess.newQ.checkbox = false;

            return newState;

        case types.NEW_MESSAGE_IN_ADD_A_TEXTAREA:

            var newState = Object.assign({},state);
            newState.questionsOptions.newMess.newA[action.num] = action.message;

            return newState;

        case types.ADDING_A_SUCCESS:

            var newState = Object.assign({},state);
            var newA = action.newAnswer;
            newA.author = action.senderInfo;
            newState.questions[action.num].answers.push(newA);
            newState.questionsOptions.newMess.newA[action.num] = '';

            return newState;

        case types.REMOVING_Q_SUCCESS:

            var newState = Object.assign({},state);
            // delete the current question
            newState.questions.splice(action.num,1);
            // delete the help info about the current question
            newState.questionsOptions.newMess.newA.splice(action.num,1);
            newState.questionsOptions.showMess.showA.splice(action.num,1);
            newState.questionsOptions.editMess.splice(action.num,1);

            return newState;

        case types.REMOVING_A_SUCCESS:

            var newState = Object.assign({},state);
            // delete the current answer
            newState.questions[action.numQ].answers.splice(action.numA,1);
            // delete the help info about the current answer
            if( newState.questionsOptions.editMess[action.numQ] != undefined ) {
                if( newState.questionsOptions.editMess[action.numQ].editA != undefined ) {
                    newState.questionsOptions.editMess[action.numQ].editA.splice(action.numA,1);
                }
            }

            return newState;

        case types.NEW_EDIT_Q_IS_SHOWN:

            var newState = Object.assign({},state);
            if(newState.questionsOptions.editMess[action.numQ] == undefined){
                newState.questionsOptions.editMess[action.numQ] = {};
            }
            newState.questionsOptions.editMess[action.numQ].editQ = {
                isBeingEdited: true,
                message: action.message,
                isChecked: action.isChecked
            }

            return newState;

        case types.NEW_MESSAGE_IN_EDIT_Q_TEXTAREA:

            var newState = Object.assign({},state);
            newState.questionsOptions.editMess[action.numQ].editQ.message = action.message;

            return newState;

        case types.NEW_CHECK_ATTR_IN_EDIT_Q_CHECKBOX:

            var newState = Object.assign({},state);
            newState.questionsOptions.editMess[action.numQ].editQ.isChecked = action.isChecked;

            return newState;

        case types.EDITING_Q_SUCCESS:

            var newState = Object.assign({},state);
            newState.questionsOptions.editMess[action.numQ].editQ.isBeingEdited = false;
            newState.questions[action.numQ].isPrivate = action.isChecked;
            newState.questions[action.numQ].question.text = action.message;

            return newState;

        case types.NEW_EDIT_A_IS_SHOWN:

            var newState = Object.assign({},state);
            if(newState.questionsOptions.editMess[action.numQ] == undefined){
                newState.questionsOptions.editMess[action.numQ] = {};
            }
            if(newState.questionsOptions.editMess[action.numQ].editA == undefined){
                newState.questionsOptions.editMess[action.numQ].editA = [];
            }
            newState.questionsOptions.editMess[action.numQ].editA[action.numA] = {
                isBeingEdited: true,
                message: action.message
            };

            return newState;

        case types.NEW_MESSAGE_IN_EDIT_A_TEXTAREA:

            var newState = Object.assign({},state);
            newState.questionsOptions.editMess[action.numQ].editA[action.numA].message = action.message;

            return newState;

        case types.EDITING_A_SUCCESS:

            var newState = Object.assign({},state);
            newState.questionsOptions.editMess[action.numQ].editA[action.numA].isBeingEdited = false;
            newState.questions[action.numQ].answers[action.numA].text = action.message;

            return newState;


        case types.SET_RATE_INFO_FAILURE:
        case types.GET_RATE_ALL_FAILURE:
        case types.ADDING_Q_FAILURE:
        case types.ADDING_A_FAILURE:
        case types.REMOVING_Q_FAILURE:
        case types.REMOVING_A_FAILURE:
        case types.EDITING_Q_FAILURE:
        case types.EDITING_A_FAILURE:
            return { ...state, error: action.error };

        default: return state;        
    }
}
