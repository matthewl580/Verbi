// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Initialize the FirebaseUI Widget using Firebase.
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDQ7Oy1_2yFJlK1Ue4Jbvb1OygLzoJyy8",
  authDomain: "verbi-dabf2.firebaseapp.com",
  projectId: "verbi-dabf2",
  storageBucket: "verbi-dabf2.appspot.com",
  messagingSenderId: "279166192167",
  appId: "1:279166192167:web:bd4a953aaa64b7bb05dc02",
  measurementId: "G-0B0QL94MQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

var storage = app.storage();

 function getData(fileName, userCode, func = () => {}) {
    const storageRef = storage.ref(`/Users/${userCode}`);
    storageRef
      .child(fileName)
      .getDownloadURL()
      .then((url) => {
        fetch(url)
          .then((response) => response.text())
          .then((data) => {
            func(data);
            return data;
          });
      })
      .catch((error) => {
        // A full list of error codes is available at https://firebase.google.com/docs/storage/web/handle-errors
        func(undefined);
        return undefined;
      });
  }
   function setData(fileName, userCode, data) {
    const storageRef = storage.ref(`/Users/${userCode}`);
    storageRef
      .child(fileName)
      .putString(data)
      .then((snapshot) => {
        console.log("Uploaded a raw string!");
      });
  }
  
export function GET(request) {
    setData('crap.json','01',"STOP YAPPING")
    return new Response("test")
}