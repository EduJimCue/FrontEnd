<template>
    <div>
      <input v-model="username" placeholder="Nombre de usuario">
      <input v-model="password" type="password" placeholder="Contraseña">
      <button @click="login">Iniciar sesión</button>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          username: '',
          password: ''
        }
      },
      methods: {
        login() {
          this.$store.dispatch('fetchUser', { username: this.username, password: this.password })
        }
      }
    }
  </script>
<style lang="scss" scoped>

</style>