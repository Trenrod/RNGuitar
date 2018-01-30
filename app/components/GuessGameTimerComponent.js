import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Slider
} from 'react-native';

class GuessGameTimerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 0,
      maxTime: 30,
      result: ""
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
        result: ""
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
    this.props.answer();
    this.setTimeout(this.tick, 1000);
  }

  _setResult() {
    this.setState({
      timeLeft: 0,
      result: this.props.task.note
    });
    this.newGuessTask();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.guessContainer}>
          <View style={{flex:0, alignItems: 'center'}}>
            <Text>String</Text>
            <Text style={styles.guessText}>{this.props.task.string}</Text>
          </View>
          <View style={{flex:0, alignItems: 'center'}}>
            <Text>Fret</Text>
            <Text style={styles.guessText}>{this.props.task.fret}</Text>
          </View>
        </View>
        <View style={{flex: 0, alignItems:'stretch', backgroundColor: this.props.backgroundColor}}>
          <TextInput
            style={{fontSize: 60, margin: 10}}
            placeholder="Note"
            value={this.state.result}
            textAlign={'center'}
            onChangeText={(text) => { this.props.updateCurAnswer(text); }}
            onSubmitEditing={() => { this.props.answer(); }}
          />
        </View>
        <View style={{flex: 0, alignItems:'center', margin: 10}}>
          <Text style={{fontSize: 30}}>Time left: {this.state.maxTime - this.state.timeLeft}</Text>
        </View>
        <View style={{flex: 0, justifyContent:'flex-end', alignItems:'stretch', margin: 10}}>
          <Text style={{fontSize: 30}}>Time to guess: {this.state.maxTime}</Text>
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
  guessText: {
    fontWeight: 'bold',
    fontSize: 40
  },
  buttonView: {
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});

export default GuessGameTimerComponent;
