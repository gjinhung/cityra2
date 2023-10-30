import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import tours from './tour'
import bookings from './booking'
import dates from './date'
import cities from './city'
import languages from './language'
import specialties from './specialty';
import reviews from './reviews';
import users from './users'

const rootReducer = combineReducers({
  session,
  tours,
  bookings,
  dates,
  cities,
  languages,
  specialties,
  reviews,
  users
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
