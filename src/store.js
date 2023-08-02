import { createStore, compose } from 'redux';
import rootReducer from './reducers';
import middlewares from './middlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(middlewares));

export default store;
