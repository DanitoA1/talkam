<template>
  <v-container>
    <div v-for="(question, index) in questions" :key="index">
      <div
        v-if="selectedQuestion.id === question.question.id"
      >
        <BoardBuilder :options="selectedQuestion.question" :form="Edit" />
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
                <v-radio-group>
                  <div
                    v-for="(option, index) in question.question.options" :key="index"
                  >
                    <v-radio
                      :label="option.body"
                      :readonly="readOnly"
                    ></v-radio>
                  </div>
                </v-radio-group>
              </div>
              <div
                class="mx-2"
                v-if="question.question.type === 'WORD_COUNT'"
              >
                <v-text-field
                  class="mt-2"
                  :readonly="readOnly"
                  rounded
                  solo-inverted
                ></v-text-field>
              </div>
              <div
                class="mx-2"
                v-if="question.question.type === 'SINGLE_CHOICE'"
              >
                <v-radio-group>
                  <div
                    v-for="(option, index) in question.question.options" :key="index"
                  >
                    <v-radio
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
                    :label="option.body"
                    :readonly="readOnly"
                  ></v-checkbox>
                </div>
              </div>
              <div
                class="mx-2 mt-10"
                v-if="question.question.type === 'SCALE'"
              >
                <v-slider
                  color="deep-purple"
                  :step="question.question.Percentage ? '' : '10'"
                  :ticks="question.question.Percentage ? '' : 'always'"
                  :thumb-size="28"
                  thumb-label="always"
                  tick-size="3"
                >
                  <template v-slot:thumb-label="{ value }">
                    {{ satisfactionEmojis[Math.min(Math.floor(value / 10), 9)] }}
                  </template>
                </v-slider>
              </div>
              <div
                class="mx-2"
                v-if="question.question.type === 'RATING'"
              >
                <div
                  class="text-center"
                >
                  <v-rating
                    color="deep-purple"
                    background-color="deep-purple lighten-3"
                    empty-icon="$ratingFull"
                    half-increments
                    hover
                    :length="question.question.Stars"
                    :x-large="$vuetify.breakpoint.mdAndUp"
                  ></v-rating>
                </div>
              </div>
              <div
                class="mx-2"
                v-if="question.question.type === 'TEXT'"
              >
                <v-textarea
                  class="mt-2"
                  :readonly="readOnly"
                  rows="1"
                  shaped
                  :counter="question.question.characterLimited ? question.question.textLimit : ''"
                  solo-inverted
                ></v-textarea>
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
                dark
                rounded
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
import BoardBuilder from '@/components/BoardBuilderCmp.vue'

export default {
  name: 'BoardQuestionCmp',
  components: {
    BoardBuilder
  },
  props: ['questions', 'readOnly'],
  data () {
    return {
      selectedQuestion: { id: null },
      satisfactionEmojis: ['😭', '😢', '☹️', '🙁', '😐', '🙂', '😊', '😁', '😄', '😍'],
      Edit: true
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
