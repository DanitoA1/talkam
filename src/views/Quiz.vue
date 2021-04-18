<!-- eslint-disable -->
<template>
  <v-container class="mx-auto">
    <div
      v-if="!quizzes.length"
    >
      <p
          class="text-center h3 font-weight-bold deep-purple--text"
        >Quiz Page</p>
        <v-divider></v-divider>
      <v-img
        class="mx-auto my-4"
        src="/img/SVG/mobile_life.svg"
        contain
        max-height="600px"
        max-width="400"
      ></v-img>
      <p class="text-center body mt-3">You've not created any quiz yet!!</p>
      <div class="text-center mt-6">
        <v-btn
          color="black"
          rounded
          to="/user/quiz/create"
          dark
        ><v-icon dark color="success">mdi-plus</v-icon>Add New Quiz</v-btn>
      </div>  
    </div>
    <div
      v-else
    >
      <div class="text-center my-4">
        <p
          v-if="quizzes.length > 1"
          class="text-center h3 font-weight-bold deep-purple--text text-capitalize"
        >
          Your quizzes
        </p>
        <p
          v-else
          class="text-center h3 font-weight-bold deep-purple--text text-capitalize"
        >
          Your Quiz
        </p>
      </div>
      <v-card
        v-for="( quiz, index ) in quizzes" :key="index"
        class="d-flex align-content-center flex-wrap mb-2"
        elevation="4"
      >
        <v-card-text>
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
                    @click="linkUpdate(index, quiz.linkactive)"
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
      <div class="text-center mt-10">
        <v-btn
          color="success"
          rounded
          to="/user/quiz/create"
        ><v-icon dark>mdi-plus</v-icon>Add New Quiz</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { quizCollection } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'Quiz',
  data () {
    return {
      //
    }
  },
  computed: {
    ...mapState(['quizzes']),
    ...mapState(['userId'])
  },
  methods: {
    quizShare (index) {
      this.$router.push({ name: 'QuizShare', params: { id: this.quizzes[index].id } })
    },
    quizResult (index) {
      this.$router.push({ name: 'QuizResult', params: { id: this.quizzes[index].id } })
    },
    async linkUpdate (index, state) {
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
</script>
