// Action to get next question
import { GET_NEXT_QUESTION_PAGE, GET_PREV_QUESTION_PAGE } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case GET_NEXT_QUESTION_PAGE:
      return [ action.payload, ...state ];
    case GET_PREV_QUESTION_PAGE:
      return [ action.payload, ...state ];
    default:
      return state
  }
}
