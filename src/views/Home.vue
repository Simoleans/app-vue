<template>
  <div class="home">
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/Button.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {
    Button,
    Login
  }
}
</script>
