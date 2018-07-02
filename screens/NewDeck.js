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
import { scaleDP } from '../utils/helpers';

const LARGE_TITLE_SIZE = scaleDP(16);
const SMALL_TITLE_SIZE = scaleDP(8);

const styles = {
  container: {
    flex: 1,
    padding: scaleDP(2),
    alignItems: 'center'
  },
  title: {
    marginTop: LARGE_TITLE_SIZE,
    fontSize: LARGE_TITLE_SIZE,
    textAlign: 'center',
    marginBottom: LARGE_TITLE_SIZE,
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

export default class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.titleSize = new Animated.Value(LARGE_TITLE_SIZE);
    this.marginBottom = new Animated.Value(LARGE_TITLE_SIZE);
  }

  state = {
    text: '',
  }

  componentWillMount () {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
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
      this.createTimingAnimation(this.titleSize, SMALL_TITLE_SIZE, 120, Easing.ease),
      this.createTimingAnimation(this.marginBottom, SMALL_TITLE_SIZE, 120, Easing.ease),
    ]).start();
  };

  _keyboardDidHide = (event) => {
    Animated.parallel([
      this.createTimingAnimation(this.titleSize, LARGE_TITLE_SIZE, 120, Easing.ease),
      this.createTimingAnimation(this.marginBottom, LARGE_TITLE_SIZE, 120, Easing.ease),
    ]).start();
  };

  createNewDeck() {
    // TODO: Dispatch action for adding a new deck
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Animated.Text
          style={[styles.title, {
            fontSize: this.titleSize,
            marginBottom: this.marginBottom,
            marginTop: this.marginBottom
          }]}>
          What is the title of your new deck ?
        </Animated.Text>
        <Animated.View style={{marginBottom: this.marginBottom}}>
          <TextInput
            style={styles.inputText}
            onChange={(text) => this.setState({text})}
            value={this.state.text}
            placeholder='Deck Title'
          />
        </Animated.View>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: this.state.text === '' ? 'gray' : 'black'}]}
          onPress={this.createNewDeck}
          disabled={this.state.text === ''}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
