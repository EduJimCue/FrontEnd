<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-if="$store.state.user!=null">
    <h2>¡Bienvenido de vuelta, {{ $store.state.user.name }}!</h2> 
    <h3>Estas son las lecciones a las que estas apuntado:</h3>
    <b-table striped hover :items="lessons" :fields="fields" @row-clicked="showLessonDetails"></b-table>
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
      lessons: []
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
    fetch(`https://localhost:7242/Userlesson/${this.$store.state.user.id}`)
      .then(response => response.json())
      .then(response => {
        this.lessons = response;
        console.log(this.$store.state.user.id)
      });
  }
}
</script>
