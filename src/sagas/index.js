/* eslint-disable no-constant-condition */
import {
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
  getLatestPictures,
  getLatestPosts
} from '../reducers/selectors';


const { home, post } = actions;


function* fetchEntity(entity, apiFn, id) {
  yield put(entity.request(id));
  const { response, error } = yield call(apiFn, id);
  if (response) {
    yield put(entity.success(id, response));
  } else {
    yield put(entity.failure(id, error));
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
  if (
    !loadedLatestPosts || !loadedLatestPosts.pageCount ||
    !loadedLatestPictures || !loadedLatestPictures.pageCount
  ) {
    yield call(fetchHome, null);
  }
}

function* watchLoadPostPage() {
  while (true) {
    const { id, requiredFields = [] } = yield take(actions.LOAD_POST_PAGE);
    yield fork(loadPost, id, requiredFields);
  }
}

function* watchLoadHomePage() {
  while (true) {
    yield take(actions.LOAD_HOME_PAGE);
    yield fork(loadHome);
  }
}

export default function* root() {
  yield all([
    fork(watchLoadPostPage),
    fork(watchLoadHomePage)
  ]);
}
