import React, { Component } from "react";
import { connect } from 'react-redux';             // glue between redux and reacts
import { bindActionCreators } from 'redux';        // bind bindActionCreators so we can use pub / sub of redux
import history from './history';

// Load methods from Actions.
import { getQuestions, getQuestionsSuccessful, getNextQuestionPage, getPrevQuestionPage } from './actions/index';

// Shortid - is a package that generates ids.
// When creating Components within react, you must create unique ids to each
// This npm package generates this ids so we can apply them as shown
// in the following tutorial - https://www.slightedgecoder.com/2017/12/03/loading-react-components-dynamically-demand/
import shortid from "shortid";

// A component to dynamically load components into the view.
class QuestionSync extends Component {
  constructor(props) {
    super(props);
    let questionIndex = Number(this.props.match.params.number);
    this.state = {
      components: [],               // The view components are added here
      questionsStore: [],           // Payload of Questions
      nextQuestion: undefined,      // next question id POC
      prevQuestion: undefined,      // prev question id POC
      questionIndex: questionIndex  // Current question index
    };
  }

  // componentDidMount()
  // invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here.
  // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
  componentDidMount(){
    this.props.getQuestions();
  }

  reRenderView() {
    if (this.props.questionsStore.length){
      var questionsData = this.getQuestionsArray(this.state.questionIndex, this.props.questionsStore);
      this.setQuestionComponents(questionsData);
    }
  }

  // A POC method to illustrate how we can load questions
  // into a page dynamically, based on business logic during the applications lifecycle.
  // Here we use a boolean, we can be manually changed to see two different views load.
  getQuestionsArray (index, questions){
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
      return _thisScope.addComponent('questions/' + question.component);
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
  // This is currently syncronous - it will need to be async in the real app.
  nextPage(scope, direction){
    let nextQuestion;
    // Get question from Redux / Business logic.
    if(direction === 1) {
      nextQuestion = this.props.getNextQuestionPage().payLoad;
    } else {
      nextQuestion = this.props.getPrevQuestionPage().payLoad;
    }
    // TODO review this: using call back to ensure the components are cleared before changing page.
    // taking page back to loading state.
    this.setState({components: []}, function (){
      let nextQuestionsArray = this.getQuestionsArray(nextQuestion, this.props.questionsStore);
      this.setQuestionComponents(nextQuestionsArray);
      this.setState({ components: this.state.components, questionIndex: nextQuestion });
    });
  }

  // getDerivedStateFromProps is invoked right before calling the render method, both on the initial mount and on subsequent updates.
  // It should return an object to update the state, or null to update nothing.
  getDerivedStateFromProps(props, state){}

  // componentDidUpdate()
  // invoked immediately after updating occurs. This method is not called for the initial render.
  componentDidUpdate(prevProps, prevState, snapshot) {

    // To stop and infinite loop we must ensure the data recieved is different from the current state
    // then we can re-render the page.
    if (this.props.questionsStore !== this.state.questionsStore) {
      this.setState({ questionsStore: this.props.questionsStore });
      this.reRenderView();
    }

    // navigate to next view.
    history.push('/question/' + this.state.questionIndex);
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
        <button onClick={(evt) => this.nextPage(this, -1)}>PREV</button>
        <button onClick={(evt) => this.nextPage(this, 1)}>NEXT</button>
      </div>
    );
  }
}

// Map Dispatch Events to Props.
// So we can call them like so: this.props.getQuestions();
// Add all the action methods you wish to call during this
// components lifecycle here.
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getQuestions,        // Get questions (epic functionality to resolve a json file containing questions).
    getNextQuestionPage, // next question click
    getPrevQuestionPage  // prev question click
  }, dispatch);
}

// Map the current state to props
function mapStateToProps(state) {
  return {
    nextQuestion: state.nextQuestion,
    prevQuestion: state.prevQuestion,
    questionsStore: state.questionsStore
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionSync);
