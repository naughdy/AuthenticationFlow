import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, BackHandler} from 'react-native';
import {Button, TextInput, HelperText} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';

const SignIn = (props) => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordHelpText, setPasswordHelpText] = useState(false);
  const [usernameHelpText, setusernameHelpText] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [defaultUser, setDefaultUser] = useState('');
  const [defaultPass, setDefaultPass] = useState('');

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp() 
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
        backHandler.remove();
    }

  },[])

  const getData = async () => {
    try {
      const asyncUsername = await AsyncStorage.getItem('username');
      const asyncPassword = await AsyncStorage.getItem('password');
      await AsyncStorage.setItem('firstTime','false')
      if (username == asyncUsername && password == asyncPassword) {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        navigation.navigate("Drawer");
        setLoading(false);
    } else {
        setEmailError('or password is incorrect');
        setusernameHelpText(true);
        setLoading(false);

      }
    } catch (e) {
      console.log('error in app.js async', e);
    }
  };


  const verifyUser = async () => {
    setLoading(true);

    if (password == '' || username == '') {
      if (password == '') {
        setPasswordError('is Empty');
        setPasswordHelpText(true);
        setLoading(false);
      }
      if (username == '') {
        setEmailError('is Empty');
        setusernameHelpText(true);
        setLoading(false);
      }
    }
    if (password != '' && username != '') {
      setLoading(true);
      setPasswordHelpText(false);
      setusernameHelpText(false);
      getData()
    }
  };

  const ErrorTextComponent = () => {
    return (
      <HelperText
        type="error"
        visible={passwordHelpText}
        style={{marginLeft: 10}}>
        Password {passwordError}
      </HelperText>
    );
  };

  const showPasswordFunc = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#D9E4F5', '#ffffff']}
      style={{width: '100%', height: '100%'}}>
      <ScrollView>
        <View style={{margin: 20, marginTop: '40%'}}>
          <Text style={{color: 'white', alignSelf: 'center', fontSize: 40}}>
            {' '}
            Sign In{' '}
          </Text>
        </View>
        <View style={{margin: 20, marginTop: 0}}>
          <View>
            <TextInput
              label="Email Id *"
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
            <ErrorTextComponent />
          </View>
          <Button
            loading={loading}
            onPress={() => verifyUser()}
            style={styles.loginButton}>
            <Text style={styles.text}>Sign In</Text>
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

export default SignIn;
