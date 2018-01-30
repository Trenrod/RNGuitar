import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableHighlight
} from 'react-native';

class MenuComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Auswahl des typs</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonView}>
            <TouchableHighlight onPress={this.props.guessNoteByTime} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>Guess note by typing</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonView}>
            <TouchableHighlight onPress={this.props.guessFretByTyping} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>Guess fret by typing</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonView}>
            <TouchableHighlight onPress={this.props.guessNoteByTime} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>Guess note by time</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonView}>
            <TouchableHighlight onPress={this.props.guessFretByTyping} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>Guess fret by typing</Text>
              </View>
            </TouchableHighlight>
          </View>
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
  title: {
    flex: 0,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    margin: 30
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    margin: 10
  },
  buttonView: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 10,
    marginLeft: 50,
    marginRight: 50
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});

export default MenuComponent;
