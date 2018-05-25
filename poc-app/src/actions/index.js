export const GET_QUESTIONS          = 'GET_QUESTIONS';
export const GET_NEXT_QUESTION_PAGE = 'GET_NEXT_QUESTION_PAGE';

export function getNextQuestionPage(){
  return {
    type: 'GET_NEXT_QUESTION',
    payLoad: 2
  }
}

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
