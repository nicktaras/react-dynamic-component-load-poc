import React, { Component } from "react";

// Shortid - is a package that generates ids.
// When creating Components within react, you must create unique ids to each
// This npm package generates this ids so we can apply them as shown
// in the following tutorial - https://www.slightedgecoder.com/2017/12/03/loading-react-components-dynamically-demand/
import shortid from "shortid";

// Traditional way to define components before react component lifecycle begins.
// import QuestionX from './questions/QuestionX.js';
// import QuestionY from './questions/QuestionY.js';

var data = [
  {
    id: "UTI1",
    title: "Question X",
    menuTitle: "Question X Menu",
    questionText: "Question Text X",
    valid: false,
    type: "QuestionX",
    loanDataLocation: 'where in store to place the data',
    analytics: {
      title: "Question X"
    },
  },
  {
    id: 2,
    title: "Question Y",
    menuTitle: "Question Y Menu",
    questionText: "Question Text Y",
    valid: false,
    type: "QuestionY",
    loanDataLocation: 'where in store to place the data',
    analytics: {
      title: "Question Y"
    }
  }
];

const conditionX = false;

function pocLoadQuestionBasedOnRules (){
  if (conditionX) return data[0];
  return [data[1]];
}

class QuestionSync extends Component {
  constructor(props) {
    super(props);

    this.state = {
      components: []
    };

  }

  addComponent = function (type) {
    console.log(`Loading ${type} component...`);

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

  async componentDidMount() {

    var _this = this;
    var questions = pocLoadQuestionBasedOnRules();

    questions.map(function (question) {
      _this.addComponent(question.type);
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

export default QuestionSync;
