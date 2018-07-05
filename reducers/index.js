import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions';

function deck(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return Object.assign(state, action.decks);
    case ADD_DECK:
      if (Object.keys(state).length === 0 && state.constructor === Object) {
        return {
          [action.title]: {
            title: action.title,
            questions: [],
          }
        }
      } else if (Object.keys(state).indexOf(action.title) === -1) {
        return {
          ...state,
          [action.title]: {
            title: action.title,
            questions: [],
          },
        }
      }
      return {
        ...state
      };
    case ADD_CARD:
      let newState = Object.assign({}, state);
      newState[action.title].questions.push(action.card);
      return newState;
    default :
      return state
  }
}

export default deck;
