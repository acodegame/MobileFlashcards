import React from 'react';
import { NavigationActions } from 'react-navigation';
import { PixelRatio } from 'react-native';

export function scaleDP(dp) {
  return dp * PixelRatio.get();
}

export function getNewDeckData() {
  return {
    title: 'What is the title of your new deck ?',
    inputTextPlaceholder: 'Deck Title',
    buttonText: 'Submit',
  }
}

export function getAddCardData() {
  return {
    questionPlaceholder: 'Add your question here.',
    answerPlaceholder: 'Add the answer here.',
    buttonText: 'Submit',
  }
}

export function navigateToHome() {
  return NavigationActions.navigate({routeName: 'DeckList'});
}
