/**
 * @format
 */

import {AppRegistry, Button, Image, ScrollView, Text, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PAGE_MAX } from './Constants';
import * as images from './generatedImageImports';


const Stack = createNativeStackNavigator();

const pathArray = PopulatePathArray();

function PopulatePathArray(){
    let coolArray = [PAGE_MAX];
    let pathPrefix = "journey_under_the_sea_";
    for (let x = 1; x <= PAGE_MAX; x++){
        coolArray[x] = pathPrefix + ConvertPageNumberToPathStr(x);
    }
    return coolArray;
}

function GetImageFromIndex(imgIndex){
    let pathPrefix = "journey_under_the_sea_";
    let path = pathPrefix + ConvertPageNumberToPathStr(imgIndex);
    console.log(images[path]);
    return images[path];
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

function IncrementIntegerInString(integerTrappedInString){
    if (IsNumber(integerTrappedInString) == false){
        console.log("ERROR");
        return -1;
    }
    let incrementedInteger = parseInt(integerTrappedInString) + 1;
    console.log("Incremented? " + incrementedInteger);
    return incrementedInteger;
}

function NextButtonPressed(navigation, pageNumber){
    if (pageNumber < PAGE_MAX){
        console.log("Navigating!");
        navigation.navigate('Page', {pageNumber: IncrementIntegerInString(pageNumber)})
    }
}
  
function GetPageView({route, navigation}){
    const {pageNumber} = route.params;

    console.log(pathArray[pageNumber]);
  
    return (
        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>
                    {pageNumber}
                </Text>
                <Image 
                    style={{resizeMode: 'contain', width: 400, height: 600}}
                    source={GetImageFromIndex(pageNumber)} 
                />
                <Button 
                    title="Home"
                    onPress={() => navigation.navigate('Home')}
                />
                <Button 
                    title="Next"
                    onPress={() => NextButtonPressed(navigation, pageNumber)}
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

