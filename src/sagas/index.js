/* eslint-disable no-constant-condition */
import { push } from 'react-router-redux';
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
  getLatestPosts
} from '../selectors/index';

const { home, post, login } = actions;

function* fetchEntity(entity, apiFn, payload) {
  const source = api.getTokenSource();
  try {
    yield put(entity.request(payload));
    const { response, error } = yield call(apiFn, { ...payload, cancelToken: source.token });
    if (response) {
      yield put(entity.success({ ...payload, response }));
    } else {
      yield put(entity.failure({ ...payload, error }));
    }
  } finally {
    if (yield cancelled()) {
      yield source.cancel();
      yield put(entity.failure(payload));
    }
  }
}

export const fetchPost = fetchEntity.bind(null, post, api.fetchPost);
export const fetchHome = fetchEntity.bind(null, home, api.fetchHome);
export const fetchAuth = fetchEntity.bind(null, login, api.authorize);

function* loadPost(id, requiredFields) {
  const loadedPost = yield select(getPost, id);
  if (!loadedPost || requiredFields.some(key => !(key in loadedPost))) {
    yield call(fetchPost, { id });
  }
}

function* loadHome() {
  const loadedLatestPosts = yield select(getLatestPosts);
  if (!loadedLatestPosts.pageCount) {
    yield call(fetchHome);
  }
}

function* authorize(username, password) {
  yield call(fetchAuth, { username, password });
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

function* loginFlow({ firebase }) {
  while (true) {
    const { username, password } = yield take(actions.LOGIN_USER);
    const task = yield fork(authorize, username, password);
    const { type } = yield take([actions.LOGOUT_USER, actions.LOGIN.FAILURE]);
    if (type === actions.LOGOUT_USER) {
      yield cancel(task);
      yield put(push('/'));
    }
  }
}

export default function* root(args) {
  yield all([
    fork(watchLoadPostPage),
    fork(watchLoadHomePage),
    fork(loginFlow, args)
  ]);
}
