<template>
 	<NavBar />
  <Container />
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/Dashboard/NavBar.vue'
import Container from '@/components/Dashboard/Container.vue'
import { firebase } from '@/components/firebaseInit'
import { provide,ref } from 'vue'

export default {
  components: {
    NavBar,
    Container
  },
  setup() {
//     let user = null;
//     const infoUser = ref({});

    

    
// provide("infoUser",infoUser);
//     return {
//       user,
//       infoUser
//     }
  }
}
</script>
