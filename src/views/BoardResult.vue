<template>
  <v-container>
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
          Total Response: 645
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
      v-for="(question, index) in Board[0].questionsList"
      :key="index"
    >
      <div
        v-if="question.question.type === 'BOOLEAN'"
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
            elevation="6"
            style="
              border-left: 5px solid #673AB7 !important;
            "
          >
            <v-card-text>
              {{ index + 1 }}. {{ question.question.body }}
            </v-card-text>
            <PieChart
              class="mx-auto mt-2"
              style="
                max-width: 350px;
              "
            />
            <v-card-text
              class="text-center mx-auto"
            >
              <span
                class="mx-2"
              >
                Responses: 382
              </span>
              <span
                class="mx-2"
              >
                Skipped: 234
              </span>
            </v-card-text>
          </v-card>
        </v-lazy>
      </div>
      <div
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
                Responses: 382
              </span>
              <span
                class="mx-2"
              >
                Skipped: 234
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
                Responses: 382
              </span>
              <span
                class="mx-2"
              >
                Skipped: 234
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
                Responses: 382
              </span>
              <span
                class="mx-2"
              >
                Skipped: 234
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
                      <v-list-item-content
                        style="
                        background-color: #D1C4E9;
                        "
                        class="rounded-r-xl"
                      >
                        <v-list-item-subtitle
                          class="ml-2"
                          v-text="i+1 + '. ' + item.body"
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
                            {{ item.sequence }}
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
                value="3.5"
                hover
                :length="question.question.Stars"
                :x-large="$vuetify.breakpoint.mdAndUp"
              />
            </div>
            <div
              class="text-center mt-5"
            >
              <p>
                Average Rating: 4.5
              </p>
            </div>
            <v-card-text
              class="text-center mx-auto"
            >
              <span
                class="mx-2"
              >
                Responses: 382
              </span>
              <span
                class="mx-2"
              >
                Skipped: 234
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
                value="80"
              >
                <template v-slot:thumb-label="{ value }">
                  {{ satisfactionEmojis[Math.min(Math.floor(value / 10), 10)] }}
                </template>
              </v-slider>
            </div>
            <div
              class="text-center"
            >
              <p>
                Average Scale Value: 8
              </p>
            </div>
            <v-card-text
              class="text-center mx-auto"
            >
              <span
                class="mx-2"
              >
                Responses: 382
              </span>
              <span
                class="mx-2"
              >
                Skipped: 234
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
                Responses: 382
              </span>
              <span
                class="mx-2"
              >
                Skipped: 234
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
                      <v-list-item-content
                        style="
                        background-color: #D1C4E9;
                        "
                        class="rounded-r-xl"
                      >
                        <v-list-item-subtitle
                          class="ml-2"
                          v-text="i+1 + '. ' + item.body"
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
                            {{ item.sequence }}
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
  </v-container>
</template>

<script>
import BoardResult from '@/boards.json';
import PieChart from '@/components/PieChart.vue';
import BarChart from '@/components/BarChart.vue';

export default {
  name: 'BoardResult',
  components: {
    PieChart,
    BarChart,
  },
  data() {
    return {
      Board: [],
      satisfactionEmojis: ['😭', '😢', '☹️', '🙁', '😐', '🙂', '😊', '😄', '😃', '😍', '🥰'],
    };
  },
  mounted() {
    this.Board.push(JSON.parse(JSON.stringify(BoardResult)));
  },
};
</script>
