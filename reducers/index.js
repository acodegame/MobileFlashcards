import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions';

function deck(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      console.log('Reducer receiveDecks: ', action.decks);
      return Object.assign(state, action.decks);
    case ADD_DECK:
      if (Object.keys(state).length === 0 && state.constructor === Object) {
        console.log('Initializing Decks ', {[action.title]: {title: action.title,}})
        return {
          [action.title]: {
            title: action.title,
          }
        }
      } else if (Object.keys(state).indexOf(action.title) === -1) {
        return {
          ...state,
          [action.title]: {
            title: action.title,
          },
        }
      }
      return {
        ...state
      };
    case ADD_CARD:
      let newState = Object.assign({}, state);
      if (newState[action.title].questions === undefined) {
        newState[action.title].questions = [];
      }
      newState[action.title].questions.push(action.card);
      return newState;
    default :
      return state
  }
}

export default deck;
