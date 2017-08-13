/* eslint-disable global-require, no-underscore-dangle */
import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose
} from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../reducers/index';
import sagaManager from '../sagas/sagaManager';

export default function configureStore(initialState, otherReducers = {}, otherMiddlewares = []) {
  const composeEnhancers = (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const sagaMiddleware = createSagaMiddleware();
  const reducers = { ...rootReducer, ...otherReducers };
  const middlewares = [sagaMiddleware, ...otherMiddlewares];

  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(applyMiddleware(
      ...middlewares
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
