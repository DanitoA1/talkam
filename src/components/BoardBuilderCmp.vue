<!-- eslint-disable -->
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
                <p
                  class="text-subtitle-1 black--text"
                >Answer Choices</p>
                <div
                  v-for="(option, index) in question.options" :key="index"
                >
                  <v-text-field
                    v-model="option.body"
                    placeholder="Enter an answer choice"
                    rounded
                    dense
                    filled
                    solo-inverted
                  ></v-text-field>
                </div>
              </div>
              <div
                v-if="selectedType === 'WORD_COUNT'"
                class="mx-4"
              >
                <v-row>
                  <v-col
                    cols="8"
                    sm="6"
                    md="4"
                  >
                    <p
                      class="text-subtitle-1 my-2"
                    >
                      Enter Maximum Word Count
                    </p>
                  </v-col>
                  <v-col
                    cols="3"
                    sm="2"
                  >
                    <v-text-field
                      v-model="question.wordCount"
                      solo-inverted
                      type="number"
                      min="1"
                      max="25"
                      value="1"
                      hint="Min:1 Max:25"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <div
                v-if="selectedType === 'MULTI_CHOICE'"
                class="mx-4"
              >
                <p
                  class="text-subtitle-1 black--text"
                >Answer Choices</p>
                <div
                  v-for="(option, index) in question.options" :key="index"
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
                v-if="selectedType === 'RATING'"
                class="mx-4"
              >
                <v-row>
                  <v-col
                    cols="8"
                    sm="6"
                    md="4"
                  >
                    <p
                      class="text-subtitle-1 my-2"
                    >
                      Number of Stars
                    </p>
                  </v-col>
                  <v-col
                    cols="3"
                    sm="2"
                  >
                    <v-text-field
                      v-model="question.Stars"
                      solo-inverted
                      type="number"
                      value="5"
                      min="2"
                      max="7"
                      :hint="$vuetify.breakpoint.mdAndUp ? 'Defaults is 5' : ''"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <div
                v-if="selectedType === 'SCALE'"
                class="mx-4"
              >
                <v-radio-group
                  v-model="question.Percentage"
                >
                  <v-radio
                    color="deep-purple"
                    label="Scale of 1 to 10"
                  ></v-radio>
                  <v-radio
                    color="deep-purple"
                    label="Percentage scale"
                    value= true
                  ></v-radio>
                </v-radio-group>
              </div>
              <div
                v-if="selectedType === 'SINGLE_CHOICE'"
                class="mx-4"
              >
                <p
                  class="text-subtitle-1 black--text"
                >Answer Choices</p>
                <div
                  v-for="(option, index) in question.options" :key="index"
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
                v-if="selectedType === 'TEXT'"
                class="mx-4"
              >
                <v-row>
                  <v-col
                    cols="8"
                    sm="5"
                    md="4"
                  >
                    <v-checkbox
                      color="blue"
                      v-model="question.characterLimited"
                      label="Character Limit"
                    ></v-checkbox>
                  </v-col>
                  <v-col
                    cols="4"
                    sm="2"
                  >
                    <v-text-field
                      v-model="question.textLimit"
                      solo
                      type="number"
                      :disabled="!question.characterLimited"
                      min="50"
                      max="1024"
                      hint="Min:50 Max:1024"
                    ></v-text-field>
                  </v-col>
                </v-row>
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
/* eslint-disable */
import sampleQuestionObj from '@/blankboard.json';

export default {
  name: 'BoardBuilderCmp',
  props: ['options','form'],
  data() {
    return {
      questionTypes: [
        { value: 'DEFAULT', label: '- Select a question type -' },
        { value: 'BOOLEAN', label: 'A or B' },
        { value: 'WORD_COUNT', label: 'Word Count' },
        { value: 'SINGLE_CHOICE', label: 'Single Choice' },
        { value: 'MULTI_CHOICE', label: 'Multiple Choice' },
        { value: 'RATING', label: 'Star Rating' },
        { value: 'SCALE', label: 'Scale' },
        { value: 'TEXT', label: 'Text' },
      ],
      question: this.options,
      selectedType: null,
    };
  },
  mounted() {
    this.question.type = this.question.type ? this.question.type : 'DEFAULT';
    this.selectedType = this.question.type;
  },
  methods: {
    /**
     * @desc {String} type
     * @param {String} type
     * @return {null}
     */
    questionTypeChanged(type) {
      this.question.type = this.selectedType;
      switch (type) {
        case 'BOOLEAN':
          this.question.options = [{ body: 'Option 1', sequence: 1 }, { body: 'Option 2', sequence: 2 }];
          break;
        case 'SCALE':
          this.question.labels.length = 2;
          break;
        default:
          window.console.log('Question type not matched');
      }
    },

    /**
     * @param {String} format
     * @return {null}
     */
    timeFormatModified(format) {
      window.console.log(format);
    },

    /**
     * @param {null}
     * @return {null}
     */
    addAnotherAnswer() {
      if (!this.question.options) {
        this.question.options = [];
      }
      let maxSequence = Number(Math.max(...this.question.options.map((x) => x.sequence)));
      if (!maxSequence) {
        maxSequence = this.question.options.length;
      }
      this.question.options.push({ body: null, sequence: maxSequence + 1 }); // eslint-disable-line
      this.$forceUpdate();
    },

    /**
     * @param {Object, Number}  options, index
     * @return {null}
     */
    deleteQuestionOptionItem(options, index) {
      this.question.options.splice(index, 1);
    },

    /**
     * @param {null}
     * @return {String} guid
     */
    getGUID() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
    },

    /**
     * @param {Object} question
     * @return {null}
     */
    saveQuestion(question) {
      question.id = question.id ? question.id : this.getGUID(); // eslint-disable-line
      this.$root.$emit('add-update-question', { question });
      this.question = { type: 'DEFAULT' };
    },


    /**
     * @param {Object} question
     * @return {null}
     */
    cancelQuestion(question) {
      window.console.log(question);
      this.question = JSON.parse(JSON.stringify(sampleQuestionObj));
      this.selectedType = 'DEFAULT';
    },

    /**
     * @param {Object} question
     * @return {null}
     */
    deleteQuestion(question) {
      this.$root.$emit('close-question', false);
    },

    /**
     * @param {Number} intervals
     * @return {null}
     */
    changeLabelsLength(intervals) {
      this.question.labels.length = intervals;
    },
  },
};
</script>

<style scoped>
  .fill{
    margin: 0;
    padding: 0;
  }
</style>
