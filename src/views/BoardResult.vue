<template>
  <v-container>
    <div
      v-if="Results && Board"
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
          to="/user/board"
        >
          <v-icon>
            mdi-arrow-left
          </v-icon>
          All Boards
        </v-btn>
      </div>
      <v-card
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
            {{ Board[0].Title }}
          </v-card-title>
          <v-card-subtitle
            class=""
          >
            {{ Board[0].Caption }}
          </v-card-subtitle>
        </div>
      </v-card>
      <div
        v-if="Results.length"
      >
        <div
          v-for="(question, index) in Board[0].questionsList"
          :key="index"
        >
          <div
            v-if="question.question.type === 'BOOLEAN' || question.question.type === 'SINGLE_CHOICE' || question.question.type === 'MULTI_CHOICE'"
          >
            <v-lazy
              :options="{
                threshold: .5
              }"
              min-height="200"
              transition="fade-transition"
            >
              <v-card
                class="my-4"
                rounded="t-xl"
                elevation="10"
                style="
                  border-left: 5px solid #673AB7 !important;
                "
              >
                <v-card-text>
                  {{ index + 1 }}. {{ question.question.body }}
                </v-card-text>
                <PieChart
                  v-if="question.question.options.length <= 3"
                  :chart-data="datacollection[index]"
                  :key="componentKey"
                  class="mx-auto mt-2"
                  style="
                    max-width: 350px;
                  "
                />
                <v-responsive
                  class="overflow-x-auto mx-auto"
                  :max-width="$vuetify.breakpoint.mdAndUp ? '500' : '100%'"
                >
                  <BarChart
                    v-if="question.question.options.length > 3"
                    :chart-data="datacollection[index]"
                    :key="componentKey"
                    class="mt-2"
                    :height="400"
                    :width="600"
                  />
                </v-responsive>
                <v-card-text
                  class="text-center mx-auto"
                >
                  <span
                    class="mx-2"
                  >
                    Responses: {{ Res[index] }}
                  </span>
                  <span
                    class="mx-2"
                  >
                    Skipped: {{ Results.length - Res[index] }}
                  </span>
                </v-card-text>
                <div
                  class="mx-md-16"
                >
                  <v-responsive
                    class="overflow-y-auto"
                    max-height="400"
                  >
                    <v-list
                      dense
                      shaped
                    >
                      <v-list-item-group
                        color="primary"
                      >
                        <v-list-item
                          v-for="(item, i) in question.question.options"
                          :key="i"
                          inactive
                        >
                          <v-list-item-content>
                            <v-list-item-subtitle v-text="alphabetArray[i] + '. ' + item.body" />
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-responsive>
                </div>
              </v-card>
            </v-lazy>
          </div>
          <!--div
            v-if="question.question.type === 'SINGLE_CHOICE'"
          >
            <v-lazy
              :options="{
                threshold: .5
              }"
              min-height="200"
              transition="fade-transition"
            >
              <v-card
                class="my-4 pb-4"
                rounded="t-xl"
                elevation="6"
                style="
                  border-left: 5px solid #673AB7 !important;
                "
              >
                <v-card-text>
                  {{ index + 1 }}. {{ question.question.body }}
                </v-card-text>
                <BarChart
                  class="mx-auto mt-2"
                  style="
                    max-width: 400px;
                  "
                />
                <v-card-text
                  class="text-center mx-auto"
                >
                  <span
                    class="mx-2"
                  >
                    Responses: {{ Res[index] }}
                  </span>
                  <span
                    class="mx-2"
                  >
                    Skipped: {{ Results.length - Res[index] }}
                  </span>
                </v-card-text>
                <div
                  class="mx-md-16"
                >
                  <v-responsive
                    class="overflow-y-auto"
                    max-height="400"
                  >
                    <v-list
                      dense
                      shaped
                    >
                      <v-list-item-group
                        color="primary"
                      >
                        <v-list-item
                          v-for="(item, i) in question.question.options"
                          :key="i"
                          inactive
                        >
                          <v-list-item-content>
                            <v-list-item-subtitle v-text="i+1 + '. ' + item.body" />
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-responsive>
                </div>
              </v-card>
            </v-lazy>
          </div>
          <div
            v-if="question.question.type === 'MULTI_CHOICE'"
          >
            <v-lazy
              :options="{
                threshold: .5
              }"
              min-height="200"
              transition="fade-transition"
            >
              <v-card
                class="my-4 pa-4"
                rounded="t-xl"
                elevation="6"
                style="
                  border-left: 5px solid #673AB7 !important;
                "
              >
                <v-card-text>
                  {{ index + 1 }}. {{ question.question.body }}
                </v-card-text>
                <v-responsive
                  class="overflow-x-auto mx-auto"
                  :max-width="$vuetify.breakpoint.mdAndUp ? '500' : '100%'"
                >
                  <BarChart
                    class="mt-2"
                    :height="400"
                    :width="600"
                  />
                </v-responsive>
                <v-card-text
                  class="text-center mx-auto"
                >
                  <span
                    class="mx-2"
                  >
                    Responses: {{ Res[index] }}
                  </span>
                  <span
                    class="mx-2"
                  >
                    Skipped: {{ Results.length - Res[index] }}
                  </span>
                </v-card-text>
                <div
                  class="mx-md-16"
                >
                  <v-responsive
                    class="overflow-y-auto"
                    max-height="400"
                  >
                    <v-list
                      dense
                      shaped
                    >
                      <v-list-item-group
                        color="primary"
                      >
                        <v-list-item
                          v-for="(item, i) in question.question.options"
                          :key="i"
                          inactive
                        >
                          <v-list-item-content>
                            <v-list-item-subtitle v-text="i+1 + '. ' + item.body" />
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-responsive>
                </div>
              </v-card>
            </v-lazy>
          </div -->
          <div
            v-if="question.question.type === 'WORD_COUNT'"
          >
            <v-lazy
              :options="{
                threshold: .5
              }"
              min-height="200"
              transition="fade-transition"
            >
              <v-card
                class="my-4 pb-4"
                rounded="t-xl"
                elevation="6"
                style="
                  border-left: 5px solid #673AB7 !important;
                "
              >
                <v-card-text>
                  {{ index + 1 }}. {{ question.question.body }}
                </v-card-text>
                <v-card-text
                  class="text-center mx-auto"
                >
                  <span
                    class="mx-2"
                  >
                    Responses: {{ Res[index] }}
                  </span>
                  <span
                    class="mx-2"
                  >
                    Skipped: {{ Results.length - Res[index] }}
                  </span>
                </v-card-text>
                <div
                  class="mx-md-16"
                >
                  <v-responsive
                    class="overflow-y-auto"
                    max-height="400"
                  >
                    <v-list
                      dense
                      shaped
                    >
                      <v-list-item-group
                        color="primary"
                      >
                        <v-list-item
                          v-for="(item, i) in counts[index]"
                          :key="i"
                          inactive
                        >
                          <v-list-item-content
                            style="
                            background-color: #D1C4E9;
                            "
                            class="rounded-r-xl"
                          >
                            <v-list-item-subtitle
                              class="ml-2"
                              v-text="i"
                            />
                          </v-list-item-content>
                          <v-list-item-avatar>
                            <v-avatar
                              color="deep-purple"
                              size="25"
                            >
                              <span
                                class="white--text body-2"
                              >
                                {{ item }}
                              </span>
                            </v-avatar>
                          </v-list-item-avatar>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-responsive>
                </div>
              </v-card>
            </v-lazy>
          </div>
          <div
            v-if="question.question.type === 'RATING'"
          >
            <v-lazy
              :options="{
                threshold: .5
              }"
              min-height="200"
              transition="fade-transition"
            >
              <v-card
                class="my-4 pb-4"
                rounded="t-xl"
                elevation="6"
                style="
                  border-left: 5px solid #673AB7 !important;
                "
              >
                <v-card-text>
                  {{ index + 1 }}. {{ question.question.body }}
                </v-card-text>
                <div
                  class="text-center"
                >
                  <v-rating
                    color="deep-purple"
                    background-color="deep-purple lighten-3"
                    empty-icon="$ratingFull"
                    half-increments
                    readonly
                    :value="rateScaleResult[index]"
                    hover
                    :length="question.question.Stars"
                    :x-large="$vuetify.breakpoint.mdAndUp"
                  />
                </div>
                <div
                  class="text-center mt-5"
                >
                  <p>
                    Average Rating: {{ rateScaleResult[index] }}
                  </p>
                </div>
                <v-card-text
                  class="text-center mx-auto"
                >
                  <span
                    class="mx-2"
                  >
                    Responses: {{ Res[index] }}
                  </span>
                  <span
                    class="mx-2"
                  >
                    Skipped: {{ Results.length - Res[index] }}
                  </span>
                </v-card-text>
              </v-card>
            </v-lazy>
          </div>
          <div
            v-if="question.question.type === 'SCALE'"
          >
            <v-lazy
              :options="{
                threshold: .5
              }"
              min-height="200"
              transition="fade-transition"
            >
              <v-card
                class="my-4 pb-4"
                rounded="t-xl"
                elevation="6"
                style="
                  border-left: 5px solid #673AB7 !important;
                "
              >
                <v-card-text>
                  {{ index + 1 }}. {{ question.question.body }}
                </v-card-text>
                <div
                  class="mx-2 mx-md-10 mt-16"
                >
                  <v-slider
                    color="deep-purple"
                    :step="question.question.Percentage ? '' : '10'"
                    :ticks="question.question.Percentage ? '' : 'always'"
                    :thumb-size="28"
                    thumb-label="always"
                    tick-size="3"
                    readonly
                    :value="rateScaleResult[index]"
                  >
                    <template v-slot:thumb-label="{ value }">
                      {{ satisfactionEmojis[Math.min(Math.floor(value / 10), 10)] }}
                    </template>
                  </v-slider>
                </div>
                <div
                  class="text-center"
                >
                  <p
                    v-if="question.question.Percentage"
                  >
                    Average Scale Value: {{ rateScaleResult[index] }}%
                  </p>
                  <p
                    v-else
                  >
                    Average Scale Value: {{ rateScaleResult[index]/10 }}
                  </p>
                </div>
                <v-card-text
                  class="text-center mx-auto"
                >
                  <span
                    class="mx-2"
                  >
                    Responses: {{ Res[index] }}
                  </span>
                  <span
                    class="mx-2"
                  >
                    Skipped: {{ Results.length - Res[index] }}
                  </span>
                </v-card-text>
              </v-card>
            </v-lazy>
          </div>
          <div
            v-if="question.question.type === 'TEXT'"
          >
            <v-lazy
              :options="{
                threshold: .5
              }"
              min-height="200"
              transition="fade-transition"
            >
              <v-card
                class="my-4 pb-4"
                rounded="t-xl"
                elevation="6"
                style="
                  border-left: 5px solid #673AB7 !important;
                "
              >
                <v-card-text>
                  {{ index + 1 }}. {{ question.question.body }}
                </v-card-text>
                <v-card-text
                  class="text-center mx-auto"
                >
                  <span
                    class="mx-2"
                  >
                    Responses: {{ Res[index] }}
                  </span>
                  <span
                    class="mx-2"
                  >
                    Skipped: {{ Results.length - Res[index] }}
                  </span>
                </v-card-text>
                <div
                  class="mx-md-16"
                >
                  <v-responsive
                    class="overflow-y-auto"
                    max-height="400"
                  >
                    <v-list
                      dense
                      shaped
                    >
                      <v-list-item-group
                        color="primary"
                      >
                        <v-list-item
                          v-for="(item, i) in counts[index]"
                          :key="i"
                          inactive
                        >
                          <v-list-item-content
                            style="
                            background-color: #D1C4E9;
                            "
                            class="rounded-r-xl"
                          >
                            <v-list-item-subtitle
                              class="ml-2"
                              v-text="i"
                            />
                          </v-list-item-content>
                          <v-list-item-avatar>
                            <v-avatar
                              color="deep-purple"
                              size="25"
                            >
                              <span
                                class="white--text body-2"
                              >
                                {{ item }}
                              </span>
                            </v-avatar>
                          </v-list-item-avatar>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-responsive>
                </div>
              </v-card>
            </v-lazy>
          </div>
        </div>
        <div class="text-center">
          <v-btn
            class="text-capitalize mt-5"
            color="black"
            rounded
            @click="boardShare()"
            dark
          >Share Board Link<v-icon color="success">mdi-share</v-icon></v-btn>
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
          <p class="text-center body mt-3">You've not received any response yet !!!</p>
          <div class="text-center">
            <v-btn
              class="text-capitalize mt-5"
              color="black"
              rounded
              @click="boardShare()"
              dark
            >Share Board Link<v-icon color="success">mdi-share</v-icon></v-btn>
          </div>
        </v-container>
      </div>
    </div>
  </v-container>
</template>

<script>
// import BoardResult from '@/boards.json'
import PieChart from '@/components/PieChart.vue'
import BarChart from '@/components/BarChart.vue'
import { boardResults, auth } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'BoardResult',
  components: {
    PieChart,
    BarChart
  },
  data () {
    return {
      Results: [],
      response: 0,
      Responses: [],
      Skipped: [],
      alphabetArray: [],
      textResult: [],
      rateScaleResult: [],
      counts: null,
      id: 0,
      per1: 0,
      per2: 0,
      componentKey: 0,
      satisfactionEmojis: ['😭', '😢', '☹️', '🙁', '😐', '🙂', '😊', '😄', '😃', '😍', '🥰'],
      datacollection: []
    }
  },
  computed: {
    ...mapState(['boards']),
    Board () {
      const boardIndex = this.boards.findIndex((x) => x.id === this.id)
      const boardArray = []
      boardArray.push(JSON.parse(JSON.stringify(this.boards[boardIndex].board[0])))
      return boardArray
    },
    Res () {
      this.responseArray()
      return this.Responses
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getResults()
  },
  mounted () {
    this.alphaGenerate()
    /* this.chartResult()
    this.wordtextResGen()
    this.rateScaleMethod() */
  },
  updated () {
    // this.wordtextResGen()
  },
  /* watch: {
    Results () {
      this.chartResult()
    }
  }, */
  methods: {
    async getResults () {
      await boardResults.doc(auth.currentUser.uid).collection(this.id)
        .orderBy('createdOn', 'desc').onSnapshot((snapshot) => {
          this.Results = []
          snapshot.forEach((doc) => {
            const result = doc.data()
            result.id = doc.id

            this.Results.push(result)
          })
          this.chartResult()
          this.wordtextResGen()
          this.rateScaleMethod()
        })
    },
    alphaGenerate () {
      const alphaArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
      this.alphabetArray = alphaArray
    },
    responseArray () {
      this.Responses = []
      this.Board[0].questionsList.forEach((ques) => {
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
    chartResult () {
      this.datacollection = []
      this.Board[0].questionsList.forEach((que, i) => {
        const quest = this.Board[0].questionsList[i].question
        if (quest.type === 'BOOLEAN' || quest.type === 'SINGLE_CHOICE' || quest.type === 'MULTI_CHOICE') {
          if (quest.options.length <= 3) {
            this.datacollection.push({
              labels: this.chartLable(quest.options),
              datasets: [
                {
                  backgroundColor: this.chartColor(quest.options),
                  borderAlign: 'center',
                  borderWidth: 3,
                  borderColor: 'white',
                  hoverBorderColor: 'grey',
                  hoverBorderWidth: 4,
                  data: this.pieResult(i)
                }
              ]
            })
          } else {
            this.datacollection.push({
              labels: this.chartLable(quest.options),
              datasets: [
                {
                  label: ['Count'],
                  barPercentage: 0.8,
                  categoryPercentage: 0.6,
                  hoverBorderColor: 'grey',
                  hoverBorderWidth: 4,
                  // maxBarThickness: 50,
                  backgroundColor: this.chartColor(quest.options),
                  data: this.pieResult(i)
                }
              ]
            })
          }
        } else this.datacollection.push(0)
      })
      this.labelPercent()
    },
    pieResult (index) {
      const Options = []
      const result = []
      this.Board[0].questionsList[index].question.options.forEach((doc, i) => {
        Options.push(`${this.Board[0].questionsList[index].question.options[i].body}`)
        result.push(0)
      })
      this.Results.forEach((res, j) => {
        Options.forEach((opt, k) => {
          if (this.Results[j].Result[index].result.answer.length === 1) {
            if (this.Results[j].Result[index].result.answer[0] === Options[k]) {
              result[k] += 1
            }
          } else {
            this.Results[j].Result[index].result.answer.forEach((ans, l) => {
              if (this.Results[j].Result[index].result.answer[l] === Options[k]) {
                result[k] += 1
              }
            })
          }
        })
        /* if (this.Results[j].Result[index].result.answer[0] === Options[0]) {
          result[0] += 1
        } else if (this.Results[j].Result[index].result.answer[0] === Options[1]) {
          result[1] += 1
        } */
      })
      if (this.Board[0].questionsList[index].question.options.length > 3) {
        result.push(0)
      }
      return result
    },
    chartLable (options) {
      const label = []
      options.forEach((opt, i) => {
        label.push(this.alphabetArray[i])
      })
      return label
    },
    labelPercent () {
      this.datacollection.forEach((data, i) => {
        const percentArray = []
        if (this.datacollection[i] !== 0) {
          const labelArray = this.datacollection[i].labels
          const dataArray = this.datacollection[i].datasets[0].data
          let sum = 0
          dataArray.forEach((val, j) => {
            sum += dataArray[j]
          })
          dataArray.forEach((val, k) => {
            const m = dataArray[k]
            const perc = (m / sum) * 100
            percentArray.push(perc.toFixed(0))
          })
          this.datacollection[i].labels = []
          labelArray.forEach((val, l) => {
            this.datacollection[i].labels.push(labelArray[l] + ' ' + percentArray[l] + '%')
          })
        }
      })
    },
    chartColor (options) {
      const colorArray = ['orange', 'blue', 'green', 'red', 'purple', '#004D40', '#FDD835', '#3F51B5', '#3E2723', '#EC407A']
      const colors = []
      options.forEach((opt, i) => {
        if (i < 10) {
          colors.push(colorArray[i])
        } else {
          const n = i % 10
          colors.push(colorArray[n])
        }
      })
      return colors
    },
    wordtextResGen () {
      this.textResult = []
      this.Board[0].questionsList.forEach((que, i) => {
        const quest = this.Board[0].questionsList[i].question
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
      this.Board[0].questionsList.forEach((que, i) => {
        const quest = this.Board[0].questionsList[i].question
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
    /* mountDataSet () {
      this.datacollection = {
        labels: ['True 34%', 'False 66%'],
        datasets: [
          {
            label: ['Option 1', 'Option 2'],
            backgroundColor: ['blue', 'orange'],
            borderAlign: 'center',
            borderWidth: 3,
            borderColor: 'white',
            hoverBorderColor: 'grey',
            hoverBorderWidth: 4,
            data: this.pieResult(0)
          }
        ]
      }
    }, */
    boardShare () {
      this.$router.push({ name: 'BoardShare', params: { id: this.id } })
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
