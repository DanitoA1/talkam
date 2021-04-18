<template>
  <v-container
    fluid
  >
    <v-row
      no-gutters
      class="justify-center"
    >
      <v-col
        cols="12"
        md="11"
      >
        <v-card
          elevation="6"
          class="mx-auto"
        >
          <v-system-bar>
            <v-spacer></v-spacer>
            <v-hover
              v-slot:default="{ hover }"
              close-delay="200"
            >
              <v-btn
                text
                :color="hover ? 'red' : ''"
                @click="deleteQuestion(question)"
              >
                <v-icon
                  large
                  :color="hover ? 'red' : ''"
                >mdi-close-circle</v-icon>
              </v-btn>
            </v-hover>
          </v-system-bar>
          <v-card-text>
            <v-row
              no-gutters
            >
              <v-col
                cols="10"
                sm="8"
                md="6"
              >
                <v-select
                  color="deep-purple"
                  v-model="selectedType"
                  :items="questionTypes"
                  item-text="label"
                  item-value="value"
                  label="selectedType"
                  hide-selected
                  outlined
                  @change="questionTypeChanged(selectedType)"
                ></v-select>
              </v-col>
            </v-row>
            <v-divider />
            <div
              v-if="selectedType !== 'DEFAULT'"
            >
              <div
                class="text-subtitle-1 font-weight-black"
              >Entry</div>
              <v-text-field
                v-model="question.body"
                class="mx-4"
                color="deep-purple"
                shaped
                outlined
                label="Enter Question"
              ></v-text-field>
              <div
                v-if="selectedType === 'BOOLEAN'"
                class="mx-4"
              >
                <v-row>
                  <v-col
                    cols="8"
                  >
                    <p
                      class="text-subtitle-1 black--text"
                    >Answer Choices</p>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col
                    cols="4"
                  >
                    <p
                      class="text-subtitle-1 black--text text-right"
                    >Answer</p>
                  </v-col>
                </v-row>
                <div
                  v-for="(option, index) in question.options" :key="index"
                >
                  <v-row>
                    <v-col
                      cols="10"
                    >
                      <v-text-field
                        v-model="option.body"
                        placeholder="Enter an answer choice"
                        rounded
                        dense
                        filled
                        solo-inverted
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="2"
                    >
                      <v-switch
                        v-model="option.answer"
                        @change="selectanswer(option.sequence)"
                        color="green"
                        class="my-1"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </div>
              </div>
              <div
                v-if="selectedType === 'MULTI_CHOICE'"
                class="mx-4"
              >
                <v-row>
                  <v-col
                    cols="8"
                  >
                    <p
                      class="text-subtitle-1 black--text"
                    >Answer Choices</p>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col
                    cols="4"
                  >
                    <p
                      class="text-subtitle-1 black--text text-right"
                    >Answers</p>
                  </v-col>
                </v-row>
                <div
                  v-for="(option, index) in question.options" :key="index"
                >
                  <v-row>
                    <v-col
                      cols="10"
                    >
                      <v-text-field
                        v-model="option.body"
                        placeholder="Enter an answer choice"
                        rounded
                        :append-outer-icon="index > 1 ? 'mdi-close-circle' : ''"
                        @click:append-outer="deleteQuestionOptionItem(question.options, index)"
                        dense
                        filled
                        solo-inverted
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="2"
                    >
                      <v-switch
                        v-model="option.answer"
                        color="green"
                        class="my-1"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </div>
                <v-btn
                  class="mb-3"
                  color="blue"
                  text
                  small
                  @click="addAnotherAnswer()"
                >Add Option</v-btn>
              </div>
              <div
                v-if="selectedType === 'SINGLE_CHOICE'"
                class="mx-4"
              >
                <v-row>
                  <v-col
                    cols="8"
                  >
                    <p
                      class="text-subtitle-1 black--text"
                    >Answer Choices</p>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col
                    cols="4"
                  >
                    <p
                      class="text-subtitle-1 black--text text-right"
                    >Answer</p>
                  </v-col>
                </v-row>
                <div
                  v-for="(option, index) in question.options" :key="index"
                >
                  <v-row>
                    <v-col
                      cols="10"
                    >
                      <v-text-field
                        v-model="option.body"
                        placeholder="Enter an answer choice"
                        rounded
                        :append-outer-icon="index > 1 ? 'mdi-close-circle' : ''"
                        @click:append-outer="deleteQuestionOptionItem(question.options, index)"
                        dense
                        filled
                        solo-inverted
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="2"
                    >
                      <v-switch
                        v-model="option.answer"
                        @change="selectanswer(option.sequence)"
                        color="green"
                        class="my-1"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </div>
                <v-btn
                  class="mb-3"
                  color="blue"
                  text
                  small
                  @click="addAnotherAnswer()"
                >Add Option</v-btn>
              </div>
              <v-btn
                v-if="form === false"
                class="mx-4"
                color="success"
                left
                rounded
                @click="saveQuestion(question)"
              >Save</v-btn>
              <v-btn
                v-if="form === true"
                class="mx-4"
                color="success"
                left
                rounded
                @click="saveQuestion(question)"
              >Update</v-btn>
              <v-btn
                class="mx-4"
                color="red"
                right
                rounded
                @click="cancelQuestion(question, index)"
              >Clear</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import sampleQuestionObj from '@/blankquiz.json'

export default {
  name: 'QuizBuilderCmp',
  props: ['options', 'form'],
  data () {
    return {
      questionTypes: [
        { value: 'DEFAULT', label: '- Select a question type -' },
        { value: 'BOOLEAN', label: 'A or B' },
        { value: 'SINGLE_CHOICE', label: 'Single Choice' },
        { value: 'MULTI_CHOICE', label: 'Multiple Choice' }
      ],
      question: this.options,
      selectedType: null
    }
  },
  mounted () {
    this.question.type = this.question.type ? this.question.type : 'DEFAULT'
    this.selectedType = this.question.type

    window.console.log(this.question, this.selectedType)
  },
  methods: {
    /**
     * @desc {String} type
     * @param {String} type
     * @return {null}
     */
    questionTypeChanged (type) {
      this.question.type = this.selectedType
      switch (type) {
        case 'BOOLEAN':
          this.question.options = [{ body: 'Option 1', sequence: 1, answer: false }, { body: 'Option 2', sequence: 2, answer: false }]
          break
        case 'SCALE':
          this.question.labels.length = 2
          break
        default:
          window.console.log('Question type not matched')
      }
    },
    selectanswer (s) {
      const AnsIndex = this.question.options.findIndex((x) => x.sequence === s)
      if (this.question.options[AnsIndex].answer === true) {
        for (var i = 0; i < this.question.options.length; i++) {
          this.question.options[i].answer = false
        }
        this.question.options[AnsIndex].answer = true
      }
    },

    /**
     * @param {String} format
     * @return {null}
     */
    timeFormatModified (format) {
      window.console.log(format)
    },

    /**
     * @param {null}
     * @return {null}
     */
    addAnotherAnswer () {
      if (!this.question.options) {
        this.question.options = []
      }
      let maxSequence = Number(Math.max(...this.question.options.map((x) => x.sequence)))
      if (!maxSequence) {
        maxSequence = this.question.options.length
      }
      this.question.options.push({ body: null, sequence: maxSequence + 1, answer: false}); // eslint-disable-line
      this.$forceUpdate()
    },

    /**
     * @param {Object, Number}  options, index
     * @return {null}
     */
    deleteQuestionOptionItem (options, index) {
      this.question.options.splice(index, 1)
    },

    /**
     * @param {null}
     * @return {String} guid
     */
    getGUID () {
      function s4 () {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)
      }
      return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`
    },

    /**
     * @param {Object} question
     * @return {null}
     */
    saveQuestion (question) {
      question.id = question.id ? question.id : this.getGUID(); // eslint-disable-line
      this.$root.$emit('add-update-question', { question })
      this.question = { type: 'DEFAULT' }
    },

    /**
     * @param {Object} question
     * @return {null}
     */
    cancelQuestion (question) {
      window.console.log(question)
      this.question = JSON.parse(JSON.stringify(sampleQuestionObj))
      this.selectedType = 'DEFAULT'
    },

    /**
     * @param {Object} question
     * @return {null}
     */
    deleteQuestion (question) {
      this.$root.$emit('close-question', false)
    },

    /**
     * @param {Number} intervals
     * @return {null}
     */
    changeLabelsLength (intervals) {
      this.question.labels.length = intervals
    }
  }
}
</script>

<style scoped>
  .fill{
    margin: 0;
    padding: 0;
  }
</style>
