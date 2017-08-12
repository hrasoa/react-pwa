/* eslint-disable no-constant-condition */
import {
  cancel,
  cancelled,
  take,
  put,
  call,
  fork,
  select,
  all
} from 'redux-saga/effects';
import api from '../services/index';
import * as actions from '../actions/index';
import {
  getPost,
  getLatestPosts,
  getLatestPictures
} from '../selectors/index';


const { home, post, login } = actions;


function* fetchEntity(entity, apiFn, id) {
  const source = api.getTokenSource();
  try {
    yield put(entity.request({ id }));
    const { response, error } = yield call(apiFn, { id, cancelToken: source.token });
    if (response) {
      yield put(entity.success({ id, response }));
    } else {
      yield put(entity.failure({ id, error }));
    }
  } finally {
    if (yield cancelled()) {
      yield source.cancel();
      yield put(entity.failure({ id }));
    }
  }
}


export const fetchPost = fetchEntity.bind(null, post, api.fetchPost);
export const fetchHome = fetchEntity.bind(null, home, api.fetchHome);


function* loadPost(id, requiredFields) {
  const loadedPost = yield select(getPost, id);
  if (!loadedPost || requiredFields.some(key => !(key in loadedPost))) {
    yield call(fetchPost, id);
  }
}


function* loadHome() {
  const loadedLatestPosts = yield select(getLatestPosts);
  const loadedLatestPictures = yield select(getLatestPictures);
  if (!loadedLatestPosts.pageCount || !loadedLatestPictures.pageCount) {
    yield call(fetchHome);
  }
}


function* authorize(username, password) {
  try {
    const { response, error } = yield call(api.authorize, username, password);
    if (response) {
      yield put(login.success({ response }));
    } else {
      yield put(login.failure({ error }));
    }
  } catch (error) {
    yield put(login.failure({}));
  }
}


function* watchLoadPostPage() {
  while (true) {
    const { id, requiredFields = [] } = yield take(actions.LOAD_POST_PAGE);
    const task = yield fork(loadPost, id, requiredFields);
    yield take(actions.LEAVE_POST_PAGE);
    yield cancel(task);
  }
}


function* watchLoadHomePage() {
  while (true) {
    yield take(actions.LOAD_HOME_PAGE);
    const task = yield fork(loadHome);
    yield take(actions.LEAVE_HOME_PAGE);
    yield cancel(task);
  }
}


function* watchLogin() {
  while (true) {
    const { username, password } = yield take(actions.LOGIN.REQUEST);
    const task = yield fork(authorize, username, password);
    yield take(['LOGOUT', actions.LOGIN.FAILURE]);
    yield cancel(task);
  }
}


export default function* root() {
  yield all([
    fork(watchLoadPostPage),
    fork(watchLoadHomePage),
    fork(watchLogin)
  ]);
}
