//libraries
import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Slider } from 'react-native';

import FormControl from '../Component/FormControl';
import ModalPicker from '../Component/ModalView';


export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      name: '',
      gender:'',
      contactNumber:'',
      range:1,
      allFieldsEntered:true
    }
  }

  componentWillMount() {
  }

  render(){
    return (
        <View style={styles.container}>
        
        <View style={[styles.container,{position:'absolute', zIndex:-3, alignItems:'center'}]}><Image source={require('../assets/logo.png')} resizeMode="center" style={{opacity:0.6}} /></View>
        
        <View style={{flex:1, alignItems:'flex-start'}}>
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

        <FormControl name={`Range ${this.state.range} kms`}>
          <Slider
            value={1}
            minimumValue={0}
            maximumValue={10}
            step={1}
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
        </View>

        <View style={{flex:1, justifyContent:'center'}}>
          <TouchableOpacity 
            style={[{ margin: 15, flex:2 }]}
            onPress={()=>{
                if(this.state.name !== '' && this.state.gender !== '' && this.state.contactNumber !== '' && this.state.range>0){
                    this.setState({allFieldsEntered:true});
                    this.props.signUp(this.state);
                }
                else{
                    this.setState({allFieldsEntered:false});
                }
            }}
          >
            <View style={styles.panicButton}>
              <Text style={styles.panicButtonText}>Sign Me Up</Text>
              <Text style={styles.panicButtonText}>I'm Concerned</Text>
            </View>
          </TouchableOpacity>
          <Text style={{padding:15, backgroundColor:'transparent', fontSize: 18, color:'#FF0000'}}>{`${!this.state.allFieldsEntered? 'Looks like you missed out some fields' : ''}`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginVertical:30
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
  panicButtonText:{
    color:'#FFF',
    fontSize: 15
  }
});
