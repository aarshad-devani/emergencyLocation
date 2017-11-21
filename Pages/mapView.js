import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { Constants, MapView , Location, Permissions} from 'expo';
import { MaterialIcons } from '@expo/vector-icons';

const EmergencyMapView = function(props){
return(
    <View style={styles.container}>
        {/* <View style={styles.overlayText}>
        <Text>{this.state.locationResult}</Text>
        </View> */}
        <MapView
        style={styles.map}
        region={props.mapRegion}
        //onPress={(e) => this.onMapPress(e)}
        //onRegionChange={this._handleMapRegionChange.bind(this)}
        initialRegion={props.intialRegion}
        >
        {props.locationData.coords && 
        <MapView.Marker
            coordinate={props.locationData.coords}
            pinColor="red"
        >
        </MapView.Marker>}
        {props.locationData.coords && 
        <MapView.Circle
            center={props.locationData.coords}
            radius={400}
            fillColor="#FF000044"
            strokeColor="rgba(1,0,0,0.4)"
            zIndex={2}
            strokeWidth={2}
        />}
        </MapView>
        
        
        <View style={styles.panicContainer}>
            <View style={{flex:1, backgroundColor:'transparent', alignItems:'flex-start'}}>
                <TouchableOpacity 
                    style={[{ marginHorizontal: 15 }]}
                    onPress={props.showProfile.bind(this)}
                >
                <MaterialIcons name="account-circle" size={32} color="red" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                style={[{ margin: 15, flex:2 }]}
                onPress={props.helpClick.bind(this)}
            >
                <View style={styles.panicButton}>
                    <Text style={styles.panicButtonText}>HELP NEEDED !!!</Text>
                </View>
            </TouchableOpacity>
            <View style={{flex:1, backgroundColor:'transparent', alignItems:'flex-end'}}>
                <TouchableOpacity 
                    style={[{ marginHorizontal: 15 }]}
                    onPress={props.showSettings.bind(this)}
                >
                <MaterialIcons name="close" size={32} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

export default EmergencyMapView;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    map:{
      ...StyleSheet.absoluteFillObject,
    },
    overlayText: {
      zIndex: 2,
      backgroundColor: '#FF000033',
      position: 'absolute',
      top: 0,
      height: '100%',
      width:'100%',
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    panicContainer:{
      zIndex: 3,
      //backgroundColor: '#FF000099',
      position: 'absolute',
      bottom: 0,
      height: 200,
      width:'100%',
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    panicButton:{
      backgroundColor: '#FF0000',
      borderRadius: 30,
      padding: 15,
      alignItems: 'center',
    },
    panicButtonText:{
      fontSize: 15,
      color:'#FFFFFF',
    }
  });
