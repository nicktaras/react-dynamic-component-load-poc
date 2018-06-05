import './rx';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import history from './history';
import createStore from './createStore';
import QuestionSync from './QuestionSync';

const store = createStore(history);

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
        <div>
          <Route exact path="/question/:number" component={QuestionSync} history={history} />
        </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
