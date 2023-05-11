<template>
    <div>
      <h1>Introduce tus datos de acceso</h1>
      <v-form  grid="true" style="max-width: 600px; margin: 0 auto;">
        <v-text-field
        v-model="username"
        label="Nombre de usuario"
        >
        </v-text-field>
        <v-text-field
        v-model="password"
        label="Contraseña"
        type="password"
      ></v-text-field>
      <v-btn
          color="#42b983"
          density="comfortable"
          size="x-large"
          @click="login"
        >
        Validate
        </v-btn>
      </v-form>  
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