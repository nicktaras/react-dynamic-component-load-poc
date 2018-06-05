// For Each Action, assign a variable as shown.
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_SUCCESSFUL = 'GET_QUESTIONS_SUCCESSFUL';
export const GET_NEXT_QUESTION_PAGE = 'GET_NEXT_QUESTION_PAGE';
export const GET_PREV_QUESTION_PAGE = 'GET_PREV_QUESTION_PAGE';

export function getNextQuestionPage(){
  return {
    type: GET_NEXT_QUESTION_PAGE,
    payLoad: 2
  }
}

export function getPrevQuestionPage(){
  return {
    type: GET_PREV_QUESTION_PAGE,
    payLoad: 1
  }
}

export function getQuestions(){
  return {
    type: GET_QUESTIONS //,
    // payLoad: [
    //   {
    //     "id": 1,
    //     "questionText": "How many applicants are there?",
    //     "loanDataLocation": "applicants",
    //     "options": [{ "id": 0, "value": "Single" }, { "id": 1, "value": "Joint" }, { "id": 2, "value": "More than two" }],
    //     "actionType": "isSelected",
    //     "component": "Applicants",
    //     "analytics": {
    //       "title": "Applicants"
    //     }
    //   },
    //   {
    //     "id": 2,
    //     "title": "Loan Type",
    //     "menuTitle": "Loan Type",
    //     "questionText": "What is your loan type?",
    //     "options": [{ "id": 0, "value": "Refinance" }, { "id": 1, "value": "New Purchase" }],
    //     "actionType": "isSelected",
    //     "component": "LoanType",
    //     "analytics": {
    //       "title": "Loan Type"
    //     }
    //   }
    // ]
  }
}

export function getQuestionsSuccessful(data){
  console.log('GET_QUESTIONS_SUCCESSFUL ACTION: ', data)
  return {
    type: GET_QUESTIONS_SUCCESSFUL,
    payload: data
  }
}

// Flow is as follows.
// Component triggers sync ACTION (no payload is required).
// The sync ACTION's method uses rxjs Observable
// to make an asyn request, which when complete
// triggers the async ACTION.

// So for loading a json file we can do the following
// LOAD_QUESTIONS > start async request > on success > LOAD_QUESTIONS_SUCCESSFUL > return payload
