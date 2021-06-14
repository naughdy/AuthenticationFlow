import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, StatusBar, BackHandler, Image } from 'react-native';
import Login from './screens/Login/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home/Home';
import AboutUs from './screens/Home/AboutUs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Loading from './screens/Loading'
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();




function App() {
  const [initialRoute, setInitialRoute] = useState('Loading');
 

  function DrawerHome(){
    return( <Drawer.Navigator initialRouteName="Home">
     <Drawer.Screen name="Home" component={Home} />
     <Drawer.Screen name="AboutUs" component={AboutUs} />
   </Drawer.Navigator>
    )
   }
  

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
        <Stack.Navigator initialRouteName={initialRoute} headerMode="none">
        {/* {initialRoute == 'Login' ? ( */}
            <>
            <Stack.Screen name="Loading" component={Loading}/>
            <Stack.Screen name="Login" component={Login} />
            {/* <Stack.Screen name="Drawer" component={DrawerHome}/> */}
            {/* </>
            ) : ( 
              <> */}
            <Stack.Screen name="Drawer" component={DrawerHome}/>
            {/* <Stack.Screen name="Login" component={Login} /> */}
            </>
          {/* )}  */}
        </Stack.Navigator>
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default () => {
  return (
    <NavigationContainer>
      <App></App>
    </NavigationContainer>
  );
};
