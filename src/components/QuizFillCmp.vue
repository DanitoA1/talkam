<template>
  <v-container>
    <div
      class="text-center"
    >
      <h1
        class="deep-purple--text"
      >
        {{ Title }}
      </h1>
      <blockquote
        class="blockquoute black--text"
      >
        {{ Caption }}
      </blockquote>
    </div>
    <v-card
      class="mt-10 mx-auto"
      elevation="6"
      max-width="800"
      min-height="400"
      rounded="xl"
    >
      <v-system-bar
        color="deep-purple lighten-4"
      >
        <div
          class="mx-auto"
        >
          Question: {{ currentQuestion }}/{{ totalQuestion }}
          <span
            class="ml-2"
          >
            Answered: {{ Answered }}
          </span>
        </div>
      </v-system-bar>
      <v-card
        color="orange lighten-5 ma-6"
        rounded="xl"
        elevation="4"
      >
        <v-card-text
          class="text-body-1 black--text justify-center text-justify"
        >
          {{ Question.question.body }}
        </v-card-text>
      </v-card>
      <v-row>
        <v-col
          class="mx-auto"
          cols="10"
          md="8"
        >
          <div
            v-if="Question.question.type === 'BOOLEAN'"
          >
            <v-radio-group
              v-model="radioGroup"
            >
              <div
                v-for="(option, index) in Question.question.options"
                :key="index"
              >
                <v-radio
                  class="mb-4"
                  :label="option.body"
                  :value="option.body"
                />
              </div>
            </v-radio-group>
          </div>
          <div
            v-if="Question.question.type === 'SINGLE_CHOICE'"
          >
            <v-radio-group
              v-model="radioGroup"
            >
              <div
                v-for="(option, index) in Question.question.options"
                :key="index"
              >
                <v-radio
                  class="mb-4"
                  :label="option.body"
                  :value="option.body"
                />
              </div>
            </v-radio-group>
          </div>
          <div
            v-if="Question.question.type === 'MULTI_CHOICE'"
          >
            <div
              v-for="(option, index) in Question.question.options"
              :key="index"
            >
              <v-checkbox
                v-model="checkBoxAnswer"
                class="my-0"
                :label="option.body"
                :value="option.body"
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-col
        class="mx-auto"
        cols="11"
        md="8"
      >
        <v-row>
          <v-col
            cols="4"
          >
            <v-btn
              class="rounded-l-xl white--text my-1"
              color="deep-purple"
              small
              :disabled="currentQuestion === 1"
              @click="Prevfunc(Result)"
            >
              Prev
            </v-btn>
          </v-col>
          <v-col
            cols="4"
            class="text-center"
          >
            <v-btn
              class="white--text"
              color="green"
              rounded
              :disabled="Submit"
              @click="submitResult(Result)"
            >
              Submit
            </v-btn>
          </v-col>
          <v-col
            cols="4"
            class="text-right"
          >
            <v-btn
              class="rounded-r-xl white--text my-1"
              color="deep-purple"
              small
              :disabled="currentQuestion === totalQuestion"
              @click="Nextfunc(Result)"
            >
              Next
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-dupe-keys */
export default {
  name: 'QuizFillCmp',
  props: {
    Title: String,
    Caption: String,
    Question: Object,
    currentQuestion: Number,
    totalQuestion: Number,
    Next: Function,
    Prev: Function,
    Proceed: Function,
    AllResult: Array
  },
  data () {
    return {
      Submit: true,
      radioGroup: '',
      checkBoxAnswer: [],
      Answered: 0,
      Result: {
        questionType: this.Question.question.type,
        questionID: this.Question.question.id,
        answer: []
      }
    }
  },
  computed: {
    scaleShow () {
      if (this.Question.question.Percentage) {
        return `${this.rating_scale_value.toFixed(0)}%`
      } else {
        return Math.floor(this.rating_scale_value / 10)
      }
    }
    /* Answer() {
      const answerIndex = this.AllResult.findIndex((x) => x
        .result.questionID === this.Question.question.id);
      if (this.AllResult[answerIndex]) {
        return this.AllResult[answerIndex].result.answer;
      } return [];
    }, */
  },
  created () {
    if (this.currentQuestion === this.totalQuestion) {
      this.Submit = false
    } else this.Submit = true
  },
  mounted () {
    const answerIndex = this.AllResult.findIndex((x) => x
      .result.questionID === this.Question.question.id)
    if (this.AllResult[answerIndex]) {
      if (this.Question.question.type === 'BOOLEAN' || this.Question.question.type === 'SINGLE_CHOICE') {
        this.radioGroup = this.AllResult[answerIndex].result.answer[0]
      }
      if (this.Question.question.type === 'MULTI_CHOICE') {
        this.checkBoxAnswer = this.AllResult[answerIndex].result.answer
      }
    }
    this.AllResult.forEach((x) => {
      if (x.result.answer[0] !== 'undefined' && x.result.answer.length > 0) {
        this.Answered += 1
      }
    })
  },
  watch: {
    currentQuestion () {
      if (this.currentQuestion === this.totalQuestion) {
        this.Submit = false
      } else this.Submit = true
    },
    /* rating_scale_value () {
      if (this.Question.question.Percentage) {
        this.scaleShow = this.rating_scale_value.toFixed(0)
      } else {
        this.scaleShow = Math.floor(this.rating_scale_value / 10)
      }
    }, */
    radioGroup () {
      this.Result.answer = [`${this.radioGroup.trim()}`]
    },
    checkBoxAnswer () {
      this.Result.answer = this.checkBoxAnswer
    }
  },
  methods: {
    Nextfunc (result) {
      this.$root.$emit('add-update-result', { result })
      this.Next()
    },
    submitResult (result) {
      this.$root.$emit('add-update-result', { result })
      this.$root.$emit('addToFirebase')
      this.Proceed()
    },
    Prevfunc (result) {
      this.$root.$emit('add-update-result', { result })
      this.Prev()
    }
  }
}
</script>
