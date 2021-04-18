<!-- eslint-disable -->
<template>
  <v-container>
    <v-row class="justify-center">
      <v-col
        cols="12"
        sm="6"
      >
        <v-card
          color="deep-purple lighten-4"
          elevation="15"
          class="text-center mx-4"
          shaped
<<<<<<< HEAD
          to="/user/board"
=======
>>>>>>> 690145503035756665fc8c4b955a6420cea10c02
        >
          <v-card-title
            class="justify-center"
          >
<<<<<<< HEAD
            Feedback Summary
=======
              Feedback Summary
>>>>>>> 690145503035756665fc8c4b955a6420cea10c02
          </v-card-title>
          <div>
            <v-row no-gutters>
              <v-col cols="8" class="mx-auto">
                <v-row no-gutters>
                  <v-col cols="auto" class="mr-auto">
<<<<<<< HEAD
                    <v-card-text
                      v-if="boards.length < 2"
                      class="font-weight-bold"
                    >
                      Board
                    </v-card-text>
                    <v-card-text
                      v-else
                      class="font-weight-bold"
                    >
                      Boards
                    </v-card-text>
=======
                    <v-card-text class="font-weight-bold">Board(s)</v-card-text>
>>>>>>> 690145503035756665fc8c4b955a6420cea10c02
                  </v-col>
                  <v-col cols="auto">
                    <v-chip
                      class="ma-2"
                      color="orange"
                      text-color="white"
                    >
                      <v-avatar
                        color="orange darken-4"
                      >
<<<<<<< HEAD
                        {{ boards.length }}
=======
                        0
>>>>>>> 690145503035756665fc8c4b955a6420cea10c02
                      </v-avatar>
                    </v-chip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="8" class="mx-auto">
                <v-row no-gutters>
                  <v-col cols="auto" class="mr-auto">
                    <v-card-text class="font-weight-bold">Response(s)</v-card-text>
                  </v-col>
                  <v-col cols="auto">
                    <v-chip
                      class="ma-2"
                      color="orange"
                      text-color="white"
                    >
                      <v-avatar
                        color="orange darken-4"
                      >
                        0
                      </v-avatar>
                    </v-chip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
          <v-card-text>
<<<<<<< HEAD
            You currently have {{ boards.length }} feedback board(s) and 0 responses
=======
              You currently have 0 feedback board(s) and 0 responses
>>>>>>> 690145503035756665fc8c4b955a6420cea10c02
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-card
          color="deep-purple lighten-4"
          elevation="15"
          class="text-center mx-4"
          shaped
<<<<<<< HEAD
          to="/user/quiz"
=======
>>>>>>> 690145503035756665fc8c4b955a6420cea10c02
        >
          <v-card-title
            class="justify-center"
          >
<<<<<<< HEAD
            Quiz Summary
=======
              Quiz Summary
>>>>>>> 690145503035756665fc8c4b955a6420cea10c02
          </v-card-title>
          <div>
            <v-row no-gutters>
              <v-col cols="8" class="mx-auto">
                <v-row no-gutters>
                  <v-col cols="auto" class="mr-auto">
<<<<<<< HEAD
                    <v-card-text
                      v-if="quizzes.length < 2"
                      class="font-weight-bold"
                    >
                      Quiz
                    </v-card-text>
                    <v-card-text
                      v-else
                      class="font-weight-bold"
                    >
                      Quizzes
                    </v-card-text>
=======
                    <v-card-text class="font-weight-bold">Quiz(zes)</v-card-text>
>>>>>>> 690145503035756665fc8c4b955a6420cea10c02
                  </v-col>
                  <v-col cols="auto">
                    <v-chip
                      class="ma-2"
                      color="orange"
                      text-color="white"
                    >
                      <v-avatar
                        color="orange darken-4"
                      >
<<<<<<< HEAD
                        {{ quizzes.length }}
=======
                        0
>>>>>>> 690145503035756665fc8c4b955a6420cea10c02
                      </v-avatar>
                    </v-chip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="8" class="mx-auto">
                <v-row no-gutters>
                  <v-col cols="auto" class="mr-auto">
                    <v-card-text class="font-weight-bold">Entries</v-card-text>
                  </v-col>
                  <v-col cols="auto">
                    <v-chip
                      class="ma-2"
                      color="orange"
                      text-color="white"
                    >
                      <v-avatar
                        color="orange darken-4"
                      >
                        0
                      </v-avatar>
                    </v-chip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
          <v-card-text>
<<<<<<< HEAD
            You currently have {{ quizzes.length }} quiz(zes) and 0 entries
=======
              You currently have 0 quiz(zes) and 0 entries
>>>>>>> 690145503035756665fc8c4b955a6420cea10c02
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <p
          class="text-center h3 font-weight-bold"
<<<<<<< HEAD
        >Recent Boards</p>
        <v-divider></v-divider>
        <div
          v-if="!boards.length"
        >
          <p class="text-center body mt-3">You've not opened any feedback board yet!!</p>
        </div>
        <div
          v-else
          style="
          height: 270px;
          "
        >
          <v-card
            v-for="( board, index ) in boards" :key="index"
            class="d-flex align-content-center flex-wrap mb-2"
            elevation="4"
          >
            <v-card-text
              v-if="index < 4"
            >
              <v-row
                no-gutters
              >
                <v-col
                  @click="boardResult(index)"
                  cols="7"
                >
                  <span
                    class="font-weight-bold"
                  >
                    {{ board.board[0].Title }}
                  </span>
                </v-col>
                <v-col
                  class="d-flex justify-end"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="my-n2"
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="boardResult(index)"
                      >
                        <v-icon>
                          mdi-chart-bar-stacked
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>See board result</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="my-n2"
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="boardShare(index)"
                      >
                        <v-icon>
                          mdi-share
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Share board</span>
                  </v-tooltip>
                  <v-menu
                    bottom
                    offset-y
                    left
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template
                      v-slot:activator="{ on, attrs }"
                    >
                      <v-btn
                        class="my-n2"
                        icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>
                          mdi-dots-vertical
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-list
                      dense
                    >
                      <v-list-item
                        link
                        @click="linkUpdate(index, board.linkactive)"
                      >
                        <v-list-item-title>
                          <v-row
                            class="mt-3 mb-n3"
                            no-gutters
                          >
                            <span
                              v-if="board.linkactive"
                            >Link Active</span>
                            <span
                              v-else
                            >Link Inactive</span>
                            <v-switch
                              :input-value="board.linkactive"
                              disabled
                              class="mt-n2 mx-1"
                              color="green"
                            ></v-switch>
                          </v-row>
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        link
                        @click="boardDelete(index)"
                      >
                        <v-list-item-title>
                          Delete
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
        <div class="text-center mt-5">
          <v-btn
            color="black"
            rounded
            to="/user/board/create"
            dark
          ><v-icon color="success">mdi-plus</v-icon>Add New Board</v-btn>
=======
        >Boards</p>
        <v-divider></v-divider>
        <p class="text-center body mt-3">You've not opened any feedback board yet!!</p>
        <div class="text-center">
          <v-btn
            color="success"
            rounded
            to="/user/board/create"
          ><v-icon dark>mdi-plus</v-icon>Add New Board</v-btn>
>>>>>>> 690145503035756665fc8c4b955a6420cea10c02
        </div>
      </v-col>

      <v-col
        cols="12"
        sm="6"
      >
        <p
          class="text-center h3 font-weight-bold"
<<<<<<< HEAD
        >Recent Quizzes</p>
        <v-divider></v-divider>
        <div
          v-if="!quizzes.length"
        >
          <p class="text-center body mt-3">You've not created any quiz yet!!</p>
        </div>
        <div
          v-else
          style="
          height: 270px;
          "
        >
          <v-card
            v-for="( quiz, index ) in quizzes" :key="index"
            class="d-flex align-content-center flex-wrap mb-2"
            elevation="4"
          >
            <v-card-text
              v-if="index < 4"
            >
              <v-row
                no-gutters
              >
                <v-col
                  @click="quizResult(index)"
                >
                  <span
                    class="font-weight-bold"
                  >
                    {{ quiz.quiz[0].Title }}
                  </span>
                </v-col>
                <v-col
                  class="d-flex justify-end"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="my-n2"
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="quizResult(index)"
                      >
                        <v-icon>
                          mdi-chart-bar-stacked
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>See quiz result</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="my-n2"
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="quizShare(index)"
                      >
                        <v-icon>
                          mdi-share
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Share quiz</span>
                  </v-tooltip>
                  <v-menu
                    bottom
                    offset-y
                    left
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template
                      v-slot:activator="{ on, attrs }"
                    >
                      <v-btn
                        class="my-n2"
                        icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>
                          mdi-dots-vertical
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-list
                      dense
                    >
                      <v-list-item
                        link
                        @click="linkUpdate2(index, quiz.linkactive)"
                      >
                        <v-list-item-title>
                          <v-row
                            class="mt-3 mb-n3"
                            no-gutters
                          >
                            <span
                              v-if="quiz.linkactive"
                            >Link Active</span>
                            <span
                              v-else
                            >Link Inactive</span>
                            <v-switch
                              :input-value="quiz.linkactive"
                              disabled
                              class="mt-n2 mx-1"
                              color="green"
                            ></v-switch>
                          </v-row>
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        link
                        @click="quizDelete(index)"
                      >
                        <v-list-item-title>
                          Delete
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
        <div class="text-center mt-5">
          <v-btn
            color="black"
            rounded
            to="/user/quiz/create"
            dark
          ><v-icon color="success">mdi-plus</v-icon>Add New Quiz</v-btn>
=======
        >Quizzes</p>
        <v-divider></v-divider>
        <p class="text-center body mt-3">You've not created any quiz yet!!</p>
        <div class="text-center">
          <v-btn
            color="success"
            rounded
            to="/user/quiz/create"
          ><v-icon dark>mdi-plus</v-icon>Add New Quiz</v-btn>
>>>>>>> 690145503035756665fc8c4b955a6420cea10c02
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
<<<<<<< HEAD
import { boardsCollection, quizCollection } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'Overview',
  computed: {
    ...mapState(['boards']),
    ...mapState(['quizzes']),
    ...mapState(['userId'])
  },
  methods: {
    boardShare (index) {
      this.$router.push({ name: 'BoardShare', params: { id: this.boards[index].id } })
    },
    boardResult (index) {
      this.$router.push({ name: 'BoardResult', params: { id: this.boards[index].id } })
    },
    async linkUpdate (index, state) {
      if (state) {
        await boardsCollection.doc(this.userId).collection('userboards').doc(this.boards[index].id).update({
          linkactive: false
        })
      } else {
        await boardsCollection.doc(this.userId).collection('userboards').doc(this.boards[index].id).update({
          linkactive: true
        })
      }
    },
    async boardDelete (index) {
      await boardsCollection.doc(this.userId).collection('userboards').doc(this.boards[index].id).delete()
    },
    quizShare (index) {
      this.$router.push({ name: 'QuizShare', params: { id: this.quizzes[index].id } })
    },
    quizResult (index) {
      this.$router.push({ name: 'QuizResult', params: { id: this.quizzes[index].id } })
    },
    async linkUpdate2 (index, state) {
      if (state) {
        await quizCollection.doc(this.userId).collection('userquizzes').doc(this.quizzes[index].id).update({
          linkactive: false
        })
      } else {
        await quizCollection.doc(this.userId).collection('userquizzes').doc(this.quizzes[index].id).update({
          linkactive: true
        })
      }
    },
    async quizDelete (index) {
      await quizCollection.doc(this.userId).collection('userquizzes').doc(this.quizzes[index].id).delete()
    }
  }
}
=======
export default {
  name: 'Overview',
};
>>>>>>> 690145503035756665fc8c4b955a6420cea10c02
</script>
