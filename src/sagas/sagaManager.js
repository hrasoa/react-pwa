import {
  take,
  fork,
  cancel
} from 'redux-saga/effects';
import rootSaga from './index';

export const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

function createAbortableSaga(saga, args) {
  if (module.hot) {
    return function* main() {
      const sagaTask = yield fork(saga, args);
      yield take(CANCEL_SAGAS_HMR);
      yield cancel(sagaTask);
    };
  }
  return saga;
}

const sagaManager = {
  startSagas(sagaMiddleware, args) {
    const saga = createAbortableSaga(rootSaga, args);
    return sagaMiddleware.run(saga, args);
  },

  cancelSagas(store) {
    store.dispatch({
      type: CANCEL_SAGAS_HMR
    });
  }
};

export default sagaManager;
