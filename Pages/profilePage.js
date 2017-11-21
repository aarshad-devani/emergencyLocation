import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Image, Slider } from 'react-native';

import FormControl from '../Component/FormControl';
import ModalPicker from '../Component/ModalView';
// import { Constants, MapView , Location, Permissions} from 'expo';
import { MaterialIcons } from '@expo/vector-icons';


export default class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.state = {  
      name: '',
      gender:'',
      contactNumber:'',
      range:0,
    }
  }
  

  signUP(){
      console.log('Current State=', this.state);
    if(this.state.name !== '' && this.state.gender !== '' && this.state.contactNumber !== '' && this.state.range>0){
        this.props.signUp(this.state);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.container,{position:'absolute', zIndex:-3, alignItems:'center'}]}><Image source={require('../assets/logo.png')} resizeMode="center" style={{opacity:0.6}} /></View>
        <FormControl name="Name">
          <TextInput
            style={styles.textInputStyle}
            placeholderTextColor="#000"
            value={this.state.name}
            onChangeText={(text) => this.setState({name:text})}
            placeholder='Your Name'
          />
        </FormControl>
          
        <FormControl name="Gender">
        <View style={styles.selectModalContainer}>
          <ModalPicker
            data={[{ key: 'male', label: 'Male' }, { key: 'female', label: 'Female' }, { key: 'unknown', label: 'Do not wish to Say' }]}
            style={styles.selectModalComponent}
            initValue="Gender"
            onChange={(option)=>{ this.setState({gender:option.label})}}
          />
            <TextInput
              style={styles.inputStyleSelectModal}
              editable={false}
              placeholder="Gender"
              value={this.state.gender}
            />
          </View>
        </FormControl>

        <FormControl name="Range (in kms)">
          <Slider
            value={1}
            minimumValue={0}
            maximumValue={10}
            onSlidingComplete={(value)=>{this.setState({range:value})}}
          />
        </FormControl>
        
        <FormControl name="Contact Number">
          <TextInput
            value={this.state.contactNumber}
            style={styles.textInputStyle}
            onChangeText={(text) => this.setState({contactNumber:text})}
            placeholderTextColor="#000"
            keyboardType='numeric'
            returnKeyType="done"
            placeholder='Contact Number'
          />
        </FormControl>

        <TouchableOpacity 
          style={[{ margin: 15, flex:2 }]}
          onPress={this.signUP}
        >
          <View style={styles.panicButton}>
            <Text style={styles.panicButtonText}>Sign Me Up</Text>
            <Text style={styles.panicButtonText}>I'm Concerned</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
  },
  rowView:{
    flexDirection:'row',
  },
  textInputStyle:{
    borderWidth:1, 
    borderColor:'#000',
    borderRadius:5, 
    // padding:10,
    marginHorizontal: 10, 
    height:30
  },
  selectModalContainer: {
    position: 'relative',
    width: 200,
    height: 30,
  },
  selectModalComponent: {
    position: 'absolute',
    opacity: 0,
    width: 200,
    zIndex: 2,
  },
  inputStyleSelectModal: {
    position: 'absolute',
    width: 200,
    height: 30,
    zIndex: 1
  },
  panicButton:{
    backgroundColor: '#FF0000',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
  },
});
