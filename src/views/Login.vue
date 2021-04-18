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
            Sign in With
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
              Email
            </span>
          </div>
          <div class="wrap-input100" :class="emailErr ? 'alert-validate' : ''" :data-validate="errMsg">
            <input class="input100" @click="emailErr = false" v-model.trim="loginData.email" type="text" name="email" >
            <span class="focus-input100"></span>
          </div>

          <div class="p-t-13 p-b-9">
            <span class="txt1">
              Password
            </span>

            <a href="#" class="txt2 bo1 m-l-5">
              Forgot?
            </a>
          </div>
          <div class="wrap-input100" :class="passErr ? 'alert-validate' : ''" :data-validate="errMsg">
            <input class="input100" @click="passErr = false" v-model.trim="loginData.password" type="password" name="pass" >
            <span class="focus-input100"></span>
          </div>

          <div class="container-login100-form-btn m-t-17">
            <button @click="login()" class="login100-form-btn">
              <div
                v-if="!loader && !loginSuccess"
              >
                Sign In
              </div>
              <div
                v-else-if="loader && !loginSuccess"
              >

              </div>
              <div
                v-else
              >
                <v-icon
                  color="success"
                  size="35"
                >
                  mdi-checkbox-marked-circle-outline
                </v-icon>
              </div>
            </button>
          </div>

          <div class="w-full text-center p-t-55">
            <span class="txt2">
              Not a member?
            </span>

            <v-btn
              class="txt2 bo1 blue--text text-capitalize"
              small
              text
              to="/signup"
            >
              Sign Up Now
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    loader: false,
    loginData: {
      email: '',
      password: ''
    },
    reset: {
      email: ''
    },
    errMsg: '',
    passErr: false,
    emailErr: false,
    loginSuccess: false
  }),
  computed: {
    ...mapState(['loginError'])
  },
  watch: {
    loginError (val) {
      this.loader = false
      if (val.code === 'auth/user-not-found') {
        this.emailErr = true
        this.errMsg = 'Not a registered Email'
      } else if (val.code === 'auth/wrong-password') {
        this.passErr = true
        this.errMsg = val.message
      } else this.errMsg = val.message
    }
  },
  methods: {
    async login () {
      this.loader = true
      this.errMsg = ''
      await this.$store.dispatch('login', {
        email: this.loginData.email,
        password: this.loginData.password
      })
      this.loader = false
      if (this.errMsg === '') {
        this.loginSuccess = true
      }
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
