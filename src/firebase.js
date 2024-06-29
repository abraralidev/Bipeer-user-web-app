// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase configuration my dummy DB
// const firebaseConfig = {
//   apiKey: "AIzaSyApxaZfWLLr4QAyHMAOQ4SCL4802ppdhzg",
//   authDomain: "test-chat-39fe3.firebaseapp.com",
//   projectId: "test-chat-39fe3",
//   storageBucket: "test-chat-39fe3.appspot.com",
//   messagingSenderId: "1016804712088",
//   appId: "1:1016804712088:web:e09aedf93dce1d61613aed",
//   measurementId: "G-BVKV6NQYP9"
// };

// Firebase configuration Bipeer DB
const firebaseConfig = {
  apiKey: "AIzaSyDKcizvbUJ4iH3gbPiHuJdwrUjgxdGWVJU",
  authDomain: "bipeers-ef662.firebaseapp.com",
  databaseURL: "https://bipeers-ef662-default-rtdb.firebaseio.com",
  projectId: "bipeers-ef662",
  storageBucket: "bipeers-ef662.appspot.com",
  messagingSenderId: "458533452663",
  appId: "1:458533452663:web:e8939dabf21a65933b3f72",
  measurementId: "G-XNNQ0LNKR5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireBaseDB = getFirestore(app);




// Function to add data
// export const addData = async () => {
//   try {
//     const usersCollectionRef = collection(db, "users");
//     await addDoc(usersCollectionRef, {
//       name: "Los Angeles 12233",
//       email: "zaroon3555310@gmail.com",
//     });
//     console.log("Data added successfully!");
//   } catch (error) {
//     console.error("Error adding document: ", error);
//     console.log(db);
//   }
// };
