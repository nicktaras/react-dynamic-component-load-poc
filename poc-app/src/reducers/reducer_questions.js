// Initial implementation to load questions data from store.
// this static information could be loaded, where this could be moved
// up the the actions, to resolve this with an anync request.

export default function () {
  return [
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
  ];
}

// TODO implement in next step:
// import { FETCH_QUESTIONS } from '../actions/index';
// export default function (state = [], action) {
//   switch (action.type) {
//     case FETCH_QUESTIONS:
//       // never mutate state.
//       // these two mehtods will take the place of the existing state
//       // but not mutate the current.
//       // return state.concat([action.payload.data]);
//       return [ action.payload.data, ...state ]; // es6 way
//   }
//   return state;
// }
