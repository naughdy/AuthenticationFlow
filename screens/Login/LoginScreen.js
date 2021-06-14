import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Tabs,
  Tab,
  TabHeading,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SignIn from './SignIn';
import SignUp from './SignUp';
const LoginScreen = (props) => {
  const [signUp, setSignUp] = useState(true);
  const [signIn, setSignIn] = useState(false);
  return (
    <Container>
      <Tabs
        tabBarPosition="bottom"
        onChangeTab={({i}) => {
          if (i === 0) {
            setSignUp(false);
            setSignIn(true);
          } else if (i === 1) {
            setSignIn(false);
            setSignUp(true);
          }
        }}
        initialPage={1}>
        <Tab
          style={{backgroundColor: 'rgba(255,0,0,0)'}}
          heading={
            <TabHeading style={styles.footerTab}>
              <Icon
                name="shoe-prints"
                size={signIn ? 25 : 15}
                style={[styles.icon, {color: signIn ? 'red' : 'black'}]}
              />
              <Text style={styles.text}>Sign In</Text>
            </TabHeading>
          }>
          <SignIn props={props} />
        </Tab>
        <Tab
          heading={
            <TabHeading style={styles.footerTab}>
              <Icon
                name="hands-helping"
                size={signUp ? 25 : 15}
                style={[styles.icon, {color: signUp ? 'red' : 'black'}]}
              />
              <Text style={styles.text}>Sign Up</Text>
            </TabHeading>
          }>
          <SignUp props={props} />
        </Tab>
      </Tabs>
      {/* </Footer> */}
    </Container>
  );
};
const styles = StyleSheet.create({
  footerTab: {
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,1)',
  },
  icon: {
    alignSelf: 'center',
  },
  tabView: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});
export default LoginScreen;
