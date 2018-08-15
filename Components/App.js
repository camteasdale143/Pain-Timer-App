import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import Expo, { Font } from 'expo';
import Onboarding from 'react-native-onboarding-swiper';
import MainPage from './MainPage';
import pages from '../assets/onboardingPages';

const SCREEN_HEIGHT = Dimensions.get(`window`).height;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasShownOnboarding: false,
      onboardingHeight: new Animated.Value(0),
    };
  }

  async toggleOnboarding() {
    await this.setState({
      hasShownOnboarding: !this.state.hasShownOnboarding
    });
  }

  showOnboarding() {
    var onboardingHeight = 0;
      if (this.state.hasShownOnboarding === false) {
        onboardingHeight = SCREEN_HEIGHT
      }
      Animated.timing(this.state.onboardingHeight, {
        toValue: onboardingHeight,
        duration: 750,
      }).start()
      return (
          <Animated.View style={{
              height: this.state.onboardingHeight,
            }}>
            <Onboarding
              pages={pages}
              onDone={() => this.toggleOnboarding()}
              onSkip={() => this.toggleOnboarding()}
            />
        </Animated.View>
      );
    }

  render() {
    return (
      <View style={styles.appContainerStyles}>
        {this.showOnboarding()}
        <MainPage />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainerStyles: {
    height: '100%',
  },
});
