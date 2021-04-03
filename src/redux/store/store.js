import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const configureStore = (initialState = {}) => {
  const middlewares = [thunk];

  return createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares),
    ),
  );
}

export default configureStore;
