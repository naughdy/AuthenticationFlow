import React, {Component} from 'react';
import {View, Text, Image, StyleSheet,BackHandler} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CommonActions } from '@react-navigation/native';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      firstTime:false
    };
    console.log(props);
  }

  componentWillMount() {
    this.getData();
  }
 
  backAction = () => {
    BackHandler.exitApp() 
  }

  componentDidMount(){
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }

  componentWillUnmount(){
    this.backHandler.remove();
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('name');
      const firstTime = await AsyncStorage.getItem('firstTime');

      if (value !== null) {
        console.log(value);
        this.setState({
          name: value,
          firstTime: firstTime
        });
      }
    } catch (e) {
      console.log('error in home async', e);
    }
  };

  signOut = async () => {
    console.log("props in signout",this.props)
    // this.props.navigation.navigate('Login');
    await AsyncStorage.setItem('isLoggedIn', 'false');

    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'Login',
          },
        ],
      })
    )
  };

  render() {
    return (
      <LinearGradient
        colors={['#4c669f', '#D9E4F5', '#ffffff']}
        style={{flex: 1}}>
        <Appbar.Header
          style={{
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
            width: 150,
            alignSelf: 'flex-end',
            paddingTop: 50,
          }}>
          <Appbar.Content
            onPress={() => this.signOut()}
            title="Logout"
            titleStyle={{
              fontSize: 20,
              alignSelf: 'flex-end',
            }}
          />
        </Appbar.Header>
        {this.state.firstTime=='true' && (
          <Image
            style={{
              width: 300,
              height: 300,
              alignSelf: 'center',
              marginTop: 40,
              borderRadius: 300 / 2,
            }}
            source={require('../../images/congo.gif')}></Image>
        )}
        <Text style={[styles.text, {marginTop: '30%'}]}>
          {' '}
          Hi, {this.state.name}
        </Text>
        <Text style={styles.text}>You are Logged in!</Text>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    alignSelf: 'center',
  },
});
export default Home;
