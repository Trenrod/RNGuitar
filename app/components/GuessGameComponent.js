import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { GenerateTask } from '../lib/TaskGenerator'
import GUESS_MODES from '../models/GuessModes';
import GuessGameTypeingComponent from './GuessGameTypeingComponent';
import GuessGameTimerComponent from './GuessGameTimerComponent';

class GuessGameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: GenerateTask(),
      curAnswer: "",
      backgroundColor: '#FFF'
    }
    this.mode = this.props.mode;
    this.answer = this._answer.bind(this);
    this.timeout = null;

    this.updateCurAnswer = this._updateCurAnswer.bind(this);
    this.correctAnswer = this._correctAnswer.bind(this);
    this.wrongAnswer = this._wrongAnswer.bind(this);
  }

  _componentWillUnmount() {
    if (this.timeout != null) {
      clearTimeout(this.timeout);
    }
  }

  _updateCurAnswer(curAnswer) {
    this.setState({
      curAnswer: curAnswer
    });
  }

  _correctAnswer() {
    console.log('Correct answer');
    this.setState({
      backgroundColor: '#0F0'
    });
    if (this.timeout != null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.setState({
        backgroundColor: '#FFF',
        task: GenerateTask(),
        curAnswer: ""
      })
    }, 1000);
  }

  _wrongAnswer() {
    console.log('Wrong answer');
    this.setState({
      backgroundColor: '#F00'
    });
    if (this.timeout != null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.setState({
        backgroundColor: '#FFF'
      })
    }, 1000);
  }

  _answer() {
    if (this.mode === GUESS_MODES.FRET_TYPE) {
      if (this.state.curAnswer.toLowerCase() === this.state.task.fret.toLowerCase()) {
        return this.correctAnswer();
      }
    } else if (this.mode === GUESS_MODES.FRET_TIME || this.mode === GUESS_MODES.NOTE_TIME) {
      return this.correctAnswer();
    } else {
      if (this.state.curAnswer.toLowerCase() === this.state.task.note.toLowerCase()) {
        return this.correctAnswer();
      }
    }
    return this.wrongAnswer();
  }

  render() {
    // TODO: Handle Mode, typing, timeout note and fret
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Guess note by string and fret</Text>
        </View>
        <GuessGameTimerComponent
          task={this.state.task}
          curAnswer={this.state.curAnswer}
          backgroundColor={this.state.backgroundColor}
          updateCurAnswer={this.updateCurAnswer}
          answer={this.answer}
        />
        <View style={{flex: 1, justifyContent:'flex-end'}}>
          <TouchableHighlight onPress={this.props.gotoMenu} underlayColor="white">
            <View style={styles.buttonView}>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  titleView: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 50
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  guessContainer: {
    flex:0,
    flexDirection:'row',
    justifyContent: 'space-around'
  },
  guessText: {
    fontWeight: 'bold',
    fontSize: 60
  },
  buttonView: {
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
})

export default GuessGameComponent;
