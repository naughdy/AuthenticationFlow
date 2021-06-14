import React, { Component } from 'react';
import { View, Text, BackHandler, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  backAction = () => {
    this.props.navigation.navigate("Drawer") 
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

  render() {
    return (
        <LinearGradient
        colors={['#4c669f', '#D9E4F5', '#ffffff']}
        style={{width: '100%', height: '100%',justifyContent:'center'}}>
             <Text style={[styles.text, {marginTop: '30%'}]}>
                 About Us
        </Text>
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
export default AboutUs;
