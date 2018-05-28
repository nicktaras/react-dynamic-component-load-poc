// For Each Action, assign a variable as shown.
export const GET_QUESTIONS          = 'GET_QUESTIONS';
export const GET_NEXT_QUESTION_PAGE = 'GET_NEXT_QUESTION_PAGE';
export const GET_PREV_QUESTION_PAGE = 'GET_PREV_QUESTION_PAGE';

// POC get next question.
export function getNextQuestionPage(){
  return {
    type: 'GET_NEXT_QUESTION',
    payLoad: 2
  }
}

// POC get prev question.
export function getPrevQuestionPage(){
  return {
    type: 'GET_PREV_QUESTION_PAGE',
    payLoad: 1
  }
}

// POC question store.
export function getQuestions(){
  return {
    type: 'GET_QUESTIONS',
    payLoad: [
        {
          id: 1,
          title: "Question X",
          menuTitle: "Question X Menu",
          questionText: "Question Text X",
          valid: false,
          type: "QuestionX",
          answer: null,
          // answer: {
          //   value: null,
          //   fequency: undefined
          // },
          analytics: {
            title: "Question X"
          },
        },
        {
          id: 2,
          title: "Question Y",
          menuTitle: "Question Y Menu",
          questionText: "Question Text Y",
          valid: false,
          type: "QuestionY",
          answer: null,
          // answer: {
          //   value: null,
          //   fequency: undefined
          // },
          analytics: {
            title: "Question Y"
          }
        }
      ]
  }
}
