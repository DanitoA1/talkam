import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';
import router from '../router/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userProfile: {},
    boards: [],
    userId: '',
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setBoards(state, val) {
      state.boards = val;
    },
    setUserid(state, val) {
      state.userId = val;
    },
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password);

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      commit('setUserProfile', userProfile.data());
      // change route to dashboard
      if (router.currentRoute.path === '/') {
        router.push('/user');
      }
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password);
      // create user profile object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
      });
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user);
    },
    async logout({ commit }) {
      await fb.auth.signOut();
      // clear userProfile and redirect to /login
      commit('setUserProfile', {});
      router.push('/');
    },
    async publishBoard({ state }, boardArray) {
      const newBoard = await fb.boardsCollection.doc(fb.auth.currentUser.uid).collection('userboards').add({
        createdOn: new Date(),
        board: boardArray,
        userName: state.userProfile.name,
        totalBoardFill: 0,
      });
      router.push({ name: 'BoardShare', params: { id: newBoard.id } });
      console.log('Document just created with id:', newBoard.id);
    },
  },
  modules: {
  },
});

// Load up users board from firebase
fb.auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    const userId = user.uid;
    fb.boardsCollection.doc(userId).collection('userboards')
      .orderBy('createdOn', 'desc').onSnapshot((snapshot) => {
        const boardsArray = [];
        snapshot.forEach((doc) => {
          const board = doc.data();
          board.id = doc.id;

          boardsArray.push(board);
        });

        store.commit('setBoards', boardsArray);
      });
    store.commit('setUserid', userId);
  } else {
    // No user is signed in.
  }
});

export default store;
