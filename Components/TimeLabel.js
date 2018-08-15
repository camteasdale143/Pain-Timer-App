import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class TimeLabel extends Component {
  render() {
    return (
      <View style={ styles.flexStyle }>
        <Text style={ styles.timeStyle }>{this.props.text}</Text>
        <Text style={ styles.subTextStyle }>{this.props.subText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexStyle: {
    display: 'flex',
    alignItems: 'center',

  },
  timeStyle: {
    color: '#101010',
    fontSize: 100,
    fontWeight: '300',
    letterSpacing: 15,
    marginBottom: -20,
    textAlign: 'center',
  },
  subTextStyle: {
    paddingTop: 30,
    color: '#101010',
    fontSize: 15,
    fontWeight: '300',
    letterSpacing: 3,
    textAlign: 'center'
  },
});

export default TimeLabel;
