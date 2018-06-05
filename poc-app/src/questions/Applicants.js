// A POC SIMPLE COMPONENT.
import React from 'react';

class Applicants extends React.Component {

  state = {
    value: 'Applicants'
  }

  constructor() {
    super();
    console.log(this.state.value + 'Component Constructor Initialised')
  }

  componentDidMount() {
    console.log(this.state.value + 'Component Mounted')
  }

  render() {
    return (
      <div>
        <p>Hello, {this.state.value}.</p>
      </div>
    )
  }

}
export default Applicants;
