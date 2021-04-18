<template>
  <v-container>
    <div v-for="(question, index) in questions" :key="index">
      <div
        v-if="selectedQuestion.id === question.question.id"
      >
        <QuizBuilder :options="selectedQuestion.question" :form="Edit" />
      </div>
      <v-row
        no-gutters
        class="justify-center"
        v-if="selectedQuestion.id !== question.question.id"
      >
        <v-col
          cols="12"
          md="11"
        >
          <v-card
            class="mx-auto my-2"
            color="orange lighten-5"
          >
            <v-card-text>
              <div>
                Entry {{ index + 1 }}:
              </div>
              <p
                class="text-primary"
              >{{ question.question.body }} </p>
              <v-divider />
              <div
                class="mx-2"
                v-if="question.question.type === 'BOOLEAN'"
              >
                <v-radio-group
                  v-model="Radio"
                  :mandatory="false"
                >
                  <div
                    v-for="(option, index) in question.question.options" :key="index"
                  >
                    <v-radio
                      :label="option.body"
                      :value="option.answer ? 'true' : 'false'"
                      :readonly="readOnly"
                    ></v-radio>
                  </div>
                </v-radio-group>
              </div>
              <div
                class="mx-2"
                v-if="question.question.type === 'SINGLE_CHOICE'"
              >
                <v-radio-group
                  v-model="Radio"
                  :mandatory="false"
                >
                  <div
                    v-for="(option, index) in question.question.options" :key="index"
                  >
                    <v-radio
                      :value="option.answer ? 'true' : 'false'"
                      :label="option.body"
                      :readonly="readOnly"
                    ></v-radio>
                  </div>
                </v-radio-group>
              </div>
              <div
                class="mx-2"
                v-if="question.question.type === 'MULTI_CHOICE'"
              >
                <div
                  v-for="(option, index) in question.question.options" :key="index"
                >
                  <v-checkbox
                    class="my-0"
                    v-model="option.answer"
                    :label="option.body"
                    :readonly="readOnly"
                  ></v-checkbox>
                </div>
              </div>
              <v-btn
                class="mx-4"
                color="success"
                left
                rounded
                @click="editQuestion(question, index)"
              >Edit</v-btn>
              <v-btn
                class="mx-4"
                color="orange"
                right
                rounded
                dark
                @click="deleteQuestion(question, index)"
              >Delete</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

  </v-container>
</template>

<script>
import QuizBuilder from '@/components/QuizBuilderCmp.vue'

export default {
  name: 'QuizQuestionCmp',
  components: {
    QuizBuilder
  },
  props: ['questions', 'readOnly'],
  data () {
    return {
      selectedQuestion: { id: null },
      satisfactionEmojis: ['😭', '😢', '☹️', '🙁', '😐', '🙂', '😊', '😄', '😃', '😍', '🥰'],
      Edit: true,
      Radio: 'true'
    }
  },
  mounted () {
    this.$root.$on('selected-question', (obj) => {
      window.console.log(obj)
      this.selectedQuestion = { id: null }
    })
    this.$root.$on('close-question', (c) => {
      window.console.log(c)
      this.selectedQuestion = { id: null }
    })
  },
  methods: {
    editQuestion (question, index) {
      this.selectedQuestion = JSON.parse(JSON.stringify(question))
      this.selectedQuestion.id = question.question.id
    },
    deleteQuestion (question, index) {
      this.questions.splice(index, 1)
    }
  }
}
</script>
