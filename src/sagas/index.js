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
import getPost from '../reducers/selectors/index';


const { post } = actions;


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


// load user unless it is cached
function* loadPost(id, requiredFields) {
  const loadedPost = yield select(getPost, id);
  if (!loadedPost || requiredFields.some(key => !(key in loadedPost))) {
    yield call(fetchPost, id);
  }
}

function* watchLoadPostPage() {
  while (true) { // eslint-disable-line no-constant-condition
    const { id, requiredFields = [] } = yield take(actions.LOAD_POST_PAGE);
    yield fork(loadPost, id, requiredFields);
  }
}

export default function* root() {
  yield all([
    fork(watchLoadPostPage)
  ]);
}
