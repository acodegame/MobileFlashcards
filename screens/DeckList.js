import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { getDecks } from '../utils/api';

export default class DeckList extends Component {
  state = {
    results: ''
  }
  componentWillMount() {
    getDecks().then(results => this.setState({ results }));
  }
  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.state.results)}</Text>
      </View>
    )
  }
}
