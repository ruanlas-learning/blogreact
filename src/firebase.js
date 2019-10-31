import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { resolve } from 'url';

let firebaseConfig = {
    apiKey: "AIzaSyCPLRu0xafOD5wKertSFiJbrLNkmiZz2IE",
    authDomain: "reactblogapp-4029c.firebaseapp.com",
    databaseURL: "https://reactblogapp-4029c.firebaseio.com",
    projectId: "reactblogapp-4029c",
    storageBucket: "reactblogapp-4029c.appspot.com",
    messagingSenderId: "101398606499",
    appId: "1:101398606499:web:001b22467be5cb9d5a4516",
    measurementId: "G-MN8L8XT843"
  };

class Firebase{

    constructor(){
        app.initializeApp(firebaseConfig);
    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password);
    }

    async register(nome, email, password){
        await app.auth().createUserWithEmailAndPassword(email, password);

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({ nome: nome });
    }

    isInitialized(){
        return new Promise( resolve => {
            app.auth().onAuthStateChanged(resolve);
        });
    }
}

export default new Firebase();