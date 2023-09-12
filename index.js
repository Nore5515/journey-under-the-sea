/**
 * @format
 */

import {AppRegistry, Text, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function SecretScreen(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Secret Screen!</Text>
      </View>
    );
  }
  

const AppNavContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name = "Home" component={App}/>
                <Stack.Screen name = "Secret" component={SecretScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

AppRegistry.registerComponent(appName, () => AppNavContainer);

export default AppNavContainer;

