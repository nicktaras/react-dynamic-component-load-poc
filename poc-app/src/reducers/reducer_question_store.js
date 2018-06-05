import { Observable } from 'rxjs/Observable';
import axios from 'axios';
import { getQuestionsSuccessful, GET_QUESTIONS_SUCCESSFUL, GET_QUESTIONS } from './../actions/';

const defaultState = {
  questionsStore: []
}

export const getQuestionsStoreEpic = action$ =>
  action$.ofType(GET_QUESTIONS)
    .switchMap(function (action) {
      return new Observable(obs => {
        axios.get('http://localhost:3000/data/questions.json')
          .then(function(response){
            obs.next(getQuestionsSuccessful(response.data));
          });
      });
    });

export const questionsStore = (state = defaultState, action = {}) => {
  switch (action.type) {
    case GET_QUESTIONS_SUCCESSFUL:
      return action.payload;
    case GET_QUESTIONS:
    default:
      return state;
  }
}
