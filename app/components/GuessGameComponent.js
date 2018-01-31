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

import GuessModeTitles from '../models/GuessModeTitles';

import text from '../localisation/text';

class GuessGameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: GenerateTask(),
      curAnswer: "",
      backgroundColor: '#FFF'
    }
    this.mode = this.props.mode;
    this.setAnswer = this._setAnswer.bind(this);
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

  _setAnswer() {
    if (this.mode === GUESS_MODES.FRET_TYPE) {
      if (this.state.curAnswer.toLowerCase() === this.state.task.fret.toLowerCase()) {
        return this.correctAnswer();
      }
    } else if (this.mode === GUESS_MODES.NOTE_TYPE) {
      if (this.state.curAnswer.toLowerCase() === this.state.task.note.toLowerCase()) {
        return this.correctAnswer();
      }
    } else {
      return this.correctAnswer();
    }
    return this.wrongAnswer();
  }

  render() {
    let answerPlaceholder = text.guitar_note;
    let guessFields = {
      leftTitle: text.guitar_string,
      leftValue: this.state.task.string
    };
    if (this.mode === GUESS_MODES.FRET_TIME || this.mode === GUESS_MODES.FRET_TYPE) {
      guessFields.rightTitle =text.guitar_note;
      guessFields.rightValue = this.state.task.note;
      answerPlaceholder = text.guitar_fret;
    } else {
      guessFields.rightTitle =text.guitar_fret;
      guessFields.rightValue = this.state.task.fret;
    }

    let interComponent = null;
    if (this.mode === GUESS_MODES.FRET_TIME || this.mode === GUESS_MODES.NOTE_TIME) {
      interComponent = <GuessGameTimerComponent
        task={this.state.task}
        curAnswer={this.state.curAnswer}
        backgroundColor={this.state.backgroundColor}
        updateCurAnswer={this.updateCurAnswer}
        setAnswer={this.setAnswer}
        guessFields={guessFields}
        answerPlaceholder={answerPlaceholder}
      />
    } else {
      interComponent = <GuessGameTypeingComponent
        task={this.state.task}
        curAnswer={this.state.curAnswer}
        backgroundColor={this.state.backgroundColor}
        updateCurAnswer={this.updateCurAnswer}
        setAnswer={this.setAnswer}
        guessFields={guessFields}
        answerPlaceholder={answerPlaceholder}
      />
    }

    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{GuessModeTitles[this.mode]}</Text>
        </View>
        {interComponent}
        <View style={styles.buttonBack}>
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
    fontSize: 30
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
  },
  buttonBack: {
    flex: 1,
    justifyContent:'flex-end'
  }
})

export default GuessGameComponent;
