import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';


const styles = StyleSheet.create({
  onBoardingCircleStyles: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  titleTextStyle: {
    color: '#101010',
    fontSize: 30,
    fontWeight: '300',
    textAlign: 'center',
  },
  descriptionTextStyle: {
    color: '#101010',
    fontSize: 15,
    fontWeight: '300',
    textAlign: 'center',
    marginHorizontal: 10,
  }
});

export default [
  {
    backgroundColor: '#fff',
    image: <Image
      source={require('../assets/The_Pain_Timer.png')}
      style={styles.onBoardingCircleStyles}
    />,
    title: <Text style={styles.titleTextStyle}>WELCOME</Text>,
    subtitle: <Text style={styles.descriptionTextStyle}>welcome to the Pain Timer, the Timer made specifically to help you get done the stuff you don't want to do</Text>,
  },
  {
    backgroundColor: '#fff',
    image: <Image
      source={require('../assets/dice.png')}
      style={styles.onBoardingCircleStyles}
    />,
    title: <Text style={styles.titleTextStyle}>A GAME OF CHANCE</Text>,
    subtitle: <Text style={styles.descriptionTextStyle}>every minute you have a 1 in 30 chance of being done your work, sometimes you will work for less time, sometimes more</Text>,
  },
  {
    backgroundColor: '#fff',
    image:  <Ionicons name="ios-swap" size={200} />,
    title: <Text style={styles.titleTextStyle}>IMPROVE YOUR ODDS</Text>,
    subtitle: <Text style={styles.descriptionTextStyle}>change the likelyhood that you will be done every minute by scrolling left or right</Text>,
  },
  {
    backgroundColor: '#fff',
    image:   <Ionicons name="ios-checkmark-circle" size={200} />,
    title: <Text style={styles.titleTextStyle}>READY TO GO</Text>,
    subtitle: <Text style={styles.descriptionTextStyle}>press the checkmark in the bottom right corner to start using your Pain Timer</Text>,
  },
];
