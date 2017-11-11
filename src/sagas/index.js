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
  FIREBASE_SIGN_UP,
  FIREBASE_SIGN_IN,
  FIREBASE_SIGN_OUT
} from '../middlewares/firebase';
import {
  getPost,
  getLatestPosts,
  getCurrentUser,
  getCurrentUserEntity,
  getIsConnected
} from '../selectors/index';

const {
  home,
  post,
  registerUser,
  currentUser,
  loginUser,
  logoutUser
} = actions;

function* fetchEntity(entity, apiFn, payload) {
  const source = api.getTokenSource();
  try {
    yield put(entity.request(payload));
    const { response, error } = yield call(apiFn, { ...payload, cancelToken: source.token });
    if (response) {
      yield put(entity.success(response));
    } else {
      yield put(entity.failure(error));
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

export const fetchRegisterUser = fetchEntity.bind(null, registerUser, api.registerUser);

export const fetchLogin = fetchEntity.bind(null, loginUser, api.updateUser);

export const fetchCurrentUser = fetchEntity.bind(null, currentUser, api.currentUser);

export const fetchLogout = fetchEntity.bind(null, logoutUser, api.logout);

function* loadPost(id, requiredFields) {
  const loadedPost = yield select(getPost, id);
  if (!loadedPost || requiredFields.some(key => !(key in loadedPost))) {
    yield call(fetchPost, { id });
  }
}

function* loadHome() {
  const loadedLatestPosts = yield select(getLatestPosts);
  if (!loadedLatestPosts.totalCount) {
    yield call(fetchHome);
  }
}

function* watchLoadPostPage() {
  while (true) {
    const { payload: { id, requiredFields = [] } } = yield take(actions.LOAD_POST_PAGE);
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

function* signUpFlow() {
  while (true) {
    const { type, payload } = yield take([
      FIREBASE_SIGN_UP.SUCCESS,
      FIREBASE_SIGN_UP.FAILURE
    ]);
    if (type === FIREBASE_SIGN_UP.SUCCESS) {
      yield call(fetchRegisterUser, payload);
    }
  }
}

function* loadCurrentUser() {
  yield take(actions.LOAD_CURRENT_USER);
  const user = yield select(getCurrentUser);
  const userEntity = yield select(getCurrentUserEntity);
  const isConnected = yield select(getIsConnected);
  if (isConnected && !userEntity) {
    yield call(fetchCurrentUser, { uid: user.uid });
  }
}

function* loginFlow() {
  while (true) {
    const { payload } = yield take(FIREBASE_SIGN_IN.SUCCESS);
    const task = yield fork(fetchLogin, payload);
    const { type } = yield take([FIREBASE_SIGN_OUT.SUCCESS, FIREBASE_SIGN_IN.FAILURE]);
    if (type === FIREBASE_SIGN_OUT.SUCCESS) {
      yield cancel(task);
      yield put(push('/'));
    }
  }
}

function* logoutFlow() {
  while (true) {
    yield take(FIREBASE_SIGN_OUT.SUCCESS);
    yield fork(fetchLogout);
    yield take(actions.LOGOUT_USER.SUCCESS);
    yield put(push('/'));
  }
}

export default function* root() {
  yield all([
    fork(loadCurrentUser),
    fork(watchLoadPostPage),
    fork(watchLoadHomePage),
    fork(loginFlow),
    fork(logoutFlow),
    fork(signUpFlow)
  ]);
}
