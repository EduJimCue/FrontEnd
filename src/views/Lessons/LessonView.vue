<template>
  <div>
    <h1>Nombre de la leccion: {{ Lesson.name }}</h1>
    <h2>Detalles de la leccion: {{ Lesson.description }}</h2>
    <h2>Plazas disponibles: {{ remainingCapacity }}</h2>
    <h2>Hora a la que se imparte: {{ Lesson.hour }}:{{ Lesson.minute }}</h2>
    <div v-if="$store.state.user !== null">
      <div v-if="isUserRegistered">
        <h2>Ya estás apuntado a esta lección.</h2>
        <button class="btn btn-danger" @click="deleteUser">Desapuntate</button>
      </div>
      <div v-else>
        <button v-if="!loading && remainingCapacity > 0" class="btn btn-primary" @click="registerUser">Apuntarse a la clase</button>
        <div v v-if="remainingCapacity <= 0"><h2>Lo sentimos no quedan plazas disponibles por el momento</h2></div>
      </div>
    </div>
    <div v-else>
      <h1>Para apuntarse a una clase tienes que iniciar sesión</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Lesson: {},
      registeredUsers: 0,
      Users:[],
      initialCapacity: 0,
      loading: false 
    };
  },
  methods: {
  registerUser() {
    const userId = parseInt(this.$store.state.user.id);
    const lessonId = parseInt(this.$route.params.id);
    const userLesson = { usuarioId: userId, leccionId: lessonId };

    fetch("https://localhost:7242/UserLesson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userLesson)
    })
    .then(response => {
      if (response.ok) {
        this.registeredUsers += 1;
        fetch(`https://localhost:7242/LessonUser/${lessonId}`)
          .then(response => response.json())
          .then(response => {
            this.Users = response;
          });
      } else if (response.status === 409) {
        alert("Ya estás apuntado a esta lección.");
      }
    })
    .catch(error => {
      console.error("Error al registrarse en la lección", error);
    });
  },
  deleteUser() {
    const userId = parseInt(this.$store.state.user.id);
    const lessonId = parseInt(this.$route.params.id);
    fetch(`https://localhost:7242/UserLesson/${userId}/${lessonId}`, {
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          this.registeredUsers -= 1;
          fetch(`https://localhost:7242/LessonUser/${lessonId}`)
            .then(response => response.json())
            .then(response => {
              this.Users = response;
            });
        } else {
          alert("Error al eliminar el registro.");
        }
      })
      .catch(error => {
        console.error("Error al eliminar el registro", error);
      });
  }
},
  computed: {
    remainingCapacity() {
      return this.initialCapacity - this.registeredUsers;
    },
    isUserRegistered() {
  if (this.$store.state.user !== null) {
    const userId = parseInt(this.$store.state.user.id);
    return this.Users.some(user => user.usuarioId === userId);
  } else {
    return false;
  }
}
  },
  created() {
    fetch(`https://localhost:7242/Lesson/${this.$route.params.id}`)
      .then(response => response.json())
      .then(response => {
        this.Lesson = response;
        this.initialCapacity = response.capacity; 
        this.loading = false; 
      });
    fetch(`https://localhost:7242/LessonUser/${this.$route.params.id}`)
      .then(response => response.json())
      .then(response => {
        this.registeredUsers = response.length;
        this.Users=response;
      });
  }
};
</script>

<style lang="scss" scoped>

</style>