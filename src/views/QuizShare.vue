<template>
  <v-container>
    <div
      class="d-flex justify-end mb-md-n6"
    >
      <v-btn
        class="text-capitalize"
        color="black"
        dark
        small
        rounded
        to="/user/quiz"
      >
        <v-icon>
          mdi-arrow-left
        </v-icon>
        All Quiz
      </v-btn>
    </div>
    <div
      class="text-center"
    >
      <h1
        class="text-h5 my-3 deep-purple--text text-capitalize font-weight-bold"
      >
        {{ title }}
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
            >Quiz</span> Link:
          </p>
        </v-col>
        <v-col
          cols="8"
          md="7"
        >
          <v-text-field
            v-model="quizLink2"
            solo
            disabled
            :loading="!loaded"
          />
          <input
            id="testing-code"
            v-model="quizLink2"
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
              <ShareNetwork
                network="whatsapp"
                :url="quizLink2"
                :title="title"
                :description="description"
                hashtags="boardquiz"
              >
                <v-btn
                  color="success"
                  dark
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
              </ShareNetwork>
            </v-col>
            <v-col
              class="text-center"
              cols="6"
            >
              <ShareNetwork
                network="twitter"
                :url="quizLink2"
                :title="description"
                :description="description"
                hashtags="boardquiz"
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
              </ShareNetwork>
            </v-col>
            <v-col
              class="text-center"
              cols="6"
            >
              <ShareNetwork
                network="facebook"
                :url="quizLink2"
                :title="title"
                :description="description"
                quote="This is an invite link to a feedback board on boardquiz"
                hashtags="boardquiz"
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
              </ShareNetwork>
            </v-col>
            <v-col
              class="text-center"
              cols="6"
            >
              <ShareNetwork
                network="telegram"
                :url="quizLink2"
                :title="title"
                :description="description"
                quote="This is an invite link to a feedback board on boardquiz"
                hashtags="boardquiz"
              >
                <v-btn
                  color="#0088cc"
                  dark
                  :width="$vuetify.breakpoint.sm ? '210px'
                    : $vuetify.breakpoint.mdAndUp ? '325px' : '135'"
                  small
                >
                  <v-icon
                    class="mr-3"
                  >
                    mdi-telegram
                  </v-icon>
                  Telegram
                </v-btn>
              </ShareNetwork>
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
                  <ShareNetwork
                    network="email"
                    :url="quizLink2"
                    :title="title"
                    :description="description"
                    quote="This is an invite link to a feedback board on boardquiz"
                    hashtags="boardquiz"
                  >
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
                        mdi-email
                      </v-icon>
                      Mail Share
                    </v-btn>
                  </ShareNetwork>
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
import { quizCollection } from '@/firebase'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'QuizShare',
  data () {
    return {
      quizLink: '',
      quizLink2: '',
      errors: [],
      loaded: false,
      api_Key: 'AIzaSyBdYYSMdW7NJFra5neoIM8gsRDhCGwsIao',
      id: 0
    }
  },
  computed: {
    ...mapState(['userId']),
    ...mapState(['quizzes']),
    title () {
      const quizIndex = this.quizzes.findIndex((x) => x.id === this.id)
      return this.quizzes[quizIndex].quiz[0].Title
    },
    description () {
      const quizIndex = this.quizzes.findIndex((x) => x.id === this.id)
      return this.quizzes[quizIndex].quiz[0].Caption
    }
  },
  created () {
    this.id = this.$route.params.id
    this.quizLink = `https://talkam-2d177.web.app/quiz/${this.userId}_${this.$route.params.id}`
  },
  mounted () {
    this.urlCheck()
  },
  methods: {
    copyTestingCode () {
      const testingCodeToCopy = document.querySelector('#testing-code')
      testingCodeToCopy.setAttribute('type', 'text')
      testingCodeToCopy.select()
      try {
        const successful = document.execCommand('copy')
        const msg = successful ? 'successful' : 'unsuccessful'
        alert('Testing code was copied ')
        console.log(msg)
      } catch (err) {
        alert('Oops, unable to copy')
      }
      testingCodeToCopy.setAttribute('type', 'hidden')
      /* unselect the range */
      window.getSelection().removeAllRanges()
    },
    urlCheck () {
      const quizIndex = this.quizzes.findIndex((x) => x.id === this.id)
      if (this.quizzes[quizIndex].url) {
        this.quizLink2 = this.quizzes[quizIndex].url
        this.loaded = true
      } else {
        this.urlShortener()
      }
    },
    async urlShortener () {
      await axios({
        method: 'post',
        url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${this.api_Key}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          dynamicLinkInfo: {
            domainUriPrefix: 'https://talkam.page.link',
            link: `${this.quizLink}`,
            socialMetaTagInfo: {
              socialTitle: 'Talkam',
              socialDescription: `You've been invited by ${this.quizzes[0].userName} to take this quiz`,
              socialImageLink: 'https://talkam-2d177.web.app/img/habiba.jpg'
            }
          },
          suffix: {
            option: 'SHORT'
          }
        }
      })
        .then(response => {
          const link = response.data.shortLink
          this.urlUpdate(link)
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    async urlUpdate (link) {
      await quizCollection.doc(this.userId).collection('userquizzes').doc(this.id).update({
        url: link
      })
      this.quizLink2 = link
      this.loaded = true
    }
  }
}
</script>
