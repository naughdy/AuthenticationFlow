import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
      this.getData()
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn');
      if (value !== null) {
        if (value == 'true') {
          this.props.navigation.navigate("Drawer");
          // setInitialRoute('Drawer');
        } else {
          // setInitialRoute('Login');
          this.props.navigation.navigate("Login");

        }
      } else {
        this.props.navigation.navigate("Login");
        // setInitialRoute('Login');
      }
    } catch (e) {
      console.log('error in app.js async', e);
    }
  };
  render() {
    return (
        <LinearGradient
        colors={['#4c669f', '#D9E4F5', '#ffffff']}
        style={{width: '100%', height: '100%',justifyContent:'center'}}>
    
    <Image
              style={{
                width: 300,
                height: 300,
                alignSelf: 'center',
                marginTop: 40,
                borderRadius: 300 / 2,
              }}
              source={require('../images/loading.gif')}></Image>
        </LinearGradient>
    );
  }
}

export default Loading;
