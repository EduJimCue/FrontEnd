<template>
  <div id="app">
    <header>
      <div>
        Logo
      </div>
      <div>
       <span v-if="$store.state.user!=null">
      <button @click="$store.dispatch('logout')">Cerrar sesión</button> |
      <button @click="editUser">Actualiza tu usuario</button> |
      <button @click="deleteUser">Eliminar usuario</button> |
      </span>
      <span v-else>
        <router-link to="/Login">Inicia sesion</router-link> |
        <router-link to="/Signup">Registrate</router-link> |
      </span>
    </div>
    </header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/Gimnasio">Gimnasios</router-link> |
      <router-link to="/Leccion">Lecciones</router-link> |
    </nav>
    <router-view/>
    <footer>
      <p>Aqui irian las redes sociales</p>
    </footer>
  </div>
</template>
<script>
export default{
  methods:{
  deleteUser() {
    this.$store.dispatch('deleteLesson')
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
  text-align: left;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #42b983;
  color:white;
}
footer{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #42b983;
  padding: 20px;
  color: #fff;
  text-align: center;
}
</style>
