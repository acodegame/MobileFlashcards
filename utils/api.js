import { AsyncStorage } from 'react-native';

const DECK_STORAGE_KEY = 'MobileFlashcards:decks';

/**============================================================================
DATA FORMAT:
{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment
                 within which that function was declared.'
      }
    ]
  }
}
===============================================================================
 */

/**
 * return promise of all the decks along with
 * their titles, questions, and answers.
 *
 * @return Promise of Decks Object
 */
export async function getDecks() {
  const decks = await AsyncStorage.getItem(DECK_STORAGE_KEY);
  return JSON.parse(decks);
}

/**
 * Takes in a single id argument and return
 * the promise of deck associated with that id.
 *
 * @param id String
 * @return Promise of deck Object
 */
export async function getDeck(id) {
  let decks = await AsyncStorage.getItem(DECK_STORAGE_KEY);
  decks = JSON.parse(results);
  return decks[id];
}

/**
 * Takes in a single title argument and add it
 * to the decks.
 *
 * @param title String
 * @return undefined if title is not present, error message otherwise.
 */
export function saveDeckTitle(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results);
      if (data === null) {
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({[title]: {title: title, questions: []}}));
      } else if (Object.keys(data).indexOf(title) === -1) {
        data[title] = {title: title, questions: []};
        AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(data))
      }
    });
}

/**
 * Takes in two arguments, title and card,
 * and will add the card to the list of questions
 * for the deck with the associated title.
 *
 * @param title String
 * @param card Object Eg. {question: '', answer: ''}
 */
export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results);
      console.log(data);
      data[title].questions.push(card);
      AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(data))
    });
}
