import React, { Component } from 'react';
import QuestionSync from './QuestionSync';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <QuestionSync></QuestionSync>
      </Provider>
    );
  }
}

export default App;
