import {
  take,
  fork,
  cancel
} from 'redux-saga/effects';
import rootSaga from './index';

export const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

function createAbortableSaga(saga) {
  if (module.hot) {
    return function* main() {
      const sagaTask = yield fork(saga);
      yield take(CANCEL_SAGAS_HMR);
      yield cancel(sagaTask);
    };
  }
  return saga;
}

const sagaManager = {
  startSagas(sagaMiddleware) {
    const saga = createAbortableSaga(rootSaga);
    return sagaMiddleware.run(saga);
  },

  cancelSagas(store) {
    store.dispatch({
      type: CANCEL_SAGAS_HMR
    });
  }
};

export default sagaManager;
