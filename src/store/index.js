import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gyms:[],
    lessons:[],
    teachers:[],
    user:null,
    auth:0
  },
  getters: {
  },
  mutations: {
    setGyms(state, payload){
      state.gyms=payload
    },
    setTeacher(state, payload){
      state.teachers=payload
    },
    setLessons(state, payload){
      state.lessons=payload
    },
    updateUser(state, user) {
      state.user = user
    },
    setUser(state, payload) {
      if (payload!=null) {
     router.push("/")
      }
      state.user = payload
      localStorage.setItem('user', JSON.stringify(payload));
      state.auth = (payload && payload.admin) ? 1 : 0;
    },
    initializeStore(state) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        state.user = user;
      }
    }
  },
  actions: {
    fetchGyms({commit}){
      fetch("https://localhost:7242/Gym")
        .then(response => response.json())
        .then(response => commit('setGyms', response));
    },
    fetchTeachers({commit}){
      fetch("https://localhost:7242/Teacher")
        .then(response => response.json())
        .then(response => commit('setTeacher', response));
    },
    fetchLessons({commit}){
      fetch("https://localhost:7242/Lesson")
        .then(response => response.json())
        .then(response => commit('setLessons', response));
        console.log("alo")
    },

    fetchUser({commit}, { username, password }){
      fetch(`https://localhost:7242/${username}/${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then(response => response.json())
      .then(response => {commit('setUser',response);});
    },
    logout({ commit }) {
      commit('setUser', null )
    },
  },
  
  modules: {
  }
})
