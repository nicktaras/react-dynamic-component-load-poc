// A set of rx util modules globally required by the application.
import './rx';
// React library and React Component.
// This allows us to use the syntax as shown below to create the App Component.
import React, { Component } from 'react';
// Used once, provider wraps all the inner contents to have the ability to read from
// the redux store. As shown below.
import { Provider } from 'react-redux';
// Here we import the router for the dom. React Native has router capabilities
// too, where a different router would be required.
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Seperated into a seperate file, the history currently creates browser history.
import history from './history';
// We create a store to contain the states of the application.
// This contains both reducer data and epics (async reduced data).
import createStore from './createStore';
import QuestionSync from './QuestionSync';

// Creates a new store for history of application state.
// which is injected into the router below.
const store = createStore(history);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/question/:number" component={QuestionSync} history={history} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
