<template>
  <v-container>
    <div
      class="text-center"
    >
      <h1
        class="text-h5 my-3 deep-purple--text text-capitalize font-weight-bold"
      >
        Self Survey
      </h1>
      <v-row>
        <v-col
          class="my-3 mx-0 d-flex justify-end"
          cols="2"
          md="3"
        >
          <p
            class="mr-n2"
          >
            <span
              class="hidden-sm-and-down"
            >Board</span> Link:
          </p>
        </v-col>
        <v-col
          cols="8"
          md="7"
        >
          <v-text-field
            v-model="boardLink"
            solo
            disabled
          />
          <input
            id="testing-code"
            v-model="boardLink"
            type="hidden"
          >
        </v-col>
        <v-col
          class="d-flex justify-start"
          cols="2"
          md="2"
        >
          <v-btn
            class="mt-n1 ml-n3"
            color="orange"
            dark
            icon
            fab
            @click="copyTestingCode()"
          >
            <v-icon
              size="30"
            >
              mdi-content-copy
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div
      class="my-8"
    >
      <v-img
        class="mx-auto"
        src="\img\SVG\boardshare.svg"
        contain
        max-height="500px"
        max-width="500px"
      />
    </div>
    <div class="text-center">
      <p
        class="text-subtitle-1 font-weight-bold"
      >
        Share Link
      </p>
      <v-row>
        <v-col
          class="mx-auto"
          cols="12"
          sm="10"
        >
          <v-row>
            <v-col
              class="text-center"
              cols="6"
            >
              <v-btn
                color="success"
                :width="$vuetify.breakpoint.sm ? '210px'
                  : $vuetify.breakpoint.mdAndUp ? '325px' : '135'"
                small
              >
                <v-icon
                  class="mr-3"
                >
                  mdi-whatsapp
                </v-icon>
                WhatsApp
              </v-btn>
            </v-col>
            <v-col
              class="text-center"
              cols="6"
            >
              <v-btn
                color="blue"
                dark
                :width="$vuetify.breakpoint.sm ? '210px'
                  : $vuetify.breakpoint.mdAndUp ? '325px' : '135'"
                small
              >
                <v-icon
                  class="mr-3"
                >
                  mdi-twitter
                </v-icon>
                Twitter
              </v-btn>
            </v-col>
            <v-col
              class="text-center"
              cols="6"
            >
              <v-btn
                color="#01579B"
                dark
                :width="$vuetify.breakpoint.sm ? '210px'
                  : $vuetify.breakpoint.mdAndUp ? '325px' : '135'"
                small
              >
                <v-icon
                  class="mr-3"
                >
                  mdi-facebook
                </v-icon>
                Facebook
              </v-btn>
            </v-col>
            <v-col
              class="text-center"
              cols="6"
            >
              <v-btn
                color="#F57F17"
                dark
                :width="$vuetify.breakpoint.sm ? '210px'
                  : $vuetify.breakpoint.mdAndUp ? '325px' : '135'"
                small
              >
                <v-icon
                  class="mr-3"
                >
                  mdi-instagram
                </v-icon>
                Instagram
              </v-btn>
            </v-col>
            <v-col
              class="text-center"
              cols="12"
            >
              <v-row
                no-gutters
                class="mx-auto"
              >
                <v-col>
                  <v-btn
                    color="red"
                    dark
                    :width="$vuetify.breakpoint.sm ? '210px'
                      : $vuetify.breakpoint.mdAndUp ? '325px' : '135'"
                    small
                  >
                    <v-icon
                      class="mr-3"
                    >
                      mdi-google
                    </v-icon>
                    Google
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BoardShare',
  data() {
    return {
      boardLink: '',
      id: 0,
    };
  },
  computed: {
    ...mapState(['userId']),
  },
  created() {
    this.id = this.$route.params.id;
    this.boardLink = `https://talkam-2d177.web.app/board/${this.userId}_${this.$route.params.id}`;
  },
  methods: {
    copyTestingCode() {
      const testingCodeToCopy = document.querySelector('#testing-code');
      testingCodeToCopy.setAttribute('type', 'text');
      testingCodeToCopy.select();
      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        alert('Testing code was copied ');
        console.log(msg);
      } catch (err) {
        alert('Oops, unable to copy');
      }
      testingCodeToCopy.setAttribute('type', 'hidden');
      /* unselect the range */
      window.getSelection().removeAllRanges();
    },
  },
};
</script>
