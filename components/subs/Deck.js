import React, { Component } from 'react';
import { View, Text, TouchableOpacity  } from 'react-native';
import { scaleDP } from '../../utils/helpers';
import DeckView from '../DeckView';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleDP(20),
  },
  seperator: {
    height: 1,
    width: '90%',
    backgroundColor: '#CED0CE',
    alignSelf: 'center'
  },
  title: {
    fontSize: scaleDP(10),
    color: 'black',
    marginBottom: scaleDP(3),
  },
  cards: {
    fontSize: scaleDP(5),
    color: 'gray',
  }
}

const Deck = props => {
  return (
    <View>
      <TouchableOpacity onPress={props.openDeckView}>
        <View style={styles.container}>
          <Text style={styles.title}>{props.item.title}</Text>
          <Text style={styles.cards}>{`${props.item.questions.length} cards`}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.seperator}/>
    </View>
  )
}

export default Deck;
