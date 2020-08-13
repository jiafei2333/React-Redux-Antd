import * as types from 'Redux/action-types';
const initialState = {

};

export default function loadingReducer(state=initialState, action){
    const {type} = action;
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

    if(!matches) return state;

    const [, requestName, requestState] = matches;
    return {
        ...state,
        [requestName]: requestState === 'REQUEST'
    }
}