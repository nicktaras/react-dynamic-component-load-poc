import React from 'react';
import ReactDOM from 'react-dom';
import QuestionX from './QuestionX';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QuestionX />, div);
  ReactDOM.unmountComponentAtNode(div);
});
