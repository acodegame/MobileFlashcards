import React from 'react';
import { PixelRatio } from 'react-native';

export function scaleDP(dp) {
  return dp * PixelRatio.get();
}
