import React, { Component } from "react";
import { connect } from 'react-redux';             // glue between redux and reacts
import { bindActionCreators } from 'redux';        // bind bindActionCreators so we can use pub / sub of redux
import history from './history';
import { Link } from 'react-router-dom';

// Load methods from Actions.
import { getQuestions, getNextQuestionPage, getPrevQuestionPage } from './actions/index';

// Shortid - is a package that generates ids.
// When creating Components within react, you must create unique ids to each
// This npm package generates this ids so we can apply them as shown
// in the following tutorial - https://www.slightedgecoder.com/2017/12/03/loading-react-components-dynamically-demand/
import shortid from "shortid";

// A component to dynamically load components into the view.
class QuestionSync extends Component {
  constructor(props) {

    super(props);

    // Check if this is best practice - should this be resolved by the core of the app.
    let questionsStore = this.props.getQuestions().payLoad;

    this.state = {
      components: [],                 // The view components are added here
      questionsStore: questionsStore, // Payload of Questions from Store. TODO: Look to make this Async, in case we want to load this via CSV to JSON.
      nextQuestion: undefined,        // next question id POC
      prevQuestion: undefined,        // prev question id POC
      questionIndex: Number(this.props.match.params.number) // Current question index
    };

    var questionsData = this.getQuestionsArray(this.state.questionIndex);
    this.setQuestionComponents(questionsData);

  }

  // A POC method to illustrate how we can load questions
  // into a page dynamically, based on business logic during the applications lifecycle.
  // Here we use a boolean, we can be manually changed to see two different views load.
  getQuestionsArray (index){
    var questions = this.state.questionsStore;
    if (index === 1) {
      return [questions[0]];
    }
    return [questions[1]];
  }

  // Generate the question components via map loop
  setQuestionComponents (questions){
    // Keeps scope within map function.
    var _thisScope = this;
    // loads the array of components
    questions.map(function (question) {
      return _thisScope.addComponent('questions/' + question.type);
    });
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

  // navigate with router to the next page.
  // Changes question, but page must re-render.
  nextPage(scope, direction){
    let nextQuestion;
    // Get question from Redux / Business logic.
    if(direction === 1) {
      nextQuestion = this.props.getNextQuestionPage().payLoad;
    } else {
      nextQuestion = this.props.getPrevQuestionPage().payLoad;
    }
    // TODO - tidy / rework.
    this.state.components = [];
    this.setQuestionComponents(this.getQuestionsArray(nextQuestion));
    this.setState({ components: this.state.components, questionIndex: nextQuestion });
  }

  // componentDidMount()
  // invoked immediately after a component is mounted.
  // Initialization that requires DOM nodes should go here.
  // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
  componentDidMount() {}

  // componentDidUpdate()
  // invoked immediately after updating occurs. This method is not called for the initial render.
  componentDidUpdate(prevProps, prevState, snapshot) {
    history.push('/question/' + this.state.questionIndex); // Method to navigate to next view.
  }

  render() {
    const { components } = this.state;
    if (components.length === 0) return <div>Loading...</div>;
    const componentsElements = components.map(Component => (
      <Component key={shortid.generate()} />
    ));
    return (
      <div>
        <div>{componentsElements}</div>
        <button onClick={(evt) => this.nextPage(this, 1)}>NEXT</button>
        <button onClick={(evt) => this.nextPage(this, -1)}>PREV</button>
      </div>
    );
  }
}

// Another way to navigate with router.
// <Link to="/question/2">Next</Link>
// <Link to="/question/1">Back</Link>

// Map Dispatch Events to Props.
// So we can call them like so: this.props.getQuestions();
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getQuestions,
    getNextQuestionPage,
    getPrevQuestionPage
  }, dispatch);
}

// Map the current State the props
function mapStateToProps(state) {
  return {
    nextQuestion: state.nextQuestion,
    prevQuestion: state.prevQuestion,
    questionsStore: state.questionsStore
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionSync);
