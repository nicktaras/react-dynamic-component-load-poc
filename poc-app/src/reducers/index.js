import { combineReducers } from 'redux';
import questionsStore from './reducer_questions';
import getNextQuestionPage from './reducer_questions';

// mapStateToProps - use the keys below to map the data back to your component.
// TODO investigate how to ensure the sync data comes back to the components - e.g. use React-RX.
const rootReducer = combineReducers({
  questionsStore: questionsStore,
  nextQuestion: getNextQuestionPage
});

export default rootReducer;
