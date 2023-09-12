/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { PAGE_MAX } from './Constants';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type RootStackParamList = {
  Home: undefined,
  Profile: {name: string};
}

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
 
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function IsNumber(number: any){
  if (number === ''){
    return "Empty String";
  }
  if (isNaN(number)){
      return "Not a number.";
  }
  let isnum = /^\d*$/.test(number);
  if (isnum){
    return "";
  }
  else{
    return "Invalid characters.";
  }
}

function IsWithinPageRange(number: any){
  return number <= PAGE_MAX;
}

// Not the type safest. TOOD later.
function App({navigation}: {navigation:any}): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [pageNumInput, onChangePageNumInput] = React.useState('');
  let [errorString, setErrorString] = React.useState('');
  
  function LoadPage(){
    setErrorString(IsNumber(pageNumInput));
    if (IsNumber(pageNumInput) == ""){
      if (IsWithinPageRange(pageNumInput)){
        navigation.navigate('Page', {pageNumber: pageNumInput})
      }
      else{
        setErrorString("Page size too large.");
      }
    }
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>
            Page Maximum: 117
          </Text>
          <TextInput
            style={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
            }}
            onChangeText={onChangePageNumInput}
            value={pageNumInput}
            placeholder='Page Number'
            keyboardType='numeric'
          />
          <Text>
            Current Error: {errorString}
          </Text>
            <Button 
              title="Go to Page"
              onPress={() => LoadPage()}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;