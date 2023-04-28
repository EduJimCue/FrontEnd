<template>
  <div>
    <h1>Modifica los datos del gimnasio</h1>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Nombre del gimnasio:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          placeholder="Escribe el nombre del gimnasio"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Direccion del gimnasio:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.address"
          placeholder="Escribe la direccion del gimnasio"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Precio de la mensualidad:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          type="number"
          v-model="form.monthPrice"
          placeholder="Escribe el precio de la mensualidad"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Breve descripcion del gimnasio:"
        label-for="input-4"
      >
        <b-form-input
          id="input-4"
          v-model="form.description"
          placeholder="Escribe una descripcion del gimnasio"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          id : this.$route.params.id,
          name: '',
          address: '',
          monthPrice: '',
          description: '',
          signUpDate: new Date().toISOString(),
        },
        gymId: null,
        loading: true,
      };
    },
    methods: {
      fetchGymData() {
        fetch(`https://localhost:7242/Gym/${this.gymId}`)
          .then((response) => response.json())
          .then((data) => {
            this.form.name = data.name;
            this.form.address = data.address;
            this.form.monthPrice = data.monthPrice;
            this.form.description = data.description;
            this.loading = false;
          });
      },
      onSubmit(event) {
        event.preventDefault();
        fetch(`https://localhost:7242/Gym`, {
          method: `PUT`,
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(this.form),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            this.form.name = '';
            this.form.address = '';
            this.form.monthPrice = '';
            this.form.description = '';
          });
      },
      onReset(event) {
        event.preventDefault();
        this.form.name = '';
        this.form.address = '';
        this.form.monthPrice = '';
        this.form.description = '';
      },
    },
    created() {
      this.gymId = this.$route.params.id;
      this.fetchGymData();
    },
  }
</script>

<style lang="scss"></style>