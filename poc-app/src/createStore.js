import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from './reducers'; // consider moving this to a higher level above reducers as per guide.

// Epic is required to handle ASYNC actions within Redux cycle.
const epicMiddleware = createEpicMiddleware(rootEpic);

function store() {
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
  );
  return store;
}

export default store;
