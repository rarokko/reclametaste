import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyB8xRI0TS64uUtMXpSf_0kkqklTVdB5BoE",
    authDomain: "reclametaste.firebaseapp.com",
    databaseURL: "https://reclametaste.firebaseio.com",
    projectId: "reclametaste",
    storageBucket: "reclametaste.appspot.com",
    messagingSenderId: "863756670014"
};
var fire = firebase.initializeApp(config);
export default fire;