import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { getAddCardData, scaleDP } from '../utils/helpers';
import { addCardToDeck } from '../utils/api';
import { connect } from 'react-redux';
import { addCard } from '../actions/';

// TODO: Move these styles and NewDeck styles to a common stylesheet.
const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputText: {
    marginTop: scaleDP(15),
    height: scaleDP(15),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: scaleDP(2),
    padding: scaleDP(2),
    fontSize: scaleDP(5),
    width: scaleDP(100),
  },
  button: {
    marginTop: scaleDP(15),
    height: scaleDP(12),
    width: scaleDP(34),
    borderRadius: scaleDP(2),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: scaleDP(5),
    color: 'white'
  },
  buttonText: {
    fontSize: scaleDP(5),
    color: 'white'
  }
}

class AddCard extends Component {

  state = {
    question: '',
    answer: '',
    data: undefined,
  }

  componentDidMount() {
    this.setState({
      data: getAddCardData(),
    })
  }

  disableSubmit() {
    return (this.state.question === '' || this.state.answer === '');
  }

  addNewCard = () => {
    const { title } = this.props.navigation.state.params;
    const card = {question: this.state.question, answer: this.state.answer};

    // Update Redux
    this.props.dispatch(addCard(title, card));

    // Save new card info in DB.
    addCardToDeck(title, card);

    // Clear the inputText fields
    this.setState({ question: '', answer: '' });

    // Navigate to card's DeckView
    // TODO: Fix the navigation. It is not navigating.
    this.props.navigation.dispatch('DeckView', this.props.navigation.state.params);
  }

  render() {
    if (this.state.data === undefined) {return null;}
    const { questionPlaceholder, answerPlaceholder, buttonText } = this.state.data;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          onChangeText={(text) => this.setState({question: text})}
          value={this.state.question}
          placeholder={questionPlaceholder}
        />
        <TextInput
          style={styles.inputText}
          onChangeText={(text) => this.setState({answer: text})}
          value={this.state.answer}
          placeholder={answerPlaceholder}
        />
        <TouchableOpacity
          onPress={this.addNewCard}
          style={[styles.button, {backgroundColor: this.disableSubmit() ? 'gray' : 'black'}]}
          disabled={this.disableSubmit()}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(AddCard);
