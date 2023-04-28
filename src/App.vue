<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/Gimnasio">Gimnasios</router-link> |
      <router-link to="/Leccion">Lecciones</router-link> |
      <span v-if="$store.state.user!=null">
      <button @click="$store.dispatch('logout')">Cerrar sesión</button> |
      <button @click="editUser">Actualiza tu usuario</button> |
      <button @click="deleteUser">Eliminar usuario</button> |
      </span>
      <span v-else>
        <router-link to="/Login">Inicia sesion</router-link> |
        <router-link to="/Signup">Registrate</router-link> |
      </span>
    </nav>
    <router-view/>
  </div>
</template>
<script>
export default{
  methods:{
  deleteUser() {
    fetch(`https://localhost:7242/User/${this.$store.state.user.id}`, {
      method: `DELETE`,
      headers: {
      "Content-type": "application/json"
      }
      }).then(() => {
      window.location.reload();
      this.$store.dispatch('logout');
    });
  },
  editUser(){
    this.$router.push(`User/${this.$store.state.user.id}/edit`)
}
  },
  created(){
    this.$store.dispatch('fetchGyms')
    this.$store.dispatch('fetchLessons')
    this.$store.dispatch('fetchTeachers')
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
