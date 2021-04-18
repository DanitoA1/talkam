<!-- eslint-disable -->
<template>
  <v-container class="mx-auto">
    <v-row no-gutters class="justify-center">
      <v-col
        cols="12"
        md="11"
      >
        <v-card
          color="deep-purple lighten-5"
          outlined
        >
          <v-text-field
            v-model="Quiz[0].Title"
            class="mx-6 text-h4 mb-0"
            placeholder="Quiz Title"
            height="50px"
            color="deep-purple"
          />
          <v-textarea
            v-model="Quiz[0].Caption"
            class="mx-6 my-0"
            auto-grow
            rows="1"
            ma
            dense
            label="Quiz description"
            hint="A short information about your quiz"
            color="deep-purple"
          />
        </v-card>
      </v-col>
    </v-row>
    <QuizQuestions :questions="Quiz[0].questionsList" :readOnly="true" />
    <div
      v-if="addQuestion"
    >
      <QuizBuilder :options="sampleQuestion" :form="Edit" />
    </div>
    <div class="text-center">
      <v-row
        class="mx-auto"
      >
        <v-col
          cols="12"
          sm="6"
        >
          <v-btn
            rounded
            dark
            @click="addNewQuestion()"
          ><v-icon dark>mdi-plus</v-icon>Add Question</v-btn>      
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          cols="12"
          sm="6"
        >
          <v-btn
            color="success"
            rounded
            @click="publishQuiz()"
          ><v-icon dark>mdi-book-variant-multiple</v-icon>Publish Quiz</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import QuizQuestions from '@/components/QuizQuestionCmp.vue'
import QuizBuilder from '@/components/QuizBuilderCmp.vue'
import sampleQuestionObj from '@/blankquiz.json'

export default {
  name: 'QuizCreate',
  components: {
    QuizQuestions,
    QuizBuilder
  },
  data () {
    return {
      Quiz: [
        {
          Title: null,
          Caption: null,
          questionsList: []
        }
      ],
      addQuestion: false,
      Edit: false
    }
  },
  mounted () {
    this.$root.$on('add-update-question', (q) => {
      this.updateQuestionsList(q)
    })
    this.$root.$on('close-question', (c) => {
      window.console.log(c)
      this.addQuestion = false
    })
    /* this.$root.$on('add-question', (q) => {
      this.addQuestionList(q);
    }); */
  },
  methods: {
    updateQuestionsList (ques) {
      const questionIndex = this.Quiz[0].questionsList.findIndex((x) => x.question.id === ques.question.id)
      if (questionIndex >= 0) {
        this.$set(this.Quiz[0].questionsList, questionIndex, ques)
      } else {
        this.Quiz[0].questionsList.push(JSON.parse(JSON.stringify(ques)))
      }
      this.addQuestion = false
      this.$root.$emit('selected-question', null)
    },
    publishQuiz () {
      // Sendboard to database and route to board share page
      this.$store.dispatch('publishQuiz', this.Quiz)
    },
    /* addQuestionList(question) {
      this.questionsList.push(JSON.parse(JSON.stringify(question)));
      this.addQuestion = false;
      this.$root.$emit('selected-question', null);
      window.console.log(question, this.addQuestion, this.questionsList);
    }, */
    addNewQuestion () {
      this.sampleQuestion = JSON.parse(JSON.stringify(sampleQuestionObj))
      this.addQuestion = true
    }
  }
}
</script>
