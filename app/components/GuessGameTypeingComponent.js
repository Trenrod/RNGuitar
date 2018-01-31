import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';
import text from '../localisation/text';

class GuessGameTypeingComponent extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    let placeholder = this.props.answerPlaceholder;

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
          <TextInput
            style={styles.answerText}
            placeholder={placeholder}
            value={this.props.curAnswer}
            textAlign={'center'}
            onChangeText={(text) => { this.props.updateCurAnswer(text); }}
            onSubmitEditing={() => { this.props.setAnswer(); }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={() => { this.props.setAnswer(); }} underlayColor="white">
            <View style={styles.buttonView}>
              <Text style={styles.buttonText}>{text.check_answer}</Text>
            </View>
          </TouchableHighlight>
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
    alignItems:'stretch'
  },
  answerText: {
    fontSize: 60, 
    margin: 10
  },
  buttonContainer: {
    flex: 0,
    justifyContent:'flex-end',
    alignItems:'center'
  },
  buttonView: {
    backgroundColor: '#2196F3',
    flex: 0,
    alignItems:'center',
    margin: 10
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
})

export default GuessGameTypeingComponent;
