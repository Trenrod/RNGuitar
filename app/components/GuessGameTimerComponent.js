import React, {Component, ReactPropTypes} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Slider
} from 'react-native';
import text from '../localisation/text';
import GuessMode from '../models/GuessModes';
import PropTypes from 'prop-types';

class GuessGameTimerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 0,
      maxTime: 30,
      result: this.props.answerPlaceholder
    };
    this.curTimer = null;
    this.setResult = this._setResult.bind(this);
    this.tick = this._tick.bind(this);
    this.newGuessTask = this._newGuessTask.bind(this);
    this.changeMaxTime = this._changeMaxTime.bind(this);
    this.setTimeout = this._setTimeout.bind(this);
  }

  componentDidMount() {
    this.curTimer = this.setTimeout(this.tick, 1000);
  }

  componentWillUnmount() {
    if (this.curTimer != null) {
      clearTimeout(this.curTimer);
    }
  }

  _setTimeout(fnk, time) {
    if (this.curTimer != null) {
      clearTimeout(this.curTimer);
    }
    this.curTimer = setTimeout(fnk, time);
  }

  _tick() {
    if (this.state.timeLeft >= this.state.maxTime) {
      this.setResult();
    } else {
      this.setState({
        timeLeft: this.state.timeLeft + 1,
        result: this.props.answerPlaceholder
      });
      this.setTimeout(this.tick, 1000);
    }
  }

  _changeMaxTime(value) {
    this.setState({
      maxTime: value,
      timeLeft: 0
    });
  }

  _newGuessTask() {
    this.props.setAnswer();
    this.setTimeout(this.tick, 1000);
  }

  _setResult() {
    let result = this.props.task.note;
    if (this.props.mode === GuessMode.FRET_TIME) {
      result = this.props.task.fret;
    }
    this.setState({
      timeLeft: 0,
      result: result
    });
    this.newGuessTask();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.guessContainer}>
          <View style={styles.guessPartContainer}>
            <Text>{this.props.guessFields.leftTitle}</Text>
            <Text style={styles.guessText}>{this.props.guessFields.leftValue}</Text>
          </View>
          <View style={styles.guessPartContainer}>
            <Text>{this.props.guessFields.rightTitle}</Text>
            <Text style={styles.guessText}>{this.props.guessFields.rightValue}</Text>
          </View>
        </View>
        <View style={[styles.answerView, {backgroundColor: this.props.backgroundColor}]}>
          <Text
            style={styles.answerText}
            textAlign={'center'}
            editable={false}
          >{this.state.result}</Text>
        </View>
        <View style={styles.counterView}>
          <Text style={styles.counterText}>{text.time_left} {this.state.maxTime - this.state.timeLeft}</Text>
        </View>
        <View style={styles.sliderView}>
          <Text style={styles.sliderText}>{text.time_to_guess} {this.state.maxTime}</Text>
          <Slider
            minimumValue={1}
            maximumValue={120}
            step={1}
            onValueChange={(value) => {this.changeMaxTime(value);}}
            value={this.state.maxTime}
          ></Slider>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0
  },
  guessContainer: {
    flex:0,
    flexDirection:'row',
    justifyContent: 'space-around'
  },
  guessPartContainer: {
    flex:0,
    alignItems: 'center'
  },
  guessText: {
    fontWeight: 'bold',
    fontSize: 40
  },
  answerView: {
    flex: 0,
    alignItems:'center'
  },
  answerText: {
    fontSize: 60, 
    margin: 10
  },
  counterView: {
    flex: 0,
    alignItems:'center',
    margin: 10
  },
  counterText: {
    fontSize: 30
  },
  sliderView: {
    flex: 0,
    justifyContent:'flex-end',
    alignItems:'stretch',
    margin: 10
  },
  sliderText: {
    fontSize: 20
  }
});

export default GuessGameTimerComponent;
