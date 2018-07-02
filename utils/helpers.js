import React from 'react';
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
