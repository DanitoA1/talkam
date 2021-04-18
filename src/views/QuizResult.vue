<template>
  <v-container>
    <div
      v-if="Results && Quiz"
    >
      <div
        class="d-flex justify-end mb-2"
      >
        <v-btn
          class="text-capitalize"
          color="black"
          dark
          small
          rounded
          to="/user/quiz"
        >
          <v-icon>
            mdi-arrow-left
          </v-icon>
          All Quiz
        </v-btn>
      </div>
      <v-card
        class="mb-3"
        rounded="xl"
        elevation="8"
      >
        <v-system-bar
          color="deep-purple lighten-4"
        >
          <div
            class="ml-6"
          >
            Total Response: {{ Results.length }}
          </div>
        </v-system-bar>
        <div
          class="text-center"
        >
          <v-card-title
            class="justify-center deep-purple--text"
          >
            {{ Quiz[0].Title }}
          </v-card-title>
          <v-card-subtitle
            class=""
          >
            {{ Quiz[0].Caption }}
          </v-card-subtitle>
        </div>
      </v-card>
      <div
        v-if="Results.length"
      >
        <v-expansion-panels
          class="sendBack"
          focusable
          popout
        >
          <v-expansion-panel
            v-for="(result, i) in Results" :key="i"
            class="mb-2"
          >
            <v-expansion-panel-header>
              <v-row
                no-gutters
              >
                <v-col>
                  <span
                    class="font-weight-bold"
                  >
                    {{ i + 1 }}.{{ result.Name }}
                  </span>
                </v-col>
                <v-col
                  class="d-flex justify-end"
                >
                  Score: {{ result.score }}% <span :class="result.score > 9 ? 'ml-4':'ml-6' ">
                    {{ totalQuestion - result.wrongans.length }}/{{ totalQuestion }}
                  </span>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div
                v-if="result.score == 100"
                class="mx-auto"
              >
                <v-img
                  class="mx-auto my-4"
                  src="/img/SVG/scoredall.svg"
                  contain
                  max-height="600px"
                  max-width="400"
                ></v-img>
              </div>
              <div
                v-else
              >
                <v-carousel
                  class="my-3"
                  :show-arrows="result.wrongans.length > 1"
                  show-arrows-on-hover
                  hide-delimiter-background
                  height="400"
                >
                  <v-carousel-item
                    v-for="(ques, i) in result.wrongans"
                    :key="i"
                  >
                    <v-card
                      :color="colorSelect(i)"
                      rounded="xl"
                      height="100%"
                    >
                      <v-responsive
                        class="overflow-y-auto"
                        height="100%"
                      >
                        <v-row
                          class="fill-height"
                          align="center"
                          justify="center"
                        >
                          <v-col>
                            <v-row
                              justify="center"
                            >
                              <v-card-title>
                                Question {{ ques + 1 }}
                              </v-card-title>
                            </v-row>
                            <v-row
                              justify="center"
                            >
                              <p
                                class="mx-4 text-center"
                              >
                                {{ quizzes[0].quiz[0].questionsList[ques].question.body }}
                              </p>
                            </v-row>
                            <div
                              v-if="result.Result[ques].result.answer.length"
                            >
                              <v-row
                                justify="center"
                                v-for="(ans, j) in result.Result[ques].result.answer"
                                :key="j"
                              >
                                <p
                                  v-if="ans"
                                  class="white black--text rounded-xl py-1 px-2 mx-6 text-center"
                                >
                                  {{ ans }}
                                </p>
                              </v-row>
                            </div>
                            <div
                              v-else
                            >
                              <v-row
                                justify="center"
                              >
                                <p
                                  class="black--text"
                                >
                                  Skipped
                                </p>
                              </v-row>
                            </div>
                          </v-col>
                        </v-row>
                      </v-responsive>
                    </v-card>
                  </v-carousel-item>
                </v-carousel>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <div class="text-center">
          <v-btn
            class="text-capitalize mt-5"
            color="black"
            rounded
            @click="quizShare()"
            dark
          >Share Quiz Link<v-icon color="success">mdi-share</v-icon></v-btn>
        </div>
      </div>
      <div
        v-else
      >
        <v-container class="mx-auto mt-5">
          <v-divider></v-divider>
          <v-img
            class="mx-auto my-4"
            src="/img/SVG/emptyboard.svg"
            contain
            max-height="600px"
            max-width="400"
          ></v-img>
          <p class="text-center body mt-3">No one has taken your quiz yet !!!</p>
          <div class="text-center">
            <v-btn
              class="text-capitalize mt-5"
              color="black"
              rounded
              @click="quizShare()"
              dark
            >Share Quiz Link<v-icon color="success">mdi-share</v-icon></v-btn>
          </div>
        </v-container>
      </div>
      <!--v-dialog
        v-model="dialog"
      >
        <v-card>
          <v-card-title>
            just some testing of this thing
          </v-card-title>
        </v-card>
      </v-dialog>
      <v-btn
        @click="test()"
      >
        Test
      </v-btn-->
    </div>
  </v-container>
</template>

<script>
// import BoardResult from '@/quizzes.json'
import { quizResults, auth } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'QuizResult',
  components: {
    //
  },
  data () {
    return {
      Results: [],
      alphabetArray: [],
      id: 0,
      totalQuestion: 0,
      dialog: false,
      colors: [
        'orange',
        'green',
        'red lighten-1',
        'purple lighten-2',
        'secondary'
      ],
      componentKey: 0
    }
  },
  computed: {
    ...mapState(['quizzes']),
    Quiz () {
      const quizIndex = this.quizzes.findIndex((x) => x.id === this.id)
      const quizArray = []
      quizArray.push(JSON.parse(JSON.stringify(this.quizzes[quizIndex].quiz[0])))
      return quizArray
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getResults()
  },
  mounted () {
    this.alphaGenerate()
  },
  methods: {
    async getResults () {
      await quizResults.doc(auth.currentUser.uid).collection(this.id)
        .orderBy('createdOn', 'desc').onSnapshot((snapshot) => {
          const res = []
          snapshot.forEach((doc) => {
            const result = doc.data()
            result.id = doc.id

            res.push(result)
          })
          this.Results = res.sort((a, b) => parseInt(b.score) - parseInt(a.score))
          this.getTotal()
        })
    },
    alphaGenerate () {
      const alphaArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
      this.alphabetArray = alphaArray
    },
    responseArray () {
      this.Responses = []
      this.Quiz[0].questionsList.forEach((ques) => {
        this.Responses.push(0)
      })
      for (let i = 0; i < this.Results.length; i++) {
        for (let j = 0; j < this.Results[i].Result.length; j++) {
          if (this.Results[i].Result[j].result.answer.length > 0) {
            this.Responses[j] += 1
          }
        }
      }
    },
    getTotal () {
      this.totalQuestion = this.quizzes[0].quiz[0].questionsList.length
    },
    colorSelect (i) {
      i = i % 5
      return this.colors[i]
    },
    test () {
      this.dialog = true
    },
    wordtextResGen () {
      this.textResult = []
      this.Quiz[0].questionsList.forEach((que, i) => {
        const quest = this.Quiz[0].questionsList[i].question
        if (quest.type === 'WORD_COUNT' || quest.type === 'TEXT') {
          const resArray = []
          this.Results.forEach((res, j) => {
            const ans = this.Results[j].Result[i].result.answer
            if (ans.length) {
              resArray.push(this.Results[j].Result[i].result.answer[0])
            }
          })
          this.textResult.push(resArray)
        } else {
          this.textResult.push(0)
        }
      })
      const currentRes = this.textResult
      const countBox = []
      var count = {}
      currentRes.forEach((doc, i) => {
        if (currentRes[i] === 0) {
          countBox.push(0)
        } else if (currentRes[i].length) {
          currentRes[i].forEach(function (x) {
            count[x] = (count[x] || 0) + 1
          })
          const sortedCount = this.wordtextSort(count)
          countBox.push(sortedCount)
          count = {}
        }
      })
      this.counts = countBox
    },
    wordtextSort (results) {
      const sortable = Object.entries(results)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
      return sortable
    },
    rateScaleMethod () {
      this.rateScaleResult = []
      this.Quiz[0].questionsList.forEach((que, i) => {
        const quest = this.Quiz[0].questionsList[i].question
        if (quest.type === 'RATING' || quest.type === 'SCALE') {
          var sum = 0
          var counter = 0
          this.Results.forEach((res, j) => {
            const ans = this.Results[j].Result[i].result.answer
            if (ans.length && ans[0] !== 'NaN') {
              const x = parseFloat(ans[0])
              sum += x
              counter++
            }
          })
          let m = sum / counter
          if (quest.type === 'RATING') {
            m = (Math.ceil(m * 2) / 2).toFixed(1)
          } else if (quest.Percentage) {
            m = Math.round(m)
          } else {
            m = Math.round(m / 10) * 10
          }
          this.rateScaleResult.push(m)
        } else {
          this.rateScaleResult.push(0)
        }
      })
    },
    quizShare () {
      this.$router.push({ name: 'QuizShare', params: { id: this.id } })
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    reRender () {
      this.componentKey += 1
    },
    changeData () {
      this.datacollection.datasets[0].data = [45, 15]
      this.reRender()
    }
  }
}
</script>

<style scoped>
  .sendBack {
    z-index: 0;
  }
</style>
