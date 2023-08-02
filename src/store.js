import { createStore } from 'redux';
import rootReducer from './reducers';
import middlewares from './middlewares';

const store = createStore(rootReducer, middlewares);

export default store;
