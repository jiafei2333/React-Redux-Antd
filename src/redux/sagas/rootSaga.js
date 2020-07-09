import {delay} from 'redux-saga';
import {take,all,fork,put,call,takeEvery} from 'redux-saga/effects';
import * as types from '../action-types';
import * as homeServer from '../actionServer/home';

// function * watchUsername(){
//   while(true){
//     const action= yield take('CHANGE_USERNAME');
//     yield put({type:'change_username',value:action.value});
//   }
// }
// export default function * rootSaga() {
//     yield all([
//       fork(watchUsername),
//     ]);
// }

// function* watchFetchData() {
//     yield takeEvery("FETCH_REQUESTED", fetchData)
// }
// function* watchFetchData() {
//     while(true){
//       yield take('FETCH_REQUESTED');
//       yield fork(fetchData);
//     }
// }

function * watchUsername(){
    while(true){
        const action = yield take(types.GET_MENU);
        console.log("action:",action);
        const all = yield call(homeServer.getAccountRightsJson);
        if(all.Code === 0){
            console.log("目录打印", all);
            yield put({type:types.SetParams, payload: {paramsName: 'mainMenu', paramsValue: all.Data}});
        }
    }
} 
export default function* rootSaga() {
    yield fork(watchUsername);
}