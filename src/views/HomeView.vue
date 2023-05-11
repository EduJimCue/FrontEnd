<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-if="$store.state.user!=null">
    <h2>¡Bienvenido de vuelta, {{ $store.state.user.name }}!</h2> 
    <h3>Estas son las lecciones a las que estas apuntado:</h3>
    <b-table striped hover :items="$store.state.userlessons" :fields="fields" @row-clicked="showLessonDetails"></b-table>
  </div>
  <div v-else>
    <h1> Por favor, inicie sesión para ver tus detalles</h1>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      fields: ['name', 'description', 'teacherId'],
    };
  },
  methods:{
    showLessonDetails(item){
            this.$router.push(`Leccion/${item.id}`)
        }
  },
  components: {
  },
  created() {
    this.$store.dispatch('fetchUserLessons');
  }
}
</script>
