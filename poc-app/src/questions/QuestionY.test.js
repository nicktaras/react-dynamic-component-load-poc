import React from 'react';
import ReactDOM from 'react-dom';
import QuestionY from './QuestionX';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QuestionY />, div);
  ReactDOM.unmountComponentAtNode(div);
});
