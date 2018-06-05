import { combineReducers } from 'redux';
// import questionsStore from './reducer_question_store';
import getNextQuestionPage from './reducer_questions';
import { questionsStore, getQuestionsStoreEpic } from './reducer_question_store';
import { combineEpics } from 'redux-observable';

// Reference:
// https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html
// We recommend importing all of your Epics into a single file, which then exports the root Epic and the root Reducer.

export const rootEpic = combineEpics(
  getQuestionsStoreEpic // getNextQuestionPageEpic
);

// mapStateToProps - use the keys below to map the data back to your component.
export const rootReducer = combineReducers({
  questionsStore,
  getNextQuestionPage
});
