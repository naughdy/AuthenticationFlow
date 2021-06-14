import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, ScrollView, BackHandler } from 'react-native';
import {Button, TextInput, HelperText, Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import StateCity from './StateCity';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
const SignUp = (props) => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [numberError, setNumberError] = useState('');
  const [numberHelpText, setNumberHelpText] = useState(false);
  const [nameHelpText, setNameHelpText] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordHelpText, setPasswordHelpText] = useState(false);
  const [usernameHelpText, setusernameHelpText] = useState(false);
  const [confirmHelpText, setConfirmHelpText] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  console.log(props);
  var reMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var mobile = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/g;

  const showPasswordFunc = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp() 
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();

  },[])
  const verifyUser = async () => {
    setLoading(true);

    if (password == '' || username == '' || confirmPassword != password) {
      setLoading(false);
      if (password == '') {
        setPasswordError('is Empty');
        setPasswordHelpText(true);
      }
      if (username == '') {
        setEmailError('is Empty');
        setusernameHelpText(true);
      }
      if (confirmPassword != password) {
        setConfirmError(`doesn't match`);
        setConfirmHelpText(true);
      }
      if (number == '') {
        setNumberError('is empty');
        setNumberHelpText(true);
      }
      if (name == '') {
        setNameHelpText(true);
      }
    } else if (
      reMail.test(username) === false ||
      mobile.test(number) === false
    ) {
      setPasswordHelpText(false);
      setusernameHelpText(false);
      setConfirmHelpText(false);
      setNumberHelpText(false);
      if (reMail.test(username) === false) {
        console.log('not a valid email');
        setEmailError('is not valid');
        setusernameHelpText(true);
        setLoading(false);
      }
      if (mobile.test(number) === false) {
        setNumberError('not valid');
        setNumberHelpText(true);
        setLoading(false);
      }
    } else {
      setPasswordHelpText(false);
      setusernameHelpText(false);
      setConfirmHelpText(false);
      setNumberHelpText(false);
      setusernameHelpText(false);
      setNumberHelpText(false);
      setLoading(true);

      try {
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('isLoggedIn', 'true');
      } catch (e) {
        console.log('async error-->', e);
      }
      setPasswordHelpText(false);
      setusernameHelpText(false);
      setConfirmHelpText(false);
      setNumberHelpText(false);
      setLoading(false);
      await AsyncStorage.setItem('firstTime','true')
      navigation.navigate('Drawer');
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#D9E4F5', '#ffffff']}
      style={{justifyContent: 'center'}}>
      <ScrollView>
        <View style={{margin: 20, marginTop: '40%'}}>
          <Text style={{color: 'white', alignSelf: 'center', fontSize: 40}}>
            {' '}
            Sign Up{' '}
          </Text>
        </View>
        <View style={{margin: 20, marginTop: 0}}>
          <View>
            <TextInput
              label="Full Name *"
              value={name}
              onChangeText={(text) => setName(text)}
              autoCapitalize="none"
              style={styles.textInput}
              theme={{
                colors: {primary: 'green', underlineColor: 'transparent'},
              }}></TextInput>
            <HelperText
              type="error"
              visible={nameHelpText}
              style={{marginLeft: 10}}>
              Name Empty
            </HelperText>
          </View>
          <View>
            <TextInput
              label="Email Id (Username) *"
              value={username.trim()}
              onChangeText={(text) => setUsername(text)}
              autoCapitalize="none"
              style={styles.textInput}
              theme={{
                colors: {primary: 'green', underlineColor: 'transparent'},
              }}></TextInput>
            <HelperText
              type="error"
              visible={usernameHelpText}
              style={{marginLeft: 10}}>
              Email address {emailError}
            </HelperText>
          </View>
          <View>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                label="Password *"
                value={password.trim()}
                onChangeText={(text) => setPassword(text)}
                style={[styles.textInput, {flex: 3}]}
                secureTextEntry={!showPassword}
                theme={{
                  colors: {primary: 'green', underlineColor: 'transparent'},
                }}></TextInput>
              <Button
                onPress={showPasswordFunc}
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 15,
                }}>
                <Icon
                  name={showPassword ? 'eye-slash' : 'eye'}
                  style={{alignSelf: 'center'}}></Icon>
              </Button>
            </View>
            <HelperText
              type="error"
              visible={passwordHelpText}
              style={{marginLeft: 10}}>
              Password {passwordError}
            </HelperText>
          </View>
          <View>
            <TextInput
              label="Confirm Password *"
              value={confirmPassword.trim()}
              onChangeText={(text) => setConfirmPassword(text)}
              style={styles.textInput}
              secureTextEntry={true}
              theme={{
                colors: {primary: 'green', underlineColor: 'transparent'},
              }}></TextInput>
            <HelperText
              type="error"
              visible={confirmHelpText}
              style={{marginLeft: 10}}>
              Password {confirmError}
            </HelperText>
          </View>
          <View>
            <TextInput
              label="Mobile Number *"
              value={number.replace(/[^0-9]/g, '')}
              onChangeText={(text) => setNumber(text)}
              keyboardType="numeric"
              maxLength={10}
              style={styles.textInput}
              theme={{
                colors: {primary: 'green', underlineColor: 'transparent'},
              }}></TextInput>
            <HelperText
              type="error"
              visible={numberHelpText}
              style={{marginLeft: 10}}>
              Phone Number {numberError}
            </HelperText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#C0C0C0',
              marginLeft: 10,
              marginRight: 10,
            }}>
            <StateCity></StateCity>
          </View>
          <Button
            loading={loading}
            onPress={() => verifyUser()}
            style={styles.loginButton}>
            <Text style={styles.text}>Sign Up</Text>
          </Button>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    width: '100%',
    backgroundColor: 'black',
    margin: 5,
    marginTop: 30,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  },
  textInput: {
    backgroundColor: 'rgba(0,0,0,0)',
    margin: 10,
    height: 50,
  },
});

export default SignUp;
