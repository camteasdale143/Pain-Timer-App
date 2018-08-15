import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

class StartButton extends Component {

  render() {
    const buttonInfo = this.props.buttonInfo;
    if (buttonInfo.buttonText !== '') {
      return(
        <View style={ styles.flexStyle }>
          <TouchableOpacity style={ [styles.defaultButtonStyle, this.props.buttonStyle] } onPress={buttonInfo.onPressFunction() }>
            <Text style={ [styles.textStyle, this.props.textStyle] }>{ buttonInfo.buttonText }</Text>
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return(
        <View style={[this.props.style, {backgroundColor: 'transparent',
          borderRadius: 10,
          paddingRight: 20,
          paddingLeft: 20,
          paddingTop: 15,
          paddingBottom: 15,
          shadowOpacity: 0,
        }]}>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  flexStyle: {
    display: 'flex',
    alignItems: 'center'
  },
  defaultButtonStyle: {
    backgroundColor: '#222',
    borderRadius: 10,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.5,
    marginBottom: 30,
    width: '50%',
    display: 'flex',
    alignItems: 'center'
  },
  textStyle: {
    color: '#fff',
    fontWeight: '800',
    letterSpacing: 3
  },
});

export default StartButton;
