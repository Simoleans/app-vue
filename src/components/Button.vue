<template>
  <div class="flex flex-col items-center gap-4">
    <button type="button" class="bg-red-500 p-3 rounded text-white hover:bg-red-700 focus:outline-none" v-on:click="click">{{ message }}</button>
    <transition name="fade">
      <span v-show="show">Mensaje mostrando</span>
    </transition>
    <div>
       <ul>
          <li v-for="(d, index) in data">
            {{ d.name }} - {{ d.funcion }}
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Button',
  data() {
    return {
      message : 'Click Aqui!',
      show : false,
      data : [
        {
          name : 'Laravel',
          funcion : 'backend'
        },
        {
          name : 'Vue',
          funcion : 'Frontend'
        }
      ]
    }
  },
  created () {
    this.data
  },
  methods : {
     click() {
      this.show = !this.show
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
