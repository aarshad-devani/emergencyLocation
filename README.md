## About Emergency Location

Emergency Location is a Mobile App created using React-Native. The project was made in order to provide emergency service to person in need by sending notifications to people within 1 km Range. This application requires Users to be logged in on application when in order to get location related data. Future scope should include background location services that will enables users to send push notifications instead of local notifications.

## How to use the App

Application has a very simple UI, User will be asked to login once when he/she installs the application, If user is already logged in they can right away see a map with the range seen. All they gotta do is click "HELP NEEDED !!!" button and notification is sent to Users within 1 km range.

## How to run this App

This app has been created using Create React Native App (CRNA) which uses Expo as internal component. In order to run the application from phone directly, Please install Expo on your Mobile. Link for [Expo app](https://expo.io) .

## Process to start application on local Machine 

Download this repository, open cmd prompt in the downloaded folder and run these commands in sequence. (Assuming that you have node js installed on your machine. If not you can download from [Node JS](https://nodejs.org/en/) ).
```
npm install -g yarn
yarn install
yarn start
```

This will start the packager and will show a QR Code which can directly be scanned on your Expo App.
In case QR Code recognition fails, you can also enter the URL which looks somewhat like this
```
exp://192.168.0.2:19000
```
and your application will be running on the phone.