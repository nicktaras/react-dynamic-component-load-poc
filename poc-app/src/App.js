import React, { Component } from 'react';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import history from './history';
import { createStore, applyMiddleware } from 'redux';
import { Link } from 'react-router-dom';

import QuestionSync from './QuestionSync';

const createStoreWithMiddleware = applyMiddleware()(createStore);

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={createStoreWithMiddleware(reducers)}>
        <div>
          <Route exact path="/question/:number" component={QuestionSync} history={history} />
          <Link to="/question/1">Test</Link>
        </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
