import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Home2 from '../views/Home2.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import User from '../views/Layouts/User.vue'
import Overview from '../views/Overview.vue'
import Quiz from '../views/Quiz.vue'
import Board from '../views/Board.vue'
import BoardCreate from '../views/BoardCreate.vue'
import QuizCreate from '../views/QuizCreate.vue'
import BoardFill from '../views/BoardFill.vue'
import QuizFill from '../views/QuizFill.vue'
import BoardResult from '../views/BoardResult.vue'
import BoardEdit from '../views/BoardEdit.vue'
import QuizResult from '../views/QuizResult.vue'
import BoardShare from '../views/BoardShare.vue'
import QuizShare from '../views/QuizShare.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/2',
    name: 'Home2',
    component: Home2
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/board/:id',
    name: 'BoardFill',
    component: BoardFill
  },
  {
    path: '/quiz/:id',
    name: 'QuizFill',
    component: QuizFill
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        redirect: {
          name: 'Overview'
        }
      },
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'board',
        name: 'Board',
        component: Board
      },
      {
        path: 'quiz',
        name: 'Quiz',
        component: Quiz
      },
      {
        path: 'board/create',
        name: 'BoardCreate',
        component: BoardCreate
      },
      {
        path: 'quiz/create',
        name: 'QuizCreate',
        component: QuizCreate
      },
      {
        path: 'board/result/:id',
        name: 'BoardResult',
        component: BoardResult
      },
      {
        path: 'board/edit/:id',
        name: 'BoardEdit',
        component: BoardEdit
      },
      {
        path: 'quiz/result/:id',
        name: 'QuizResult',
        component: QuizResult
      },
      {
        path: 'board/share/:id',
        name: 'BoardShare',
        component: BoardShare
      },
      {
        path: 'quiz/share/:id',
        name: 'QuizShare',
        component: QuizShare
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
