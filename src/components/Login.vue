<template>
    <div class="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div class="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div class="p-5 bg-white md:flex-1">
          <h3 class="my-4 text-2xl font-semibold text-gray-700">Inicio de sesión</h3>
          <form action="#" class="flex flex-col space-y-5" @submit.prevent="logIn">
            <div class="flex flex-col space-y-1">
              <label for="email" class="text-sm font-semibold text-gray-500">Email</label>
              <input
                v-model="email"
                type="email"
                id="email"
                autofocus
                class="px-4 py-2 transition duration-300 border border-gray-300  focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <div class="flex flex-col space-y-1">
                <label for="password" class="text-sm font-semibold text-gray-500">Contraseña</label>
              <input
                v-model="password"
                type="password"
                id="password"
                class="px-4 py-2 transition duration-300 border border-gray-300  focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <div>
              <button
                type="submit"
                class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Entrar
              </button>
            </div>
            <div class="flex flex-col space-y-5">
              <span class="flex items-center justify-center space-x-2">
                <span class="h-px bg-gray-400 w-14"></span>
                <span class="font-normal text-gray-500">O</span>
                <span class="h-px bg-gray-400 w-14"></span>
              </span>
              <div class="flex flex-col space-y-4">
                <a
                  v-on:click="loginGmail"
                  href="#"
                  class="flex items-center bg-red-500 justify-center px-4 py-2 space-x-2 transition-colors duration-300 border  rounded-md group hover:bg-red-800 focus:outline-none"
                >
                  <span>
                    <svg class="w-5 h-5 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                  <span class="text-sm font-medium text-white" >Gmail</span>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import {firebase,provider} from '@/components/firebaseInit'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    logIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          console.log(user);
          this.$router.replace('home')
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      );
    },
    loginGmail : function () {
       firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        });
    }
  }
}
</script>