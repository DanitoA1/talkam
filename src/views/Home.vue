<!-- eslint-disable -->
<template>
  <div>
    <v-hover>
      <template v-slot="{ hover }">
        <v-app-bar
          color="deep-purple"
          fixed
          dense
          collapse
          :elevation="hover ? 24 : 6"
          elevate-on-scroll
          dark
        >
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        </v-app-bar>
      </template>
    </v-hover>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      class="mt-12"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon class="icon-color">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item
            @click.stop="signUpModal = true"
          >
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Get Started</v-list-item-title>
          </v-list-item>

          <v-list-item
            @click.stop="loginModal = true"
          >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-dialog
      v-model="signUpModal"
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
            Create An Account
          </v-card-title>
        </v-toolbar>
        <v-container
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
      </v-card>
    </v-dialog>
    <HomeComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComponent from '@/components/HomeComponent.vue';
import { auth } from '@/firebase';

export default {
  name: 'Home',
  components: {
    HomeComponent,
  },
  data: () => ({
    drawer: false,
    signUpModal: false,
    loginModal: false,
    passwordResetModal: false,
    resetSuccess: false,
    show1: false,
    loginData: {
      email: '',
      password: '',
    },
    signUpData: {
      email: '',
      password: '',
      name: '',
    },
    reset: {
      email: '',
    },
    errMsg: '',
  }),
  methods: {
    openLogin() {
      this.signUpModal = false;
      this.passwordResetModal = false;
      this.loginModal = true;
    },
    openSignUp() {
      this.loginModal = false;
      this.passwordResetModal = false;
      this.signUpModal = true;
    },
    openReset() {
      this.signUpModal = false;
      this.loginModal = false;
      this.passwordResetModal = true;
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginData.email,
        password: this.loginData.password,
      });
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signUpData.email,
        password: this.signUpData.password,
        name: this.signUpData.name,
      });
    },
    async resetPassword() {
      this.errorMsg = '';

      try {
        await auth.sendPasswordResetEmail(this.reset.email);
        this.resetSuccess = true;
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
  },
};
</script>
