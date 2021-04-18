import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userProfile: {},
    boards: [],
    boardResults: [],
    quizzes: [],
    Board: [],
    Quiz: [],
    userId: '',
    loginError: {},
    signUpError: {}
  },
  mutations: {
    setUserProfile (state, val) {
      state.userProfile = val
    },
    setBoards (state, val) {
      state.boards = val
    },
    setQuizzes (state, val) {
      state.quizzes = val
    },
    setBoard (state, val) {
      state.Board = val
    },
    setQuiz (state, val) {
      state.Quiz = val
    },
    setBoardResults (state, val) {
      state.boardResults = val
    },
    setUserid (state, val) {
      state.userId = val
    },
    setLoginError (state, val) {
      state.loginError = val
    },
    setSignUpError (state, val) {
      state.signUpError = val
    }
  },
  actions: {
    async login ({ dispatch, commit }, form) {
      // sign user in
      try {
        const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
      } catch (error) {
        commit('setLoginError', error)
        console.log(error)
      }
    },
    async fetchUserProfile ({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())
      // change route to dashboard
      if (router.currentRoute.path === '/login' || router.currentRoute.path === '/signup') {
        router.push('/user')
      }
    },
    async signup ({ dispatch, commit }, form) {
      // sign user up
      try {
        const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
        // create user profile object in userCollections
        await fb.usersCollection.doc(user.uid).set({
          name: form.name
        })
        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
      } catch (error) {
        commit('setSignUpError', error)
        console.log(error)
      }
    },
    async logout ({ commit }) {
      await fb.auth.signOut()
      // clear userProfile and redirect to /login
      commit('setUserProfile', {})
      router.push('/')
    },
    async publishBoard ({ state }, boardArray) {
      const newBoard = await fb.boardsCollection.doc(fb.auth.currentUser.uid).collection('userboards').add({
        createdOn: new Date(),
        board: boardArray,
        userName: state.userProfile.name,
        linkactive: true,
        totalBoardFill: 0
      })
      router.push({ name: 'BoardShare', params: { id: newBoard.id } })
    },
    async editBoard ({ state }, boardArray, id) {
      const editedBoard = await fb.boardsCollection.doc(fb.auth.currentUser.uid).collection('userboards').doc(id).set({
        createdOn: new Date(),
        board: boardArray,
        userName: state.userProfile.name,
        linkactive: true,
        totalBoardFill: 0
      })
      router.push({ name: 'BoardShare', params: { id: editedBoard.id } })
    },
    async publishQuiz ({ state }, quizArray) {
      const newQuiz = await fb.quizCollection.doc(fb.auth.currentUser.uid).collection('userquizzes').add({
        createdOn: new Date(),
        quiz: quizArray,
        userName: state.userProfile.name,
        linkactive: true,
        totalQuizFill: 0
      })
      router.push({ name: 'QuizShare', params: { id: newQuiz.id } })
    },
    // get board data for guest feedback
    async getBoard ({ commit }, idArray) {
      await fb.boardsCollection.doc(idArray[0]).collection('userboards').doc(idArray[1])
        .onSnapshot((doc) => {
          commit('setBoard', doc.data())
        })
    },
    async getQuiz ({ commit }, idArray) {
      await fb.quizCollection.doc(idArray[0]).collection('userquizzes').doc(idArray[1])
        .onSnapshot((doc) => {
          commit('setQuiz', doc.data())
        })
    },
    async getResults ({ commit }, id) {
      await fb.boardResults.doc(fb.auth.currentUser.uid).collection(id)
        .orderBy('createdOn', 'desc').onSnapshot((snapshot) => {
          const resultsArray = []
          snapshot.forEach((doc) => {
            const result = doc.data()
            result.id = doc.id

            resultsArray.push(result)
          })
          commit('setResults', resultsArray)
        })
    }
  },
  modules: {
  }
})

// Load up users board from firebase
fb.auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    const userId = user.uid
    fb.boardsCollection.doc(userId).collection('userboards')
      .orderBy('createdOn', 'desc').onSnapshot((snapshot) => {
        const boardsArray = []
        snapshot.forEach((doc) => {
          const board = doc.data()
          board.id = doc.id

          boardsArray.push(board)
        })

        store.commit('setBoards', boardsArray)
      })
    fb.quizCollection.doc(userId).collection('userquizzes')
      .orderBy('createdOn', 'desc').onSnapshot((snapshot) => {
        const quizzesArray = []
        snapshot.forEach((doc) => {
          const quiz = doc.data()
          quiz.id = doc.id

          quizzesArray.push(quiz)
        })

        store.commit('setQuizzes', quizzesArray)
      })
    store.commit('setUserid', userId)
  } else {
    // No user is signed in.
  }
})

export default store
