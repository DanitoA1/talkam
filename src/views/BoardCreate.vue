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
            v-model="Board[0].Title"
            class="mx-6 text-h4 mb-0"
            placeholder="Board Title"
            height="50px"
            color="deep-purple"
          />
          <v-textarea
            v-model="Board[0].Caption"
            class="mx-6 my-0"
            auto-grow
            rows="1"
            ma
            dense
            label="Board Caption"
            hint="A short caption for your board"
            color="deep-purple"
          />
        </v-card>
      </v-col>
    </v-row>
    <BoardQuestions :questions="Board[0].questionsList" :readOnly="true" />
    <div
      v-if="addQuestion"
    >
      <BoardBuilder :options="sampleQuestion" :form="Edit" />
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
            @click="publishBoard()"
          ><v-icon dark>mdi-book-variant-multiple</v-icon>Publish Board</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
/* eslint-disable */
import BoardQuestions from '@/components/BoardQuestionCmp.vue';
import BoardBuilder from '@/components/BoardBuilderCmp.vue';
import sampleQuestionObj from '@/blankboard.json';

export default {
  name: 'BoardCreate',
  components: {
    BoardQuestions,
    BoardBuilder,
  },
  data() {
    return {
      Board: [
        {
          Title: null,
          Caption: null,
          questionsList: [],
        },
      ],
      post: {
        content: 'Just some testing'
      },
      addQuestion: false,
      Edit: false,
    };
  },
  mounted() {
    this.$root.$on('add-update-question', (q) => {
      this.updateQuestionsList(q);
    });
    this.$root.$on('close-question', (c) => {
      window.console.log(c);
      this.addQuestion = false;
    });
    /* this.$root.$on('add-question', (q) => {
      this.addQuestionList(q);
    }); */
  },
  methods: {
    updateQuestionsList(ques) {
      const questionIndex = this.Board[0].questionsList.findIndex((x) => x.question.id === ques.question.id);
      if (questionIndex >= 0) {
        this.$set(this.Board[0].questionsList, questionIndex, ques);
      } else {
        this.Board[0].questionsList.push(JSON.parse(JSON.stringify(ques)));
      }
      this.addQuestion = false;
      this.$root.$emit('selected-question', null);
    },
    publishBoard() {
      //Sendboard to database and route to board share page
      this.$store.dispatch('publishBoard', this.Board );
      // this.$router.push('/user/board/share')
    },
    /* addQuestionList(question) {
      this.questionsList.push(JSON.parse(JSON.stringify(question)));
      this.addQuestion = false;
      this.$root.$emit('selected-question', null);
      window.console.log(question, this.addQuestion, this.questionsList);
    }, */
    addNewQuestion() {
      this.sampleQuestion = JSON.parse(JSON.stringify(sampleQuestionObj));
      this.addQuestion = true;
    },
  },
};
</script>
