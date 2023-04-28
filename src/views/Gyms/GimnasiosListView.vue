<template>
  <div v-if="$store.state.auth">
    <h1>Lista de gimnasios</h1>
    <button class="btn btn-warning" @click="addGym()">Añadir gimnasio</button>

    <div>
      <label for="search">Buscar:</label>
      <input id="search" v-model="searchTerm" type="text" placeholder="Ingrese el nombre del gimnasio">
    </div>

    <b-table striped hover :items="filteredGyms" :fields="authFields" @row-clicked="showGymDetails">
      <template v-if="$store.state.auth" #cell(edit)="data">
        <button class="btn btn-primary" @click="editGym(data.item)">Editar</button>
        <button v-if="$store.state.auth" class="btn btn-danger" @click="deleteGym(data.item)">Eliminar</button>
      </template>
    </b-table>
  </div>

  <div v-else>
    <h1>Lista de gimnasios</h1>

    <div>
      <label for="search">Buscar:</label>
      <input id="search" v-model="searchTerm" type="text" placeholder="Ingrese el nombre del gimnasio">
    </div>

    <b-table striped hover :items="filteredGyms" :fields="fields" @row-clicked="showGymDetails"></b-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      authFields: ['name', 'address', 'monthPrice', 'edit'],
      fields: ['name', 'address', 'monthPrice'],
      searchTerm: '',
    };
  },

  computed: {
    ...mapState(['gyms']),

    filteredGyms() {
      if (this.searchTerm.trim() === '') {
        return this.gyms;
      }

      const searchTermLower = this.searchTerm.trim().toLowerCase();

      return this.gyms.filter((gym) => gym.name.toLowerCase().includes(searchTermLower));
    },
  },

  methods: {
    showGymDetails(item) {
      this.$router.push(`Gimnasio/${item.id}`);
    },

    addGym() {
      this.$router.push(`Gimnasio/add`);
    },

    editGym(item) {
      this.$router.push(`Gimnasio/${item.id}/edit`);
    },

    deleteGym(item) {
      fetch(`https://localhost:7242/Gym/${item.id}`, {
        method: `DELETE`,
        headers: {
          'Content-type': 'application/json',
        },
      }).then(() => {
        window.location.reload();
      });
    },
  },

  created() {},
};
</script>

<style lang="scss" scoped>


</style>