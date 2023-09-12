/**
 * @format
 */

import {AppRegistry, Button, Image, ScrollView, Text, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PAGE_MAX } from './Constants';

const Stack = createNativeStackNavigator();

const pathArray = PopulatePathArray();

function PopulatePathArray(){
    let coolArray = [PAGE_MAX];
    let pathPrefix = "./pages/journey_under_the_sea-";
    let pathSuffix = ".png";
    for (let x = 0; x < PAGE_MAX; x++){
        coolArray[x] = pathPrefix + ConvertPageNumberToPathStr(x+1) + pathSuffix;
    }
    return coolArray;
}

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
        console.log("Not a number..");
    }
    return isnum
}

function ConvertPageNumberToPathStr(pageInt){
    let pagePathStr = pageInt;

    if (pageInt < 100 && pageInt >= 10){
        pagePathStr = "0" + pageInt;
    }
    if (pageInt < 10){
        pagePathStr = "00" + pageInt;
    }
    return pagePathStr;
}
  
function GetPageView({route, navigation}){
    const {pageNumber} = route.params;

    let pageNumberStr = ConvertPageNumberToPathStr(pageNumber);

    let pathPrefix = "./pages/journey_under_the_sea-";
    let pathSuffix = ".png";
    let path = pathPrefix + pageNumberStr + pathSuffix;

    console.log(pathArray[0]);
    console.log(pathArray[100]);
  
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
                <Text>
                    {path}
                </Text>
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

