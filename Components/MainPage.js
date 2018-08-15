import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  ScrollView,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Vibration,
  Animation,
} from 'react-native';
import Header from './Header';
import Timer from './Timer';
import TimerButton from './CRNCButton';
import Expo, { Font } from 'expo';



const chime = new Expo.Audio.Sound();

const timerState = {
  waiting: 0,
  running: 1,
  over: 2,
  paused: 3,
};

const completionInterval = {
  seconds: 0,
  minutes: 1,
}

const SCREEN_HEIGHT = Dimensions.get(`window`).height;


const INITIAL_STATE = {
  timerState: timerState.waiting,
  minutesRunning: 0,
  lastRandomNumber: 0,
  painTimer: null,
  canScroll: true,
};

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      chance: 30,
      fontLoaded: false,
      completionInterval: completionInterval.minutes,
      blackout: false,
      buttonOpacity: new Animated.Value(1),
      buttonsShowing: true,
    };


    chime.loadAsync(require('../assets/chime.mp3'));

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this.handlePan(gesture);
      },
      onPanResponderGrant: (event, gesture) => {
        if (this.state.timerState === timerState.running) {
          this.onTapwhileTimerRunning();
            clearTimeout(this.buttonHideTimeout);
            this.buttonHideTimeout = setTimeout(() => {
            if (this.state.timerState === timerState.running) {
              this.hideButtons();
            }
          }, 3000);
        }
      },
      onPanResponderRelease: (event, gesture) => {
        this.handlePanFinish();
      },
      onPanResponderTerminate: (event, gesture) => {
        this.handlePanFinish
      }
    })
    this.panResponder = panResponder;
    this.swipeDistance = 0;
    this.buttonHideTimeout = null;
    this.repeatEndNotificationTimer = null;
  }

  handlePan(gesture) {
    var threshold = 0.5;
    if (this.state.timerState == timerState.waiting) {
      this.swipeDistance += gesture.vx
      while (this.swipeDistance > threshold) {
        this.swipeDistance -= threshold;
        this.setState({
          chance: this.state.chance + 1,
          canScroll: false,
        })
      }

      while (this.swipeDistance < -threshold && this.state.chance > 2) {
        this.swipeDistance += threshold
        this.setState({
          chance: this.state.chance - 1,
          canScroll: false
        })
      }
    }
  }

  handlePanFinish() {
    this.setState({
      canScroll: true,
    })
  }

  async playsound() {
    try {
      await chime.replayAsync();
      // Your sound is playing!
    } catch (error) {
      alert(error)
    }
  }


  async startTimer() {
    this.playsound();
    await this.setState({
      timerState: timerState.running,
      painTimer: setInterval(this.cycle.bind(this), 1000 + 59000 * this.state.completionInterval)
    });
    this.showButtons();

    await this.refs.scrollView.scrollTo({x:0, y:0, animate: true}); // will scroll to the top at y-position 0
    clearTimeout(this.buttonHideTimeout);
    this.buttonHideTimeout = setTimeout(() => {
    if (this.state.timerState === timerState.running) {
      this.hideButtons();
    }
  }, 3000);
  }

  cycle() {
    const randomNumber = rng(this.state.chance);
    if (randomNumber === 0 && this.state.minutesRunning > 0) {
      this.endTimer();
      this.setState({
        lastRandomNumber: randomNumber
      });
    }
    else {
      this.setState({
        minutesRunning: this.state.minutesRunning + 1,
        lastRandomNumber: randomNumber,
      });
      //Make a sound
    }
  }

 endTimer() {
    this.setState({
      timerState: timerState.over,
      painTimer: clearInterval(this.state.painTimer),
    });
    this.repeatEndNotificationTimer = setInterval(this.endNotification.bind(this), 5000)
    this.endNotification();
    this.showButtons()
  }

  endNotification() {
    Vibration.vibrate(1000);
    this.playsound();
  }

  hideButtons() {
    Animated.spring(this.state.buttonOpacity, {
      toValue: 0,
    }).start()
    this.setState({
      buttonsShowing: false
    })
  }

  showButtons() {
    Animated.spring(this.state.buttonOpacity, {
      toValue: 1,
    }).start()
    this.setState({
      buttonsShowing: true
    })
  }

  onTapwhileTimerRunning() {
    if (!this.state.buttonsShowing) {
      this.showButtons();
      this.setState({
        buttonsShowing: true
      })
    }
    else {
      this.hideButtons();
      this.setState({
        buttonsShowing: false
      })
    }
  }

  resetTimer() {
    this.setState(INITIAL_STATE);
    clearInterval(this.repeatEndNotificationTimer);
  }

  getHeaderText() {
    switch(this.state.timerState) {
    case timerState.waiting:
      return ' ';
    case timerState.running:
      return 'WORKING';
    case timerState.over:
      return '';
    }
  }

  switchCompletionInterval() {
    var newCompletionInterval;
    if (this.state.completionInterval == completionInterval.seconds) {
      newCompletionInterval = completionInterval.minutes;
    }
    else {
      newCompletionInterval = completionInterval.seconds;
    }

    this.setState({
      completionInterval: newCompletionInterval
    })
  }

  getCompletionIntervalButtonText() {
    switch(this.state.completionInterval) {
      case completionInterval.seconds:
        return 'SECONDS';
      case completionInterval.minutes:
        return 'MINUTES';
      default:
        return 'SOMTHIING WRONG';
    };
  }

  getScrollViewBackgroundColor() {
    if (this.state.blackout && this.state.timerState === timerState.running) {
      return '#111';
    }
    else {
      return '#fff';
    }
  }

   toggleBlackout() {
   this.setState({
      blackout: !this.state.blackout
    })
  }

  componentWillUpdate() {
    // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    // LayoutAnimation.spring()
  }

   buttonInfoIndex(determiningState) {
    var buttonInfo;
    switch(determiningState) {
      case 0:
        buttonInfo = {
          onPressFunction: () => this.startTimer.bind(this),
          buttonText: 'START',
        }
        break;
      case 1:
        buttonInfo = {
          onPressFunction: () => this.endTimer.bind(this),
          buttonText: 'STOP'
        }
        break;
      case 2:
        buttonInfo = {
          onPressFunction: () => this.resetTimer.bind(this),
          buttonText: 'RESET'
        }
        break;
      default:
        buttonInfo = {
          onPressFunction: () => {},
          buttonText: 'NOTHING'
        }
        break;
    }
    if (!this.state.buttonsShowing && this.state.timerState === timerState.running) {
      buttonInfo.onPressFunction = () => {}
    }
    return buttonInfo
  }

  timeIntervalInfoIndex(determiningState) {
    var buttonInfo
    switch(determiningState) {
      case 0:
        buttonInfo = {
          onPressFunction: () => this.switchCompletionInterval.bind(this),
          buttonText: this.getCompletionIntervalButtonText(),
        }
        break;
      case 1:
        buttonInfo = {
          onPressFunction: () => this.toggleBlackout.bind(this) ,
          buttonText: 'BLACKOUT',
        }
        break;
      default:
        buttonInfo = {
          onPressFunction: () => {},
          buttonText: ''
        }
        break;
    }
    if (!this.state.buttonsShowing && this.state.timerState === timerState.running) {
      buttonInfo.onPressFunction = () => {}
    }
    return buttonInfo

  }


  render() {
    return (
      <ScrollView
        style={
          {backgroundColor: this.getScrollViewBackgroundColor()}
        }
        ref="scrollView" scrollEnabled={this.state.canScroll}>
        <View style={[styles.container, {backgroundColor: this.getScrollViewBackgroundColor()}]}{ ...this.panResponder.panHandlers }>
          <Header
            headerText={this.getHeaderText()}
            blackout={this.state.blackout}
            />
          <Timer
            timerState={this.state.timerState}
            chance={this.state.chance}
            minutesRunning={this.state.minutesRunning}
            completionInterval={this.state.completionInterval}
          />

        <Animated.View
          style={{opacity: this.state.buttonOpacity}}>
            <TimerButton
              key='TIME INTERVAL BUTTON'
              buttonInfo= {this.timeIntervalInfoIndex(this.state.timerState)}
              buttonStyle={styles.timeIntervalButtonStyle}
              textStyle={[styles.timeIntervalTextStyle]}
            />
            <TimerButton
              key='TIMER STATE BUTTON'
              buttonInfo= {this.buttonInfoIndex(this.state.timerState)}
              parentDeterminingState={ this.state.timerState }
            />

          </Animated.View>
        </View>
      </ScrollView>
    );
  }
}

//, {marginTop: this.state.buttonOpacity.interpolate({
//   inputRange: [0,1],
//   outputRange: [0, 20]
// })}

function rng(to) {
  return Math.floor(Math.random() * to);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    height: SCREEN_HEIGHT
  },
  timeIntervalButtonStyle: {
    backgroundColor: '#eee',
    width: '40%',
    marginBottom: 20
  },
  timeIntervalTextStyle: {
    color: '#333',
  }


});
