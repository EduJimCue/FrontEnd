<template>
  <div>
    <h1>Introduce tus datos</h1>
    <b-form @submit="onSubmit" @reset="onReset" >
      <b-form-group
        id="input-group-1"
        label="Nombre del usuario:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          placeholder="Escribe tu nombre"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Username:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.username"
          placeholder="Escribe tu username"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Contraseña:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          placeholder="Escribe tu contraseña"
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
          username: '',
          password:'',
          role:0,
          admin:0,
          signUpDate: new Date().toISOString()
        },
      }
    },
    methods: {
      onSubmit(event) {
  event.preventDefault()
  const formToSend = {
    name: this.form.name,
    username: this.form.username,
    password: this.form.password,
    role: !!this.form.role,
    admin: !!this.form.admin,
    signUpDate: new Date().toISOString()
  }
  fetch("https://localhost:7242/User", {
    method: `POST`,
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(formToSend)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.form.name = ''
      this.form.username = ''
      this.form.password = ''
      window.location.reload();
    })
},
  onReset(event) {
    event.preventDefault()
    this.form.name = ''
    this.form.username = ''
    this.form.password=''
  }
}
  }
</script>

<style lang="scss" scoped>

</style>