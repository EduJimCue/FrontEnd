<template>
  <div>
    <h1>Listado de lecciones</h1>
    <div v-if="$store.state.auth">
      <button class="btn btn-warning" @click="addLesson()">Añadir leccion</button>
      <v-form  grid="true" style="max-width: 600px; margin: 0 auto;">
        <v-text-field
        v-model="search"
        label="Buscar"
        @input="filterLessons"
        >
        </v-text-field>
      </v-form>
      <b-table striped hover :items="filteredLessons" :fields="authFields" @row-clicked="showLessonDetails">
        <template v-if="$store.state.auth" #cell(edit)="data">
          <button class="btn btn-primary" @click="editLesson(data.item)">Editar</button>
          <button v-if="$store.state.auth" class="btn btn-danger" @click="deleteLesson(data.item)">Eliminar</button>
        </template> 
      </b-table>
    </div>
    <div v-else>
      <v-form  grid="true" style="max-width: 600px; margin: 0 auto;">
        <v-text-field
        v-model="search"
        label="Buscar"
        @input="filterLessons"
        >
        </v-text-field>
      </v-form>
      <b-table striped hover :items="filteredLessons" :fields="fields" @row-clicked="showLessonDetails"></b-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      fields: ['name', 'description', 'teacherId'],
      authFields: ['name', 'description', 'teacherId', 'edit'],
      search: '',
    };
  },
  computed:{
    ...mapState(['lessons']),
    filteredLessons() {
      return this.lessons.filter(lesson => {
        const name = lesson.name.toLowerCase();
        const description = lesson.description.toLowerCase();
        const teacherId = lesson.teacherId.toString().toLowerCase();
        const searchTerm = this.search.toLowerCase();
        return name.includes(searchTerm) || description.includes(searchTerm) || teacherId.includes(searchTerm);
      });
    },
  },
  methods:{
    showLessonDetails(item) {
      this.$router.push(`Leccion/${item.id}`)
    },
    addLesson() {
      this.$router.push(`Leccion/add`);
    },
    editLesson(item) {
      this.$router.push(`Leccion/${item.id}/edit`);
    },
    deleteLesson(item) {
      this.$store.dispatch('deleteLesson',item);
    },
    filterLessons() {
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>

</style>