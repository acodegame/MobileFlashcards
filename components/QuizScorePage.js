import React, { Component } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { scaleDP, clearLocalNotification, setLocalNotification } from '../utils/helpers';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  scoreInfo: {
    flex: 1/2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleDP(20),
  },
  scoreInfoText: {
    fontSize: scaleDP(8),
    color: 'black',
    marginBottom: scaleDP(3),
  },
  actionButtons: {
    flex: 1/2,
    justifyContent: 'flex-start',
    alignItems: 'center',
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

class QuizScorePage extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    clearLocalNotification().then(setLocalNotification);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    const { deck } = this.props.navigation.state.params;
    this.props.navigation.navigate('DeckView', deck); // works best when the goBack is async
    return true;
  }

  render() {
    const { deck, score } = this.props.navigation.state.params;
    const percentageScore = (score / deck.questions.length)*100;

    return (
      <View style={styles.container}>

        <View style={styles.scoreInfo}>
          <Text style={styles.scoreInfoText}>
            Score = {percentageScore.toFixed(2)}%.
          </Text>
          <Text style={[styles.scoreInfoText, {fontSize: scaleDP(5)}]}>
            {score} correct answer{score>1 ? 's' : ''} out of {deck.questions.length}.
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('QuizView', deck)}>
            <Text style={styles.buttonText}>Start quiz again.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: 'black'}]} onPress={() => this.props.navigation.navigate('DeckView', deck)}>
            <Text style={[styles.buttonText, {color: 'white'}]}>Go to deck.</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default QuizScorePage;
