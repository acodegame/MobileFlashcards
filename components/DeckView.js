import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { scaleDP } from '../utils/helpers';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  deckDetails: {
    flex: 1/2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleDP(20),
  },
  actionButtons: {
    flex: 1/2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: scaleDP(14),
    color: 'black',
    marginBottom: scaleDP(3),
  },
  cards: {
    fontSize: scaleDP(8),
    color: 'gray',
  },
  button: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: scaleDP(4),
    width: '50%',
    borderRadius: scaleDP(2),
    marginBottom: scaleDP(5),
  },
  buttonText: {
    fontSize: scaleDP(6),
    color: 'black'
  },
}

class DeckView extends Component {
  render() {
    const data = this.props.deck;
    if (data === undefined) {
      return null;
    }
    return (
      <View style={styles.container}>
        <View style={styles.deckDetails}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.cards}>{`${data.questions.length} cards`}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => {this.props.navigation.navigate('AddCard', data)}}
            style={styles.button}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {this.props.navigation.navigate('QuizView', data)}}
            style={[styles.button, {backgroundColor: 'black'}]}>
            <Text style={[styles.buttonText, {color: 'white'}]}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  const title = props.navigation.state.params.title;
  return ({
    ...props,
    deck: state[title]
  });
}

export default connect(mapStateToProps)(DeckView);
