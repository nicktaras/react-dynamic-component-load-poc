import { combineReducers } from 'redux';
import QuestionsReducer from './reducer_questions';

const rootReducer = combineReducers({
  questions: QuestionsReducer
});

export default rootReducer;
