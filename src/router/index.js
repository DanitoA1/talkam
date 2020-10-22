import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import User from '../views/Layouts/User.vue';
import Overview from '../views/Overview.vue';
import Quiz from '../views/Quiz.vue';
import Board from '../views/Board.vue';
import BoardCreate from '../views/BoardCreate.vue';
import QuizCreate from '../views/QuizCreate.vue';
import BoardFill from '../views/BoardFill.vue';
import BoardResult from '../views/BoardResult.vue';
import BoardShare from '../views/BoardShare.vue';
import { auth } from '../firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/board/:id',
    name: 'BoardFill',
    component: BoardFill,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        redirect: {
          name: 'Overview',
        },
      },
      {
        path: 'overview',
        name: 'Overview',
        component: Overview,
      },
      {
        path: 'board',
        name: 'Board',
        component: Board,
      },
      {
        path: 'quiz',
        name: 'Quiz',
        component: Quiz,
      },
      {
        path: 'board/create',
        name: 'BoardCreate',
        component: BoardCreate,
      },
      {
        path: 'quiz/create',
        name: 'QuizCreate',
        component: QuizCreate,
      },
      {
        path: 'board/result',
        name: 'BoardResult',
        component: BoardResult,
      },
      {
        path: 'board/share/:id',
        name: 'BoardShare',
        component: BoardShare,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next('/');
  } else {
    next();
  }
});

export default router;
