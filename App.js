//libraries
import React,{Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, Vibration, AsyncStorage } from 'react-native';
import { Constants , Location, Permissions, Notifications} from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
// import registerForPushNotificationsAsync from 'registerForPushNotificationsAsync';
import firebase from './firebaseConfig';

//Pages import
import MapView from './Pages/mapView';
// import ProfilePage from './Pages/profilePage';
import ProfilePage from './Pages/profile';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
const rootRef = firebase.database().ref();
const helpNeededDB = rootRef.child('helpNeeded');

const DURATION = 500
const PATTERN = [300, 300, 300]

export default class App extends Component {
  constructor(props){
    super(props);
    this.helpNeedRef = rootRef.child('helpNeeded');
    this.peopleRef = rootRef.child('peopleInfo');
    this.applicationStartTime = moment();
    // this.helpNeedRef = rootRef.child('helpNeeded');
    this.state={
      locationResult: null,
      userName:'',
      userData:{},
      userToken:'',
      helpNeededPeople:[],
      userNameFound:false,
      locationUpdatepending:true,
      removingUsersInProgress:false,
      mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA },
      peopleInfo:[],
      locationData:{},
      myInfo:{itemID:'',name:'', coords:{latitude:0.0000, longitude:0.0000, time:moment().format('MMDDYYYYThhmmss')}, contactNumber:'', range:1},
    }
  }

  componentWillMount() {
    // registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    this.setState({notification: notification});
  };

  componentDidMount(){
    this.ManageGetDataValues();
    this.getUserData()
    this.registerForPushNotificationsAsync()
    this._getLocationAsync();
  }

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log('token:', token)
    this.setState({userToken: token});
    
  }

  updateMyUserData(){

  }

  async _getLocationAsync(){
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    let newRegion = { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA };
    this.setState({mapRegion:newRegion, locationData:location, userData:Object.assign({}, this.state.userData, {coords:location.coords})});
    

    console.log('Location Data updated');
    if(this.state.userData.name){this.AddMyInfo(location);}
    
  };

  async getUserData(){
    try {
      const value = await AsyncStorage.getItem('@EmergencyLocation:UserData');
      if (value !== null){
        this.setState({userData: JSON.parse(value)});
        // We have data!!
        console.log('UserData obtained');
        // this.setState({userNameFound:true, userName:value});
        
      }
      else{
        console.log('Username not found, value:', value);
      }
    } catch (error) {
      // Error retrieving data
      console.log('Username not found, error:', error);
    }
  }

  async setUserName(UsersName){
    try {
      await AsyncStorage.setItem('@EmergencyLocation:Username', UsersName);
    } catch (error) {
      console.log('error saving username, err:', error);
      // Error saving data
    }
  }

  async setUserData(UserData){
    try {
      await AsyncStorage.setItem('@EmergencyLocation:UserData', JSON.stringify(UserData));
    } catch (error) {
      console.log('error saving username, err:', error);
      // Error saving data
    }
  }

  ManageGetDataValues(){
    this.peopleRef.on('value', (snapshot) => {
      let newState = [];
      snapshot.forEach((dataItem)=>{
        let item = dataItem.val();
        newState.push({
          key: dataItem.key,
          name: item.name,
          coords: item.coords,
          time:moment(item.time),
          contactNumber:item.contactNumber, 
          range:item.range
        });
      })
      
      // console.log('Got DB Values');
      this.setState({
        peopleInfo: newState
      });
    });

    helpNeededDB.on('child_added',(data)=> {
      // addCommentElement(postElement, data.key, data.val().text, data.val().author);
      this.helpRequested(data);
    })
  }

  helpRequested(item){
    debugger;
    let itemData = item.val();
    if(itemData.name!==this.state.userData.name 
      && moment.duration(moment().diff(moment(itemData.time))).asHours()<1 
      && moment(itemData.time).isAfter(this.applicationStartTime)
      && getDistanceFromLatLonInKm(itemData.coords.latitude, itemData.coords.longitude, this.state.userData.coords.latitude, this.state.userData.coords.longitude) < this.state.userData.range
    ){
      let helpNeededPeople = this.state.helpNeededPeople
      helpNeededPeople.push(Object.assign({}, itemData, {key:item.key}))
      this.setState({helpNeededPeople});
      Vibration.vibrate([1000,1000,1000]);
    }
  }

  AddMyInfo(location){
    // debugger;
    let item = {
      name: this.state.userData.name,
      coords: location.coords,
      time:moment().format('MMDDYYYYThhmmss'),
      contactNumber:this.state.userData.contactNumber, 
      range:this.state.userData.range
    };
    this.peopleRef.push(item);
    
  }

  getHelp(){
    console.log('Get Help clicked');
    debugger;
    this.helpNeedRef.push(this.state.userData);
    // helpNeededDB.push(this.state.userData)
    Vibration.vibrate(PATTERN);
    
  }

  showProfile(){
    console.log('Show Profile clicked');
  }

  async showSettings(){
    try{
      await AsyncStorage.removeItem('@EmergencyLocation:UserData', ()=>{this.setState({userData:{}})});
      
    }catch (error) {
      console.log(error, 'error occured');
    }
    // console.log('Show settings clicked');
  }

  signUpMethod(signupData){
    
    console.log(signupData,'=signupData');
    
    this.setUserData(signupData)
    this.setState({userData:Object.assign({}, signupData, {coords:location.coords})});
    this.AddMyInfo(this.state.locationData);
  }

  render(){
    return (
      <View style={styles.container}>
        {!this.state.userData.name && <ProfilePage
          signUp={this.signUpMethod.bind(this)}
          //setUserData=
        />}
        {this.state.userData.name && <MapView
          locationData={this.state.locationData}
          mapRegion={this.state.mapRegion}
          helpClick={this.getHelp.bind(this)}
          showProfile={this.showProfile}
          showSettings={this.showSettings}
        />}
      </View>//container View
    );
  }
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2-lat1);  // deg2rad below
  let dLon = deg2rad(lon2-lon1); 
  let a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  let d = R * c; // Distance in km
  return d ;
}

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:  Constants.statusBarHeight,
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
