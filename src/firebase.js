import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

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
        this.app = app.database();
        this.storage = app.storage();
    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password);
    }

    logout(){
        return app.auth().signOut();
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

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email;
    }

    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid;
    }

    getUserEmail(){
        if(!app.auth().currentUser){
            return null;
        }
        return app.auth().currentUser.email;
    }

    async getUserName(callback){
        if (!app.auth().currentUser){
            return null;
        }

        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid)
            .once('value').then(callback);
    }
}

export default new Firebase();