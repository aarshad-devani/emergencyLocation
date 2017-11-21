import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsPage = function(props){
return (
  <View style={{flexDirection:'row'}}>
    <View style={{flex:1}}>
      <Text style={{fontSize:14}}>{props.name}</Text>
    </View>
    <View style={{flex:2}}>
      {props.children}
    </View>
  </View>
);
}

export default SettingsPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop:  Constants.statusBarHeight,
    },
});