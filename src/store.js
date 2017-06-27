import { createStore, applyMiddleware } from 'redux';
import { getSomething } from './someService';
import createSagaMiddleware from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';

const initialState = {
  item: null,
  loading: false,
  success: false,
  error: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SOMETHING_REQUESTED': return {loading: true, success: false, error: null, item: null};
    case 'SOMETHING_SUCCESS': return {loading: false, success: true, error: null, item: action.payload};
    case 'SOMETHING_FAILED': return {loading: false, success: true, error: action.error, item: null};
    default: return state;
  }
}

function* requestSomething(action) {
  try {
    const result = yield getSomething(action.id);
    yield put({type: 'SOMETHING_SUCCESS', payload: result});
  } catch (e) {
    yield put({type: 'SOMETHING_FAILED', error: e});
  }
}

function* someSaga() {
  yield takeLatest('SOMETHING_REQUESTED', requestSomething);
}

export const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(someSaga);