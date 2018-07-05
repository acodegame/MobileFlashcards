import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import DeckList from './screens/DeckList';
import DeckView from './components/DeckView';
import NewDeck from './screens/NewDeck';
import AddCard from './components/AddCard';
import QuizView from './components/QuizView';
import { purple, white } from './utils/colors';
import { scaleDP } from './utils/helpers';
import { Constants } from 'expo';

function FlashcardsStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    height: 56,
    backgroundColor: Platform.OS === 'ios' ? white : purple,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  },
  stackHeader: {
    height: 56,
    backgroundColor: Platform.OS === 'ios' ? white : purple,
    marginTop: -24,
  }
});

const Tabs = createMaterialTopTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: styles.headerStyle
  }
});

function stackNavigationOptions(header) {
  const headerStyles = {
    title: header,
    headerStyle: styles.stackHeader,
    headerTitleStyle: {
      color: Platform.OS === 'ios' ? purple : white,
    },
    headerTintColor: Platform.OS === 'ios' ? purple : white,
  }
  return headerStyles;
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: ({navigation}) =>({
        header: null,
      }),
    },
    DeckView: {
      screen: DeckView,
      navigationOptions: ({navigation}) => stackNavigationOptions(navigation.state.params.title),
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: ({navigation}) => stackNavigationOptions('Add Card'),
    },
    QuizView: {
      screen: QuizView,
      navigationOptions: ({navigation}) => stackNavigationOptions('Quiz'),
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <FlashcardsStatusBar backgroundColor={purple} barStyle='light-content' />
          <RootStack />
        </View>
      </Provider>
    );
  }
}
