/* eslint-disable global-require, no-underscore-dangle */
import {
  applyMiddleware,
  createStore,
  compose
} from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../reducers/index';
import sagaManager from '../sagas/sagaManager';

export default function configureStore(initialState, start) {
  const composeEnhancers = (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(
      sagaMiddleware
    ))
  );

  if (module.hot) {
    module.hot.accept('../reducers/index', () => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });

    module.hot.accept('../sagas/sagaManager', () => {
      sagaManager.cancelSagas(store);
      require('../sagas/sagaManager').default.startSagas(sagaMiddleware);
    });
  }

  store.runSaga = sagaManager.startSagas.bind(null, sagaMiddleware);
  store.close = () => store.dispatch(END);

  return store;
}
