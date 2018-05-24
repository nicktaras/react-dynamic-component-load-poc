// import React, { Component } from "react";
// import shortid from "shortid";
//
// // import QuestionX from './questions/QuestionX.js';
//
// var data = [
//   {
//     id: "UTI1",
//     title: "Question X",
//     menuTitle: "Question X Menu",
//     questionText: "Question Text X",
//     valid: false,
//     type: "QuestionX",
//     loanDataLocation: 'where in store to place the data',
//     analytics: {
//       title: "Question X"
//     },
//   },
//   {
//     id: 2,
//     title: "Question Y",
//     menuTitle: "Question Y Menu",
//     questionText: "Question Text Y",
//     valid: false,
//     type: "QuestionY",
//     loanDataLocation: 'where in store to place the data',
//     analytics: {
//       title: "Question Y"
//     }
//   }
// ];
//
// class Question extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       components: []
//     };
//
//     this.props = data;
//   }
//
//   addComponent = async type => {
//     console.log(`Loading ${type} component...`);
//
//     import(`./${type}.js`)
//       .then(component =>
//         this.setState({
//           components: this.state.components.concat(component.default)
//         })
//       )
//       .catch(error => {
//         console.error(`"${type}" not yet supported`);
//       });
//   };
//
//   async componentDidMount() {
//     var _this = this;
//     // data.map(function (question) {
//     //   _this.addComponent(question.type);
//     // });
//     // const { events } = data; // this.props;
//     data.map(async type => await _this.addComponent(type));
//   }
//
//   render() {
//     const { components } = this.state;
//     if (components.length === 0) return <div>Loading...</div>;
//
//     const componentsElements = components.map(Component => (
//       <Component key={shortid.generate()} />
//     ));
//
//     return <div>{componentsElements}</div>;
//   }
// }
//
// export default Question;
