 import {takeEvery, call, fork, put, takeLatest} from 'redux-saga/effects';
 import * as actions from '../actions/users';
 import * as api from '../api/users';

function* getUsers() {
  //  console.log("AFTER CREATEUSER WORKER")
    try {
        const result = yield call(api.getUsers);
   //     console.log(result);
        yield put(actions.getUsersSuccess({
            items: result.data.data
        }))
    } catch(error) {
        console.log(error);
    }
}

 function* watchGetUsersRequest() {
     yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
 }

 function* createUser(action) {
  //  console.log("[INSIDE CREATEUSER] ", action);
    try {
       let res = yield call(api.createUser, {firstName: action.payload.firstName, lastName: action.payload.lastName});
       console.log(res);
        yield call(getUsers);
    } catch(e) {
        console.log(e);
    }
 }

 function* watchCreateUserRequest() {
     yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser)
 }

 function* deleteUser(action) {
     console.log(action);
     const res = yield call(api.deleteUser, action.payload.userId);
 //    console.log(res);
     yield call(getUsers)
 }

 function* watchDeleteUserRequest() {
     yield takeLatest(actions.Types.DELETE_USER_REQUEST, deleteUser);
 }


 const usersSagas = [
     fork(watchGetUsersRequest),
     fork(watchCreateUserRequest),
     fork(watchDeleteUserRequest)
 ]

 export default usersSagas
