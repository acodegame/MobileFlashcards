import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { scaleDP } from '../utils/helpers';
import { red } from '../utils/colors';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  card: {
    flex: 1/2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleDP(10),
  },
  actionButtons: {
    flex: 1/2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardText: {
    fontSize: scaleDP(12),
    textAlign: 'center',
  },
  cardsRemaining: {
    padding: scaleDP(3),
    fontSize: scaleDP(6),
  },
  cardToggleButton: {
    color: '#cc0000',
    fontWeight: 'bold',
    fontSize: scaleDP(5),
    alignSelf: 'flex-end',
  },
  button: {
    backgroundColor: 'green',
    alignItems: 'center',
    padding: scaleDP(4),
    width: '50%',
    borderRadius: scaleDP(2),
    marginBottom: scaleDP(5),
  },
  buttonText: {
    fontSize: scaleDP(5),
    color: 'white'
  }
}

class QuizView extends Component {
  state = {
    questionCard: true,
    score: 0,
    cardNumber: 0,
  }

  /**
   * This will toggle card to question or answer.
   */
  toggleCardMode = () => {
    this.setState(prevState => ({
      questionCard: !prevState.questionCard
    }));
  }

  cardSolved = (score) => {
    // If Quiz is completed navigate to score page.
    const deck = this.props.navigation.state.params;

    console.log(`cardSolved score ${score} and deck ${deck}`);
    if (deck.questions.length === this.state.cardNumber + 1) {
      this.props.navigation.navigate('QuizScorePage', {deck: deck, score: this.state.score + score});
      // Reset the state.
      this.setState({
        questionCard: true,
        score: 0,
        cardNumber: 0,
      })
    } else {
      this.setState(prevState => ({
        score: prevState.score + score,
        cardNumber: prevState.cardNumber + 1,
        questionCard: true,
      }));
    }
  }

  render() {
    const data = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        {/**
          1. Cards remaining View
          2. Card view (sub component to display the text of card
            depending on the card mode (question or answer))
          3. Button to change the card mode.
          4. Action buttons
            4.1 Correct button
            4.2. Incorrect button

          Clicking on action buttons will open another card and increment the score
          of quiz which will be displayed, also will change the cards remaining view.
        */}
        <Text style={styles.cardsRemaining}>{this.state.cardNumber + 1}/{data.questions.length}</Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            {data.questions[this.state.cardNumber][this.state.questionCard ? 'question' : 'answer']}
          </Text>
          <TouchableOpacity onPress={this.toggleCardMode}>
            <Text style={styles.cardToggleButton}>{this.state.questionCard ? 'Answer' : 'Question'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.cardSolved(1)}>
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#e60000'}]}
            onPress={() => this.cardSolved(0)}>
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

export default QuizView;
