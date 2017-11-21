import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FormControl = function(props){
return (
  <View style={{flexDirection:'row', paddingVertical:15}}>
    <View style={{flex:1}}>
      <Text style={{fontSize:16, backgroundColor:'transparent'}}>{props.name}</Text>
    </View>
    <View style={{flex:2}}>
      {props.children}
    </View>
  </View>
);
}

export default FormControl;