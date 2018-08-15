import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

class Header extends Component {
  headerColor(blackout) {
    if (blackout) {
      return '#e0e0e0';
    }
    else {
      return '#111';
    }
  }
  render() {
    return(
      <View style={ styles.headerStyle }>
        <Text style={ [styles.textStyle, {color: this.headerColor(this.props.blackout)}] }>{this.props.headerText}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  headerStyle: {
    display: 'flex',
    alignItems: 'center',
    height: 90,
    // backgroundColor: '#e0e0e0',
    // shadowColor: '#000000',
    // shadowRadius: 10,
    // shadowOpacity: 0.5
  },
  textStyle: {
    paddingTop: 30,
    color: '#101010',
    fontSize: 30,
    fontWeight: '500',
    letterSpacing: 3,
  },
});

export default Header;
