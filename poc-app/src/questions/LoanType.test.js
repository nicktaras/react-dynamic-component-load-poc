import React from 'react';
import ReactDOM from 'react-dom';
import LoanType from './LoanType';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoanType />, div);
  ReactDOM.unmountComponentAtNode(div);
});
