import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Easing,
} from 'react-native';
import { connect } from 'react-redux';
import { scaleDP, getNewDeckData, navigateToHome } from '../utils/helpers';
import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions';

const LARGE_SIZE = scaleDP(16);
const SMALL_SIZE = scaleDP(8);

const styles = {
  container: {
    flex: 1,
    padding: scaleDP(2),
    alignItems: 'center'
  },
  title: {
    marginTop: LARGE_SIZE,
    fontSize: LARGE_SIZE,
    textAlign: 'center',
    marginBottom: LARGE_SIZE,
  },
  inputText: {
    height: scaleDP(15),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: scaleDP(2),
    padding: scaleDP(2),
    fontSize: scaleDP(5),
    width: scaleDP(100),
  },
  button: {
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
  }
}

class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.titleSize = new Animated.Value(LARGE_SIZE);
    this.marginBottom = new Animated.Value(LARGE_SIZE);
  }

  state = {
    text: '',
    data: undefined
  }

  componentWillMount () {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  componentDidMount() {
    this.setState({
      data: getNewDeckData()
    })
  }

  createTimingAnimation(value, toValue, duration, easing, delay = 0) {
    return Animated.timing(
      value,
      {
        toValue,
        duration,
        easing,
        delay
      }
    )
  }

  _keyboardDidShow = (event) => {
    Animated.parallel([
      this.createTimingAnimation(this.titleSize, SMALL_SIZE, 120, Easing.ease),
      this.createTimingAnimation(this.marginBottom, SMALL_SIZE, 120, Easing.ease),
    ]).start();
  };

  _keyboardDidHide = (event) => {
    Animated.parallel([
      this.createTimingAnimation(this.titleSize, LARGE_SIZE, 120, Easing.ease),
      this.createTimingAnimation(this.marginBottom, LARGE_SIZE, 120, Easing.ease),
    ]).start();
  };

  createNewDeck = () => {
    // Update Redux
    this.props.dispatch(addDeck(this.state.text));

    // Save new deck info in DB.
    saveDeckTitle(this.state.text);

    // Clear the inputText field
    this.setState({ text: '' });

    // Navigate to DeckList View.
    this.props.navigation.dispatch(navigateToHome());
  }

  render() {
    if (this.state.data === undefined) {
      // Render placeholder here if this is a network call.
      return null;
    }

    const {title, inputTextPlaceholder, buttonText} = this.state.data;

    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Animated.Text
          style={[styles.title, {
            fontSize: this.titleSize,
            marginBottom: this.marginBottom,
            marginTop: this.marginBottom
          }]}>
          {title}
        </Animated.Text>
        <Animated.View style={{marginBottom: this.marginBottom}}>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder={inputTextPlaceholder}
          />
        </Animated.View>
        {/*
          * Move this button to a subs in components and abstract it's logic.
          */
        }
        <TouchableOpacity
          style={[styles.button, {backgroundColor: this.state.text === '' ? 'gray' : 'black'}]}
          onPress={this.createNewDeck}
          disabled={this.state.text === ''}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(NewDeck);
