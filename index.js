/**
 * @format
 */

import {AppRegistry, Button, Image, ScrollView, Text, View} from 'react-native';
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

function IsNumber(number){
    if (isNaN(number)){
        console.log("NAN!");
        return false;
    }
    let isnum = /^\d*$/.test(number);
    console.log(number)
    console.log(isnum)
    if (isnum){
        console.log("Is number1");
    }
    else{
        console.log("Not an umber..");
    }
    return isnum
}
  
function GetPageView({route, navigation}){
    const {pageNumber} = route.params;

    IsNumber(pageNumber);

    return (
        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>
                    {pageNumber}
                </Text>
                <Image 
                    style={{resizeMode: 'contain', width: 400, height: 600}}
                    source={require('./pages/journey_under_the_sea-003.png')} 
                />
                <Button 
                    title="Home"
                    onPress={() => navigation.navigate('Home')}
                />
            </ScrollView>
        </View>
    );
}

const AppNavContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name = "Home" component={App}/>
                <Stack.Screen name = "Secret" component={SecretScreen}/>
                <Stack.Screen name = "Page" component={GetPageView}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

AppRegistry.registerComponent(appName, () => AppNavContainer);

export default AppNavContainer;

