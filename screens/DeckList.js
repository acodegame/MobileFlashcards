import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getDecks } from '../utils/api';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import Deck from '../components/subs/Deck';

class DeckList extends Component {
  state = {
    results: ''
  }
  componentWillMount() {
    getDecks().then(results => {
      this.props.dispatch(receiveDecks(results));
      this.setState({ results });
    });
  }

  render() {
    const { results } = this.props
    return (
      <View>
        <FlatList
          data={Object.keys(results).map(key => results[key])}
          renderItem={({item, seperators}) =>
            <Deck
              item={item}
              seperators={seperators}
              openDeckView={() => this.props.navigation.navigate('DeckView', item)}/>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return ({
    ...props,
    results: state,
  })
}

export default connect(mapStateToProps)(DeckList)
