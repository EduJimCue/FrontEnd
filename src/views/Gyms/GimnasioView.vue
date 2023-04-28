<template>
  <div>
    <h1>Detalles del gimnasio: {{ Gym.name }}</h1>
    <h1>Breve descripcion: {{ Gym.description }}</h1>
    <h2>Precio mensual: {{ Gym.monthPrice }}€</h2>
    <h2>Direccion: {{ Gym.address }}</h2>
    <h2>Lecciones que ofrece:</h2>
    <div v-if="$store.state.auth">
      <label for="lesson-select" class="lesson-select-label">Selecciona una leccion:</label>
      <b-form-select v-model="selectedLesson" :options="lessonOptions"><option disabled value="">Selecciona una leccion</option></b-form-select>
      <button class="btn btn-primary" @click="addRelation">Añade lecciones</button>
    </div>
    <b-table
      v-if="!loading"
      striped
      hover
      :items="Lesson"
      @row-clicked="showLessonDetails"
      :fields="[
        { key: 'name', label: 'Name', sortable: true },
        { key: 'description', label: 'Descripcion', sortable: true },
        { key: 'teacherName', label: 'Profesor', sortable: true }
      ]"
    ></b-table>
    <div v-else>
      Cargando lecciones...
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Gym: {},
      Lesson: [],
      loading: true,
      selectedLesson: null
    };
  },
  computed: {
    lessonOptions() {
      return this.$store.state.lessons.map(lesson => {
        return {
          value: lesson.id,
          text: lesson.name
        };
      });
    }
  },
  methods: {
    showLessonDetails(item) {
      this.$router.push(`../Leccion/${item.id}`);
    },
    addRelation() {
      fetch(`https://localhost:7242/GymLesson/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          leccionId: this.selectedLesson,
          gimnasioId: this.Gym.id
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error al añadir la lección");
          }
          return response.json();
        })
        .then(response => {
          console.log(response)
          alert("Lección añadida con éxito");
        })
        .catch(error => {
          alert(error.message);
        });
    }
  },
  created() {
    fetch(`https://localhost:7242/Gym/${this.$route.params.id}`)
      .then(response => response.json())
      .then(response => {
        this.Gym = response;
      });

    fetch(`https://localhost:7242/GymLesson/${this.$route.params.id}`)
      .then(response => response.json())
      .then(response => {
        const lessonPromises = response.map(lesson => {
          return fetch(`https://localhost:7242/User/${lesson.teacherId}`)
            .then(response => response.json())
            .then(response => {
              lesson.teacherName = response.name;
              return lesson;
            });
        });

        Promise.all(lessonPromises)
          .then(lessons => {
            this.Lesson = lessons;
            this.loading = false;
          });
      });
  }
};
</script>

<style lang="scss" scoped>
.lesson-select-label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}
select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}</style>