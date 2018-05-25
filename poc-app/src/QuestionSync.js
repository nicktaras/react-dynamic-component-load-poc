import React, { Component } from "react";
import { connect } from 'react-redux';             // glue between redux and reacts
import { bindActionCreators } from 'redux';        // bind bindActionCreators so we can use pub / sub of redux
// import { Route, Link } from "react-router-dom";
// import history from './history';

// Load methods from Actions.
import { getQuestions, getNextQuestionPage } from './actions/index';

// Shortid - is a package that generates ids.
// When creating Components within react, you must create unique ids to each
// This npm package generates this ids so we can apply them as shown
// in the following tutorial - https://www.slightedgecoder.com/2017/12/03/loading-react-components-dynamically-demand/
import shortid from "shortid";

// A component to dynamically load components into the view.
class QuestionSync extends Component {
  constructor(props) {

    super(props);

    let questionsStore = this.props.getQuestions().payLoad;

    this.state = {
      components: [],           // The view components are added here
      questions: questionsStore // Payload of Questions from Store. TODO: Look to make this Async, in case we want to load this via CSV to JSON.
    };

    // mapStateToProps();

  }

  // A POC method to illustrate how we can load questions
  // into a page dynamically, based on business logic during the applications lifecycle.
  // Here we use a boolean, we can be manually changed to see two different views load.
  pocLoadQuestionBasedOnRules (){

    var questions = this.state.questions;
    var questionNumber = Number(this.props.match.params.number);

    if (questionNumber === 1) {
      return [questions[0], questions[1], questions[0], questions[1]];
    }

    return [questions[1]];
  }

  // This method adds components to the state components array
  // to to be rendered to the view.
  addComponent = function (type) {
    import(`./${type}.js`)
      .then(component =>
        this.setState({
          components: this.state.components.concat(component.default)
        })
      )
      .catch(error => {
        console.error(`"${type}" not yet supported`);
      });
  };

  componentDidMount() {
    // Keeps scope within map function.
    var _thisScope = this;

    // Gets questions based on POC rules
    var questions = this.pocLoadQuestionBasedOnRules(questions);

    // loads the array of components
    questions.map(function (question) {
      return _thisScope.addComponent(question.type);
    });
  }

  nextPage(scope){
    debugger;
    // this.props.getNextQuestionPage
  }

  // SET_QUESTION async action reduced here.
  // setNextQuestion(event) {}
  // history.push('/question/2'); - navigate with router.

  render() {
    const { components } = this.state;
    if (components.length === 0) return <div>Loading...</div>;
    const componentsElements = components.map(Component => (
      <Component key={shortid.generate()} />
    ));
    return (
      <div>
        <div>{componentsElements}</div>
          <button onClick={this.nextPage.bind((this))}>
            Next Page
          </button>
      </div>
    );
  }
}

// Dispatch Events
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getQuestions, getNextQuestionPage }, dispatch);
}

// Subscribe Events
// TODO Confirm why we do this, when the action creators don't re-apply the data back to these values.
// FIXME Its seems as though the Redux Cycle is not working as it should.
function mapStateToProps(state) {
  return {
    nextQuestion: state.questionId,
    questions: state.questions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionSync);
