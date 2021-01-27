<template>
   <!--  <div class="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div class="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div class="p-5 bg-white md:flex-1">
          <h3 class="my-4 text-2xl font-semibold text-gray-700">Registrarse</h3>
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
            <div class="flex gap-4">
              <button
                type="submit"
                class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Registrarse
              </button>
            </div>
            <div class="flex flex-col space-y-5">
              <span class="flex items-center justify-center space-x-2">
                <span class="h-px bg-gray-400 w-14"></span>
                <span class="font-normal text-gray-500">O</span>
                <span class="h-px bg-gray-400 w-14"></span>
              </span>
              <div class="flex flex-col space-y-4">
                <router-link  to="/" class="text-blue-500 font-bold">Ya estoy registrado</router-link >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div> -->



    <!------ nuevo -->
    <div class="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div class="flex overflow-hidden bg-white container justify-center rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div class="hidden sm:block p-5 flex-1 bg-blue-400">
          <div class="flex-col gap-4">
            <p class="text-2xl font-bold mb-8">Aplicación VueJS 3.</p>
            <p class="text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia adipisci, quidem qui harum quam repellat autem sapiente consequatur laboriosam eveniet assumenda non aliquid molestiae veniam quasi ratione velit dolores at!
            </p>
          </div>
        </div>
        <div class="p-5 bg-white flex-1">
          <p class="text-2xl font-bold mb-8">Entrar</p>
          <button @click="loginGmail" class="inline-flex w-full px-4 py-3 font-semibold text-blue-700 border border-gray-300 rounded-lg bg-blue-1300 hover:bg-blue-700 hover:text-white focus:bg-gray-100">
            <div class="flex items-center justify-center">
              <div class="border-r">
                <img src="https://s2.googleusercontent.com/s2/favicons?domain=google.co&sz=32" class="w-6 h-6 inline-block mr-4" alt="Google"/>
              </div>
              <div class="ml-16">
                Login con google
              </div>
            </div>
          </button>
          <small class="text-red-600" v-show="test">{{ errorMessage }}</small>
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
        router.push('/dasboard')
      }).catch(function(error) {
        test.value = true;
        errorMessage.value = error.message;
      });
    }

    return {
      errorMessage,
      test,
      loginGmail
    }
  }
}
</script>