import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/AboutView.vue')
  },
  {
    path: '/Gimnasio',
    name: 'Lista Gimnasios',
    component: () => import( '../views/Gyms/GimnasiosListView.vue')
  },
  {
    path: '/Leccion',
    name: 'Lista Leccion',
    component: () => import( '../views/Lessons/LessonsListView.vue')
  },
  {
    path: '/Gimnasio/add',
    name: 'Añadir Gimnasio',
    component: () => import( '../views/Gyms/GimnasioAddView.vue')
  },
  {
    path: '/Leccion/add',
    name: 'Añadir Leccion',
    component: () => import( '../views/Lessons/LessonAddView.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import( '../views/Users/UserLoginView.vue')
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: () => import( '../views/Users/UserAddView.vue')
  },
  {
    path: '/User/:id/edit',
    name: 'Modificacion Usuario',
    component: () => import( '../views/Users/UserEditView.vue')
  },
  {
    path: '/Gimnasio/:id',
    name: 'Detalle Gimnasio',
    component: () => import( '../views/Gyms/GimnasioView.vue')
  },
  {
    path: '/Gimnasio/:id/edit',
    name: 'Modificacion Gimnasio',
    component: () => import( '../views/Gyms/GimnasioEditView.vue')
  },
  {
    path: '/Leccion/:id/edit',
    name: 'Modificacion Leccion',
    component: () => import( '../views/Lessons/LessonEditView.vue')
  },
  {
    path: '/Leccion/:id',
    name: 'Detalle Leccion',
    component: () => import( '../views/Lessons/LessonView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
