import { firebase } from '@/components/firebaseInit'
import { watchEffect  } from 'vue' 

let userData = {};

watchEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userData = user;
    } 
    });
});

export {userData as data };