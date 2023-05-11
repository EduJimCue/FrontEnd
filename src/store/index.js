import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gyms:[],
    lessons:[],
    teachers:[],
    userlessons:[],
    formLesson: {
      id: '',
      name: '',
      teacherId: '',
      hour: '',
      minute: '',
      capacity: '',
      description: ''
    },
    formGym:{
      id:'',
      name:'',
      description:'',
      address:'',
      monthPrice:''
    },
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
    setUserLessons(state, payload) {
      state.userlessons = payload;
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
    },
    addLesson(state, newLesson) {
      state.lessons.push(newLesson);
    },
    addGym(state, newGym) {
      state.gyms.push(newGym);
    },
    setLessonData(state, data) {
      state.formLesson.id=data.id
      state.formLesson.name = data.name;
      state.formLesson.teacherId = data.teacherId;
      state.formLesson.hour = data.hour;
      state.formLesson.minute = data.minute;
      state.formLesson.capacity = data.capacity;
      state.formLesson.description = data.description;
    },
    setGymData(state, data) {
      state.formGym.id=data.id
      state.formGym.name = data.name;
      state.formGym.address = data.address;
      state.formGym.description = data.description;
      state.formGym.monthPrice = data.monthPrice;
    },
    addUser(){
      alert("Se ha añadido el usuario")
    }
  },
  actions: {
    fetchGyms({commit}){
      fetch("http://localhost:6376/Gym/GetAllGyms")
        .then(response => response.json())
        .then(response => commit('setGyms', response));
    },
    fetchTeachers({commit}){
      fetch("http://localhost:6376/GetByTeacher")
        .then(response => response.json())
        .then(response => commit('setTeacher', response));
    },
    fetchLessons({commit}){
      fetch("http://localhost:6376/Lesson/GetAllLessons")
        .then(response => response.json())
        .then(response => commit('setLessons', response));
    },

    fetchUser({commit}, { username, password }){
      fetch(`http://localhost:6376/${username}/${password}`, {
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
      commit('setUserLessons', [])
    },
    fetchUserLessons({ commit, state }) {
      fetch(`http://localhost:6376/GetUserLessonUser/${state.user.id}`)
        .then(response => response.json())
        .then(response => {
          commit('setUserLessons', response);
        });
    },
    addLesson({ commit }, lessonData) {
      fetch("http://localhost:6376/Lesson/PostLesson", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lessonData)
      })
      .then(response => response.json())
      .then(response => {commit('addLesson', response)});
    },
    addGym({ commit }, gymData) {
      fetch("http://localhost:6376/Gym/PostGym", {
        method: `POST`,
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(gymData)
      })
      .then(response => response.json())
      .then(response => {commit('addGym', response)});
    },
    addUser({ commit }, userData) {
      fetch("http://localhost:6376/User/PostUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(response => response.json())
      commit('addUser');
    },
    async fetchLessonById({ commit }, lessonId) {
      try {
        const response = await fetch(`http://localhost:6376/Lesson/GetLessonId/${lessonId}`);
        const data = await response.json();
        commit('setLessonData', data);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchGymById({ commit }, gymId) {
      try {
        const response = await fetch(`http://localhost:6376/Gym/GetIdGym/${gymId}`);
        const data = await response.json();
        commit('setGymData', data);
      } catch (error) {
        console.log(error);
      }
    },
    deleteLesson({ commit }, lesson) {
      fetch(`http://localhost:6376/Lesson/DeleteLesson/${lesson.id}`, {
        method: `DELETE`,
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(() => {
          console.log(commit)
          this.dispatch('fetchLessons');
        })
    },
    deleteGym({ commit }, gym) {
      fetch(`http://localhost:6376/Gym/DeleteGym/${gym.id}`, {
        method: `DELETE`,
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(() => {
          console.log(commit)
          this.dispatch('fetchGyms');
        })
    },
    
    deleteUser({ commit, state }) {
      fetch(`http://localhost:6376/User/DeleteUser/${state.user.id}`, {
      method: `DELETE`,
      headers: {
      "Content-type": "application/json"
      }
      })
        .then(() => {
          commit('setUser', null)
        })
    },
    actualizeLesson({ commit }, lessonData) {
      fetch(`http://localhost:6376/Lesson/PutLesson`, {
          method: `PUT`,
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(lessonData),
        })
        .then(() => {
          console.log(commit)
          this.dispatch('fetchLessons');
        })
    }, 
    actualizeGym({ commit }, gymData) {
      fetch(`http://localhost:6376/Gym/PutGym`, {
          method: `PUT`,
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(gymData),
        })
        .then(() => {
          console.log(commit)
          this.dispatch('fetchGyms');
        })
    }, 
    actualizeUser({ commit }, userData) {
      fetch(`http://localhost:6376/User/PutUser`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      commit('setUser', null)
    }, 
  },
  modules: {
  }
})
