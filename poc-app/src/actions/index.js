// For Each Action, assign a variable as shown.
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_SUCCESSFUL = 'GET_QUESTIONS_SUCCESSFUL';
export const GET_NEXT_QUESTION_PAGE = 'GET_NEXT_QUESTION_PAGE';
export const GET_PREV_QUESTION_PAGE = 'GET_PREV_QUESTION_PAGE';

// Action to resolve the next question.
// In a real application, the payload will have come from business logic.
// and will most likely need an epic part to this sequence.
export function getNextQuestionPage(){
  return {
    type: GET_NEXT_QUESTION_PAGE,
    payLoad: 2
  }
}

// Action to resolve the previous question.
// In a real application, the payload will have come from business logic.
// and will most likely need an epic part to this sequence.
export function getPrevQuestionPage(){
  return {
    type: GET_PREV_QUESTION_PAGE,
    payLoad: 1
  }
}

// The first of two parts to resolve the getQuestions.
// Sync Action, does not return a payload.
export function getQuestions(){
  return {
    type: GET_QUESTIONS
  }
}

// The second part to resolve the questions.
// Async Action, returns payload.
export function getQuestionsSuccessful(data){
  console.log('GET_QUESTIONS_SUCCESSFUL ACTION: ', data)
  return {
    type: GET_QUESTIONS_SUCCESSFUL,
    payload: data
  }
}
