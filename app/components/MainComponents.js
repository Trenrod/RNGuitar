import React, {
  Component
} from "react";

import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';

import MenuComponent from './MenuComponent';
import GuessGameComponent from './GuessGameComponent';

import GUESS_MODE from '../models/GuessModes';

class MainComponents extends Component {
  constructor(props) {
    super(props);
    this.selectGuessMode = this._selectGuessMode.bind(this);
    this.state = {
      guessMode: null
    };
  }

  _selectGuessMode(mode) {
    switch (mode) {
      case GUESS_MODE.NOTE_TYPE:
      case GUESS_MODE.NOTE_TIME:
      case GUESS_MODE.FRET_TIME:
      case GUESS_MODE.FRET_TYPE:
        this.setState({
          guessMode: mode
        });
        break;
      default:
        this.setState({
          guessMode: null
        });
        break;
    }
  }

  render() {
    let componentToDisplay = null;
    switch (this.state.guessMode) {
      case GUESS_MODE.NOTE_TYPE:
      case GUESS_MODE.FRET_TYPE:
        componentToDisplay = <GuessGameComponent mode={this.state.guessMode} gotoMenu={()=>this.selectGuessMode(null)}></GuessGameComponent>
        break;
      case GUESS_MODE.NOTE_TIME:
      case GUESS_MODE.FRET_TIME:
        componentToDisplay = <GuessGameComponent mode={this.state.guessMode} gotoMenu={()=>this.selectGuessMode(null)}></GuessGameComponent>
        break;
      default:
        componentToDisplay = <MenuComponent 
          guessNoteByTime={()=>this.selectGuessMode(GUESS_MODE.NOTE_TIME)}
          guessNoteByTyping={()=>this.selectGuessMode(GUESS_MODE.NOTE_TYPE)}
          guessFretByTime={()=>this.selectGuessMode(GUESS_MODE.FRET_TIME)}
          guessFretByTyping={()=>this.selectGuessMode(GUESS_MODE.FRET_TYPE)}
        ></MenuComponent>;
        break;
    }

    return (
      <View style={styles.container}>
        {componentToDisplay}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  }
});

export default MainComponents;
