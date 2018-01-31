import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableHighlight
} from 'react-native';
import GuessModes from '../models/GuessModes';
import GuessModeTitles from '../models/GuessModeTitles';
import text from '../localisation/text';
import PropTypes from 'prop-types';

class MenuComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{text.select_mode_title}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonView}>
            <TouchableHighlight onPress={()=>{this.props.selectGuessMode(GuessModes.NOTE_TIME)}} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>{GuessModeTitles.NOTE_TIME}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonView}>
            <TouchableHighlight onPress={()=>{this.props.selectGuessMode(GuessModes.NOTE_TYPE)}} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>{GuessModeTitles.NOTE_TYPE}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonView}>
            <TouchableHighlight onPress={()=>{this.props.selectGuessMode(GuessModes.FRET_TIME)}} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>{GuessModeTitles.FRET_TIME}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonView}>
            <TouchableHighlight onPress={()=>{this.props.selectGuessMode(GuessModes.FRET_TYPE)}} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>{GuessModeTitles.FRET_TYPE}</Text>
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
  titleView: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 50
  },
  title: {
    flex: 0,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    fontSize: 30
  },
  buttonsContainer: {
    flex: 0,
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

MenuComponent.propTypes = {
  selectGuessMode: PropTypes.func
}

export default MenuComponent;
