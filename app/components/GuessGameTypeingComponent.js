import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

class GuessGameTypeingComponent extends Component {
  constructor(props) {
    super(props);

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
            value={this.props.curAnswer}
            textAlign={'center'}
            onChangeText={(text) => { this.props.updateCurAnswer(text); }}
            onSubmitEditing={() => { this.props.answer(); }}
          />
        </View>
        <View style={{flex: 0, justifyContent:'flex-end', alignItems:'center'}}>
          <TouchableHighlight onPress={() => { this.props.answer(); }} underlayColor="white">
            <View style={styles.buttonView}>
              <Text style={styles.buttonText}>Check answer</Text>
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
})

export default GuessGameTypeingComponent;
