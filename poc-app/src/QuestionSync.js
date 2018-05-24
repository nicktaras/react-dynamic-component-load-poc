import React, { Component } from "react";
import { connect } from 'react-redux';      // glue between redux and reacts
import { bindActionCreators } from 'redux';

// Shortid - is a package that generates ids.
// When creating Components within react, you must create unique ids to each
// This npm package generates this ids so we can apply them as shown
// in the following tutorial - https://www.slightedgecoder.com/2017/12/03/loading-react-components-dynamically-demand/
import shortid from "shortid";

// A component to dynamically load components into the view.
class QuestionSync extends Component {
  constructor(props) {

    super(props);

    // The view components are added here
    this.state = {
      components: []
    };

  }

  // A POC method to illustrate how we can load questions
  // into a page dynamically, based on business logic during the applications lifecycle.
  // Here we use a boolean, we can be manually changed to see two different views load.
  pocLoadQuestionBasedOnRules (){
    const conditionX = true;
    if (conditionX) return [this.props.questions[0], this.props.questions[1], this.props.questions[0]];
    return [this.props.questions[1], this.props.questions[0]];
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
    var questions = this.pocLoadQuestionBasedOnRules();
    // loads the array of components
    questions.map(function (question) {
      _thisScope.addComponent(question.type);
    });
  }

  render() {
    const { components } = this.state;
    if (components.length === 0) return <div>Loading...</div>;
    const componentsElements = components.map(Component => (
      <Component key={shortid.generate()} />
    ));
    return <div>{componentsElements}</div>;
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions
  }
}

export default connect(mapStateToProps)(QuestionSync);
