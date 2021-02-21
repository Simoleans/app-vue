<template>
  <div class="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
    <div class="flex overflow-hidden max-w-md bg-white container justify-center rounded-md shadow-lg max md:flex-row md:flex-1 md:max-w-screen-md lg:max-w-screen-md">
      <div class="hidden sm:block p-5 flex-1 bg-blue-200">
        <div class="flex-col gap-4 content-center">
          <p class="text-2xl font-bold mb-8">Aplicación VueJS 3.</p>
          <img src="@/assets/img/login.svg" alt="login" class="h-40 w-40 mx-auto">
          <!-- <p class="text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia adipisci, quidem qui harum quam repellat autem sapiente consequatur laboriosam eveniet assumenda non aliquid molestiae veniam quasi ratione velit dolores at!
          </p> -->
        </div>
      </div>
      <div class="p-5 bg-white flex-1">
        <p class="text-2xl font-bold mb-8">Entrar</p>
        <button @click="loginGmail" class="inline-flex w-full px-4 py-3 font-semibold text-blue-700 border border-gray-300 rounded-lg bg-blue-1300 hover:bg-blue-700 hover:text-white focus:bg-gray-100">
          <div class="flex items-center justify-center">
            <div class="border-r">
              <img src="https://s2.googleusercontent.com/s2/favicons?domain=google.com&sz=32" class="w-6 h-6 inline-block mr-4" alt="Google"/>
            </div>
            <div class="ml-16">
              Login con google
            </div>
          </div>
        </button>
        <small class="text-red-600 mb-2" v-show="test">{{ errorMessage }}</small><br>
        <a href="#" class="text-blue-500 font-bold underline text-md mt-6" @click="guestLogin">Ingresar como invitado</a>
      </div>
    </div>
  </div>
</template>

<script>
import {firebase,provider} from '@/components/firebaseInit'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


export default {
  setup()  {
    let test = ref(false);
    const errorMessage = ref()
    const router = useRouter()

    const loginGmail = () =>{
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
      }).then(() => {
        router.push('/dashboard')
      }).catch(function(error) {
        test.value = true;
        errorMessage.value = error.message;
      });
    }

    const guestLogin = () => {
      firebase.auth().signInAnonymously()
    .then(() => {
      alert("khfskh")
       router.push('/dashboard')
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
      // ...
    });
    }

    return {
      errorMessage,
      test,
      loginGmail,
      guestLogin
    }
  }
}
</script>