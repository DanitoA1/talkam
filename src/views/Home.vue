<template>
  <div>
    <div class="box">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div
      v-if="$vuetify.breakpoint.mdAndUp"
    >
      <v-img
        src="/img/SVG/topBckgrd.svg"
        width="100%"
        contain
        eager
      >
        <headerCmp
          @loginPop="loginModal = true"
          @signUpPop="signUpModal = true"
        />
        <div
          class="ml-6"
        >
          <h1
            class="lobster text-capitalize deep-purple--text"
            style="
            max-width: 350px;
            margin-top: 185px;
            "
          >
            Quick feedback board & quiz builder
          </h1>
          <p
            class="text-h5"
            style="
            max-width: 425px;
            margin-top: 40px;
            color: #515352;
            "
          >
            Get started today and gain access to our simple and powerful tool
            for all your Surveys, Polls, questionnaires, Quizzes and a lot more
          </p>
          <v-btn
            class="text-capitalize mt-2"
            color="deep-purple"
            to="/signup"
            rounded
            dark
            large
          >
            Get Started Now
            <v-icon
              class="ml-2"
            >
              mdi-arrow-right
            </v-icon>
          </v-btn>
        </div>
      </v-img>
    </div>
    <div
      v-else
    >
      <headerCmp
        @loginPop="loginModal = true"
        @signUpPop="signUpModal = true"
      />
      <div
        class="text-center"
      >
        <h1
          class="lobster mx-auto text-capitalize deep-purple--text"
          style="
          max-width: 350px;
          margin-top: 50px;
          "
        >
          Quick feedback board & quiz builder
        </h1>
        <p
          class="mx-auto text-5"
          style="
          max-width: 425px;
          margin-top: 40px;
          color: #515352;
          "
        >
          Get started today and gain access to our simple and powerful tool
          for all your Surveys, Polls, questionnaires, Quizzes and a lot more
        </p>
        <v-btn
          class="text-capitalize mt-2"
          color="deep-purple"
          to="/signup"
          rounded
          dark
          large
        >
          Get Started Now
          <v-icon
            class="ml-2"
          >
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-dialog
      v-model="signUpModal"
      max-width="400"
    >
      <v-card
        rounded="t-xl"
        min-height="200px"
      >
        <v-toolbar
          color="deep-purple"
          dense
          dark
        >
          <v-card-title
            class="mx-auto"
          >
            Create An Account
          </v-card-title>
        </v-toolbar>
        <v-container
          v-if="loader == false"
          class="mt-4"
        >
          <v-text-field
            class="my-3"
            v-model="signUpData.name"
            color="deep-purple"
            outlined
            rounded
            dense
            label="Name"
            type="text"
            hint="First Name/Nickname"
          />
          <v-text-field
            class="my-3"
            v-model.trim="signUpData.email"
            color="deep-purple"
            outlined
            rounded
            dense
            label="Email"
            type="text"
            hint="Enter a Valid Email"
          />
          <v-text-field
            class="my-3"
            v-model.trim="signUpData.password"
            color="deep-purple"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show1 = !show1"
            :type="show1 ? 'text' : 'password'"
            outlined
            rounded
            dense
            label="Password"
            hint="Enter Password"
          />
          <div class="text-center">
            <v-btn
              class="mb-2 text-capitalize"
              color="deep-purple"
              rounded
              dark
              @click="signup()"
            >
              Sign Up
            </v-btn>
            <p
              class="text-caption"
            >
              Already have an account ?
              <v-btn
                class="deep-purple--text ml-n2 text-capitalize"
                text
                rounded
                small
                @click="openLogin()"
              >
                Login
              </v-btn>
            </p>
          </div>
        </v-container>
        <v-container
          v-else
          class="text-center"
        >
          <v-progress-circular
            class="my-10"
            indeterminate
            color="orange"
            size="50"
          ></v-progress-circular>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="loginModal"
      max-width="400"
    >
      <v-card
        rounded="t-xl"
      >
        <v-toolbar
          color="deep-purple"
          dense
          dark
        >
          <v-card-title
            class="mx-auto"
          >
            Login To Account
          </v-card-title>
        </v-toolbar>
        <v-container
          v-if="loader == false"
          class="mt-4"
        >
          <v-text-field
            class="my-3"
            v-model.trim="loginData.email"
            color="deep-purple"
            outlined
            rounded
            dense
            label="Email"
            type="text"
            hint="Enter a registered email"
          />
          <v-text-field
            class="my-3"
            v-model.trim="loginData.password"
            color="deep-purple"
            outlined
            rounded
            dense
            label="Password"
            type="password"
            hint="Enter your password"
          />
          <div class="text-center">
            <a
              class="text-caption"
              @click="openReset()"
            >
              Forgot Password?
            </a>
            <br>
            <v-btn
              class="mb-2 mt-3 text-capitalize"
              color="deep-purple"
              width="100px"
              rounded
              dark
              @click="login()"
            >
              Login
            </v-btn>
            <p
              class="text-caption"
            >
              Don't have an account?
              <v-btn
                class="deep-purple--text ml-n2 text-capitalize"
                text
                rounded
                small
                @click="openSignUp()"
              >
                Sign Up
              </v-btn>
            </p>
          </div>
        </v-container>
        <v-container
          v-else
          class="text-center"
        >
          <v-progress-circular
            class="my-10"
            indeterminate
            color="orange"
            size="50"
          ></v-progress-circular>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="passwordResetModal"
      max-width="400"
    >
      <v-card
        rounded="t-xl"
      >
        <v-toolbar
          color="deep-purple"
          dense
          dark
        >
          <v-card-title
            class="mx-auto"
          >
            Reset Password
          </v-card-title>
        </v-toolbar>
        <v-container
          v-if="loader == false"
          class="mt-4"
        >
          <div
            v-if="!resetSuccess"
          >
            <v-text-field
              class="my-3"
              v-model.trim="reset.email"
              color="deep-purple"
              outlined
              rounded
              dense
              label="Enter your email to reset your password"
              type="text"
              hint="Enter a registered email"
            />
            <div class="text-center">
              <p
                v-if="errMsg"
                class="my-0 red--text text-caption"
              >
                {{ errMsg }}
              </p>
              <v-btn
                class="mb-2 mt-3 text-capitalize"
                color="deep-purple"
                width="100px"
                rounded
                dark
                @click="resetPassword()"
              >
                Reset
              </v-btn>
              <p
                class="text-caption"
              >
                Don't have an account?
                <v-btn
                  class="deep-purple--text ml-n2 text-capitalize"
                  text
                  rounded
                  small
                  @click="openSignUp()"
                >
                  Sign Up
                </v-btn>
              </p>
            </div>
          </div>
          <div
            v-else
            class="text-center"
          >
            <p>
              Password Reset Successful!!!
            </p>
            <v-avatar
              color="green"
              size="100"
            >
              <v-icon
                color="white"
                size="70"
              >
                mdi-checkbox-marked-circle-outline
              </v-icon>
            </v-avatar>
            <p
              class="mt-3"
            >
              Check your email for a reset link
            </p>
          </div>
        </v-container>
        <v-container
          v-else
          class="text-center"
        >
          <v-progress-circular
            class="my-10"
            indeterminate
            color="orange"
            size="50"
          ></v-progress-circular>
        </v-container>
      </v-card>
    </v-dialog>
    <v-container
      class="mx-auto"
    >
      <h2
          class="montserratBold text-center"
          style="
          max-width: 600px;
          margin: 100px auto 60px;
          color: #001937;
          "
        >
          Build Multipurpose feedback board and Quiz that your audience will love to fill
        </h2>
    </v-container>
    <div
      style="
      background-color: rgba(209, 196, 233, 0.6);
      padding: 30px;
      "
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="6"
        >
          <v-img
            src="/img/SVG/level1img3.svg"
            contain
            width="100%"
          ></v-img>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <h1
            class="montserratBold deep-purple--text"
            style="
            max-width: 350px;
            "
          >
            Real-time Result
          </h1>
          <p
            class="poppins text-subtitle-1 text-lg-h6"
            :class="$vuetify.breakpoint.lgAndUp ? 'featureBody2':'featureBody1'"
            style="
            margin-top: 40px;
            color: #515352;
            "
          >
            Your responses are automatically collected and organized neatly with real-time changes
             on result charts and details
          </p>
        </v-col>
      </v-row>
    </div>
    <div
      style="
      padding: 30px;
      "
    >
      <v-row
        align="center"
        justify="center"
        class="flex-column-reverse flex-sm-row"
      >
        <v-col
          cols="12"
          sm="6"
        >
          <h1
            class="montserratBold deep-purple--text"
            style="
            max-width: 350px;
            "
          >
            Responsive Design
          </h1>
          <p
            class="poppins text-subtitle-1 text-lg-h6"
            :class="$vuetify.breakpoint.lgAndUp ? 'featureBody2':'featureBody1'"
            style="
            margin-top: 40px;
            color: #515352;
            "
          >
            Build your feedback board or quiz from any device and still get the best of experience for yourself
             and your audience, as they too can fill up your content from any device.
          </p>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-img
            src="/img/SVG/level2img2.svg"
            contain
            width="100%"
            :height="$vuetify.breakpoint.smAndUp ? 400: null"
          ></v-img>
        </v-col>
      </v-row>
    </div>
    <v-divider
      class="my-8"
    ></v-divider>
    <div
      style="
      padding: 30px;
      "
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="6"
        >
          <v-img
            src="/img/SVG/level3img.svg"
            contain
            width="100%"
          ></v-img>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <h1
            class="montserratBold deep-purple--text"
            style="
            max-width: 350px;
            "
          >
            Quick & Easy Build
          </h1>
          <p
            class="poppins text-subtitle-1 text-lg-h6"
            :class="$vuetify.breakpoint.lgAndUp ? 'featureBody2':'featureBody1'"
            style="
            margin-top: 40px;
            color: #515352;
            "
          >
            Building a feedback board or quiz shouldn't be hard, it should be easy and enjoyable.
             We've built our system to make your creation and sharing process a fun and quick one.
          </p>
        </v-col>
      </v-row>
    </div>
    <v-divider
      class="my-8"
    ></v-divider>
    <div
      style="
      padding: 30px;
      "
    >
      <v-row
        align="center"
        justify="center"
        class="flex-column-reverse flex-sm-row"
      >
        <v-col
          cols="12"
          sm="6"
        >
          <h1
            class="montserratBold deep-purple--text"
            style="
            max-width: 350px;
            "
          >
            Feedback Board & Quiz Templates
          </h1>
          <p
            class="poppins text-subtitle-1 text-lg-h6"
            :class="$vuetify.breakpoint.lgAndUp ? 'featureBody2':'featureBody1'"
            style="
            margin-top: 40px;
            color: #515352;
            "
          >
            Our pre-written questions can give you ideas to coming up with yours or might just be
             exactly what you need. Using templates just helps in reducing your build time. However, you're
             always free to start with a blank board or quiz.
          </p>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-img
            src="/img/SVG/level4img2.svg"
            contain
            width="100%"
            :height="$vuetify.breakpoint.smAndUp ? 400: null"
          ></v-img>
        </v-col>
      </v-row>
    </div>
    <v-divider
      class="my-8"
    ></v-divider>
    <div
      style="
      padding: 30px;
      "
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="6"
        >
          <v-img
            src="/img/SVG/level5img.svg"
            contain
            width="100%"
          ></v-img>
        </v-col>
        <v-col
         cols="12"
         sm="6"
        >
          <h1
            class="montserratBold deep-purple--text"
            style="
            max-width: 350px;
            "
          >
            Multiple Board Types
          </h1>
          <p
            class="poppins text-subtitle-1 text-lg-h6"
            :class="$vuetify.breakpoint.lgAndUp ? 'featureBody2':'featureBody1'"
            style="
            margin-top: 40px;
            color: #515352;
            "
          >
            Choose from our list of feedback board options, from survey to questionnaire to polls and lot more
            with different question type to match your feedback purpose.
          </p>
        </v-col>
      </v-row>
    </div>
    <v-divider
      class="mt-10"
    ></v-divider>
    <v-container
      class="mx-auto"
    >
      <h2
          class="montserratBold text-center"
          style="
          max-width: 600px;
          margin: 100px auto 60px;
          color: #001937;
          "
        >
          We listen to our users and we are constantly working on more amazing features
        </h2>
    </v-container>
    <div
      style="
      background-color: #673AB7;
      padding: 30px;
      "
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          md="6"
        >
          <v-img
            src="/img/SVG/level6img.svg"
            class="mx-auto"
            contain
            :width="$vuetify.breakpoint.sm ? '400px' : '100%'"
          ></v-img>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <h1
            class="montserratBold text-center orange--text"
          >
           How it Works
          </h1>
           <v-row
            align="center"
            justify="center"
           >
            <v-col
              cols="3"
              sm="2"
            >
              <v-icon
              x-large
              color="success"
              >mdi-checkbox-marked-circle</v-icon>
            </v-col>
            <v-col
              cols="9"
              sm="10"
            >
              <p
                class="white--text ml-n6 my-3"
              >
                Build by selecting a template or starting blank.
              </p>
            </v-col>
          </v-row>
          <v-row
            align="center"
            justify="center"
           >
            <v-col
              cols="3"
              sm="2"
            >
              <v-icon
              x-large
              color="success"
              >mdi-link-variant</v-icon>
            </v-col>
            <v-col
              cols="9"
              sm="10"
            >
              <p
                class="white--text ml-n6 my-3"
              >
                Once you hit the publish button after building, a link is automatically generated
                for sharing.
              </p>
            </v-col>
          </v-row>
          <v-row
            align="center"
            justify="center"
           >
            <v-col
              cols="3"
              sm="2"
            >
              <v-icon
              x-large
              color="success"
              >mdi-share-variant-outline</v-icon>
            </v-col>
            <v-col
              cols="9"
              sm="10"
            >
              <p
                class="white--text ml-n6 my-3"
              >
                You can easily share your feedback board or quiz link to your audience via any
                of the major social media platform in just one click.
              </p>
            </v-col>
          </v-row>
          <v-row
            align="center"
            justify="center"
           >
            <v-col
              cols="3"
              sm="2"
            >
              <v-icon
              x-large
              color="success"
              >mdi-chart-areaspline</v-icon>
            </v-col>
            <v-col
              cols="9"
              sm="10"
            >
              <p
                class="white--text ml-n6 my-3"
              >
                Now just seat back and watch the results of your feedback board or quiz come together.
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row
        class="text-center my-6"
      >
        <v-col>
          <v-btn
            class="text-capitalize mt-2"
            rounded
            dark
            large
            color="orange"
            to="/signup"
          >
            Get Started Now
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <v-footer
      dark
      padless
    >
      <v-card
        flat
        tile
        class="black white--text text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          We are dedicated to creating a great user experience as well as amazing tools
          to make your survey/feedback board and quiz building process a quick and enjoyable one.
          We strive to keep our tools regularly updated to meet our users' expectations.
          Our users are very important to us and our growth and we take your suggestions and
          request very seriously.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Boardquiz</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import headerCmp from '@/components/headerCmp.vue'
import { auth } from '@/firebase'

export default {
  name: 'Home',
  components: {
    headerCmp
  },
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram'
    ],
    loader: false,
    drawer: false,
    signUpModal: false,
    loginModal: false,
    passwordResetModal: false,
    resetSuccess: false,
    show1: false,
    loginData: {
      email: '',
      password: ''
    },
    signUpData: {
      email: '',
      password: '',
      name: ''
    },
    reset: {
      email: ''
    },
    errMsg: ''
  }),
  methods: {
    openLogin () {
      this.signUpModal = false
      this.passwordResetModal = false
      this.loginModal = true
    },
    openSignUp () {
      this.loginModal = false
      this.passwordResetModal = false
      this.signUpModal = true
    },
    openReset () {
      this.signUpModal = false
      this.loginModal = false
      this.passwordResetModal = true
    },
    login () {
      this.$store.dispatch('login', {
        email: this.loginData.email,
        password: this.loginData.password
      })
      this.loader = true
    },
    signup () {
      this.$store.dispatch('signup', {
        email: this.signUpData.email,
        password: this.signUpData.password,
        name: this.signUpData.name
      })
      this.loader = true
    },
    async resetPassword () {
      this.errorMsg = ''

      try {
        await auth.sendPasswordResetEmail(this.reset.email)
        this.resetSuccess = true
      } catch (err) {
        this.errorMsg = err.message
      }
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&display=swap');
  .montserratBold {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
  }
  .montserratMedium {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }
  .poppins {
    font-family: 'Poppins', sans-serif;
    font-weight: 300;
  }
  .lobster {
    font-family: 'Lobster Two', cursive;
    font-weight: 700;
    font-size: 40px;
  }
  .box div{
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 40%;
  }
  .box div:nth-child(1){
    top: 72px;
    left: 42%;
    animation: animate 10s linear infinite;
    background-color: orangered;
  }
  .box div:nth-child(2){
    top: 420px;
    left: 50%;
    animation: animate 7s linear infinite;
    background-color: goldenrod;
  }
  .box div:nth-child(3){
    top: 102px;
    left: 6%;
    animation: animate 9s linear infinite;
    background-color: gold;
  }
    .box div:nth-child(4){
    top: 120px;
    left: 60%;
    animation: animate 10s linear infinite;
    background-color: orange;
  }
    .box div:nth-child(5){
    top: 402px;
    left: 10%;
    animation: animate 6s linear infinite;
    background-color: palevioletred;
  }
    .box div:nth-child(6){
    top: 480px;
    left: 70%;
    animation: animate 12s linear infinite;
    background-color: blue;
  }
    .box div:nth-child(7){
    top: 360px;
    left: 80%;
    animation: animate 15s linear infinite;
    background-color: green;
  }
    .box div:nth-child(8){
    top: 192px;
    left: 25%;
    animation: animate 16s linear infinite;
    background-color: #673AB7;
  }
    .box div:nth-child(9){
    top: 540px;
    left: 25%;
    animation: animate 9s linear infinite;
    background-color: greenyellow;
  }
    .box div:nth-child(10){
    top: 120px;
    left: 80%;
    animation: animate 5s linear infinite;
    background-color: goldenrod;
  }
  @keyframes animate {
    0%{
      transform: scale(0) translateY(0) translateX(0) rotate(0);
      opacity: 1;
    }
    100%{
      transform: scale(1) translateY(-90px) translateX(50px) rotate(360deg);
      opacity: 0;
    }
  }
  .featureBody1 {
    max-width: 425px;
  }
  .featureBody2 {
    max-width: 600px;
  }
</style>
