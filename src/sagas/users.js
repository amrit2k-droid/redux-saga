 import {takeEvery, call, fork, put, takeLatest, take} from 'redux-saga/effects';
 import * as actions from '../actions/users';
 import * as api from '../api/users';

function* getUsers() {
  //  console.log("AFTER CREATEUSER WORKER")
    try {
        const result = yield call(api.getUsers);
        console.log(result);
        yield put(actions.getUsersSuccess({
            items: result.data.data
        }))
    } catch(e) {
        yield put(actions.usersError({
            error: 'an error occured while trying to get the users.'
        }))
    }
}

 function* watchGetUsersRequest() {
     yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
 }

 function* createUser(action) {
    console.log("[INSIDE CREATEUSER] ", action);
    try {
        yield call(api.createUser, {firstName: action.payload.firstName, lastName: action.payload.lastName});
        yield call(getUsers);
    } catch(e) {
        yield put(actions.usersError({
            error: 'an error occured while trying to create the user.'
        }))
    }
 }

 function* watchCreateUserRequest() {
     yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser)
 }

 function* deleteUser(action) {
     try {
        const res = yield call(api.deleteUser, action.payload.userId);
        yield call(getUsers)
     } catch(e) {
        yield put(actions.usersError({
            error: 'an error occured while trying to delete the user.'
        }))
     }
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
