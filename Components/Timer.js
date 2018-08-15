import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import TimeLabel from './TimeLabel';
import Expo, { Font } from 'expo';


class Timer extends Component {
  getTimerText() {
    switch(this.props.timerState) {
    case 0:
      return `1/${this.props.chance}`;
    case 1:
      return `${this.props.minutesRunning}`;
    case 2:
      return `${this.props.minutesRunning}`;
    }
  }

  getTimeInterval(short) {
    var secondHalfOfWord = '.';
    if (this.props.completionInterval === 0) {
      if (!short) {
        secondHalfOfWord = 'OND';
      }
      return 'SEC' + secondHalfOfWord;
    }
    else {
      if (!short) {
        secondHalfOfWord = 'UTE';
      }
      return 'MIN' + secondHalfOfWord;
    }
  }
  getSubText() {
    switch(this.props.timerState) {
    case 0:
      return `CHANCE OF BEING DONE\nEVERY ${this.getTimeInterval(false)} ELAPSED`;
    case 1:
      return `${this.getTimeInterval(true)} ELAPSED`;
    case 2:
      return `${this.getTimeInterval(true)} OF WORK DONE`;
    }
  }

  render() {
    return(
      <View style={ styles.flexStyle }>
        <View style={styles.timeLabelPadding}>
          <TimeLabel
            minutesRunning={ this.props.minutesRunning }
            text={ this.getTimerText() }
            subText={ this.getSubText() }
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  flexStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  textStyle: {
    paddingTop: 30,
    color: '#101010',
    fontSize: 30,
    textAlign: 'center',
  },
  timeLabelPadding: {
    paddingBottom: 30,
  }
});

export default Timer;
