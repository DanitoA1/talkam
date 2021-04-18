<template>
  <div class="limiter">
    <div class="container-login100" style="background-image: url('/img/bg-01.jpg');">
      <div class="wrap-login100 p-l-60 p-r-60 p-t-33 p-b-33">
        <div class="login100-form flex-sb flex-w">
          <div
            class="mx-auto"
          >
            <router-link
              to="/"
            >
              <img
                class="mt-n8"
                height="140"
                width="300"
                src="/img/SVG/BQLogo.svg"
                alt="logo"
              />
            </router-link>
          </div>
          <span class="login100-form-title mt-n6 p-b-34">
            Sign Up With
          </span>

          <a href="#" class="btn-face white--text m-b-20">
            <i class="fa fa-facebook-official"></i>
            Facebook
          </a>

          <a href="#" class="btn-google black--text m-b-20">
            <img src="@/assets/loginTemplate/images/icons/icon-google.png" alt="GOOGLE">
            Google
          </a>

          <div class="p-t-31 p-b-9">
            <span class="txt1">
              Username
            </span>
          </div>
          <div class="wrap-input100">
            <input class="input100" v-model="signUpData.name" type="text" name="username" >
            <span class="focus-input100"></span>
          </div>

          <div class="p-t-13 p-b-9">
            <span class="txt1">
              Email
            </span>
          </div>
          <div class="wrap-input100" :class="emailErr ? 'alert-validate' : ''" :data-validate="errMsg">
            <input class="input100" @click="emailErr = false" v-model.trim="signUpData.email" type="text" name="email" >
            <span class="focus-input100"></span>
          </div>

          <div class="p-t-13 p-b-9">
            <span class="txt1">
              Password
            </span>

          </div>
          <div class="wrap-input100">
            <input class="input100" v-model.trim="signUpData.password" type="password" name="pass" >
            <span class="focus-input100"></span>
          </div>

          <div class="container-login100-form-btn m-t-17">
            <button @click="signup()" class="login100-form-btn">
              <div
                v-if="!loader"
              >
                Sign Up
              </div>
              <div
                v-else
              >
                <v-progress-circular
                  indeterminate
                  color="white"
                ></v-progress-circular>
              </div>
            </button>
          </div>

          <div class="w-full text-center p-t-55">
            <span class="txt2">
              Already a member?
            </span>

            <v-btn
              class="txt2 bo1 blue--text text-capitalize"
              small
              text
              to="/login"
            >
              login
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SignUp',
  data: () => ({
    loader: false,
    signUpData: {
      email: '',
      password: '',
      name: ''
    },
    errMsg: '',
    passErr: false,
    emailErr: false
  }),
  computed: {
    ...mapState(['signUpError'])
  },
  watch: {
    signUpError (val) {
      this.loader = false
      if (val.code === 'auth/email-already-in-use') {
        this.emailErr = true
        this.errMsg = val.message
      }
    }
  },
  methods: {
    signup () {
      this.$store.dispatch('signup', {
        email: this.signUpData.email,
        password: this.signUpData.password,
        name: this.signUpData.name
      })
      this.loader = true
    }
  }
}
</script>

<style scoped>
  @import url('../assets/loginTemplate/vendor/bootstrap/css/bootstrap.min.css');
  @import url('../assets/loginTemplate/fonts/font-awesome-4.7.0/css/font-awesome.min.css');
  @import url('../assets/loginTemplate/fonts/Linearicons-Free-v1.0.0/icon-font.min.css');
  @import url('../assets/loginTemplate/vendor/animate/animate.css');
  @import url('../assets/loginTemplate/vendor/css-hamburgers/hamburgers.min.css');
  @import url('../assets/loginTemplate/vendor/animsition/css/animsition.min.css');
  @import url('../assets/loginTemplate/vendor/select2/select2.min.css');
  @import url('../assets/loginTemplate/vendor/daterangepicker/daterangepicker.css');
  @import url('../assets/loginTemplate/css/util.css');
  @import url('../assets/loginTemplate/css/main.css');
</style>
