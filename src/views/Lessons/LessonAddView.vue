<template>
  <div>
    <h1>Introduce los datos de la leccion</h1>
    <b-form @submit="onSubmit" @reset="onReset" >
      <b-form-group
        id="input-group-1"
        label="Nombre de la leccion:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          placeholder="Escribe el nombre de la leccion"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Profesor:" label-for="input-2">
      <b-form-select 
          v-model="form.teacherId"
          placeholder="Cual es el profesor?"
          :options="teacherOptions" 
          required>
      </b-form-select>
      </b-form-group>
      <b-form-group id="input-group-3" label="Hora de leccion:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="number"
          v-model="form.hour"
          placeholder="Escribe la hora de la leccion"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Minuto de leccion:" label-for="input-4">
        <b-form-input
          id="input-4"
          type="number"
          v-model="form.minute"
          placeholder="Escribe los minutos de la leccion"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-5" label="Capacidad de la leccion:" label-for="input-5">
        <b-form-input
          id="input-5"
          type="number"
          v-model="form.capacity"
          placeholder="Escribe cuantas personas caben en la leccion"
          required
        ></b-form-input>
      </b-form-group>
        <b-form-group id="input-group-6" label="Breve descripcion de la leccion:" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="form.description"
          placeholder="Escribe una descripcion de la leccion"
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
          name: '',
          teacherId: '',
          hour:'',
          minute:'',
          capacity:'',
          description:''
        },
      }
    },
    computed: {
  teacherOptions() {
    return this.$store.state.teachers.map(teacher => ({
      value: teacher.id,
      text: teacher.name
    }));
  }
},
    methods: {
  onSubmit(event) {
    event.preventDefault()
    fetch("https://localhost:7242/Lesson", {
      method: `POST`,
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.form)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.form.name = ''
        this.form.teacherId = ''
        this.form.hour = ''
        this.form.minute=''
        this.form.capacity=''
        this.form.description=''
        window.location.reload();
      })
  },
  onReset(event) {
    event.preventDefault()
    this.form.name = ''
        this.form.teacherId = ''
        this.form.hour = ''
        this.form.minute=''
        this.form.capacity=''
        this.form.description=''
  }
}
  }
</script>

<style lang="scss" scoped>

</style>