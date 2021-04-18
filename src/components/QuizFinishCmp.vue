<template>
  <v-container>
    <div
      class="text-center"
    >
      <h1
        class="green--text mt-8"
      >
        All done!!!
      </h1>
      <blockquote
        class="blockquoute black--text"
      >
        You've successfully completed this quiz 👍
      </blockquote>
    </div>
    <div
      class="text-center mt-2"
    >
      <p>
        <span
          :class="Score > 49 ? 'green--text text-h5' : 'red--text text-h5'"
        >
          Score: {{ Score }}%
        </span>
        <span
          class="ml-6 mt-n1"
        >
          {{ totalQuestion - wrongAnsArr.length }}/{{ totalQuestion }}
        </span>
      </p>
    </div>
    <div
      v-if="wrongAnsArr.length === 0"
      class="my-8"
    >
      <v-img
        class="mx-auto"
        src="\img\SVG\boardfinish.svg"
        contain
        max-height="600px"
        max-width="600px"
      ></v-img>
    </div>
    <div
      v-else
    >
      <v-carousel
        class="my-3"
        v-model="carousel"
        :show-arrows="wrongAnsArr.length > 1"
        show-arrows-on-hover
        hide-delimiter-background
        height="400"
      >
        <v-carousel-item
          v-for="(wrongAns, i) in wrongAnsArr"
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
                      Question {{ wrongAns + 1 }}
                    </v-card-title>
                  </v-row>
                  <v-row
                    justify="center"
                  >
                    <p>
                      {{ Questions[wrongAns].question.body }}
                    </p>
                  </v-row>
                  <v-row
                    justify="center"
                    v-for="(option, j) in Questions[wrongAns].question.options"
                    :key="j"
                  >
                    <div
                      class="white black--text rounded-xl pa-2"
                    >
                      <p
                        v-if="option.answer"
                        class="ma-0"
                      >
                        {{ option.body }}
                      </p>
                    </div>
                  </v-row>
                </v-col>
              </v-row>
            </v-responsive>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div
      class="text-center"
    >
      <blockquote
        class="blockquoute black--text"
      >
        You too can create your own board, quiz and lot more for free
      </blockquote>
      <v-btn
        class="my-3"
        dark
        small
        rounded
        to="/"
      >
        See How
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'QuizFinishCmp',
  props: {
    Proceed: Function,
    Questions: Array,
    wrongAnsArr: Array,
    Score: String,
    totalQuestion: Number
  },
  data () {
    return {
      carousel: 0,
      colors: [
        'orange',
        'green',
        'red lighten-1',
        'purple lighten-2',
        'secondary'
      ]
    }
  },
  methods: {
    colorSelect (i) {
      i = i % 5
      return this.colors[i]
    }
  }
}
</script>
