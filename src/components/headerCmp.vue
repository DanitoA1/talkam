<template>
  <div>
    <v-app-bar
      class="hidden-sm-and-down"
      flat
      color="fbfdfff7"
      height="70px"
      style="
      background: rgba(255, 255, 255, 0);
      "
    >
      <router-link
        to="/"
      >
        <v-toolbar-title>
          <img
            class="ml-2"
            height="80"
            width="180"
            src="/img/SVG/BQLogo.svg"
            alt="logo"
          />
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn
        class="text-capitalize mr-2 my-6 fontweightbold deep-purple--text"
        rounded
        text
        @click="$vuetify.goTo(800, {duration: 1000, offset: 0, easing: 'easeInOutCubic'})"
      >
        Features
      </v-btn>
      <v-btn
        class="text-capitalize mr-2 my-6 deep-purple--text"
        rounded
        text
        @click="$vuetify.goTo(3700, {duration: 1000, offset: 0, easing: 'easeInOutCubic'})"
      >
        How it Works
      </v-btn>
      <v-btn
        class="text-capitalize mr-2 my-6 deep-purple--text"
        rounded
        text
      >
        Blog
      </v-btn>
      <v-btn
        class="text-capitalize mr-2 my-6 deep-purple--text"
        rounded
        text
        to="/login"
      >
        Login
      </v-btn>
      <v-btn
        class="text-capitalize"
        color="deep-purple"
        to="/signup"
        rounded
        outlined
        dark
      >
        Get Started
      </v-btn>
    </v-app-bar>
    <v-app-bar
      class="hidden-md-and-up"
      flat
      color="#FFFFFF"
      height="70px"
      style="
      background: rgba(255, 255, 255, 0.8);
      "
    >
      <router-link
        to="/"
      >
        <v-toolbar-title>
          <img
            height="50"
            width="180"
            src="/img/SVG/BQLogo.svg"
            alt="logo"
          />
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click="drawer = true"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      right
      color="rgba(209, 196, 233, 0.6)"
      hide-overlay
      dark
      class=""
      width="200"
      height="100%"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col>
          <v-row>
            <v-cols
              cols="12"
            >
              <v-btn
                class="text-capitalize my-6 fontweightbold deep-purple--text"
                rounded
                width="100%"
                color="white"
                @click="$vuetify.goTo(800, {duration: 1000, offset: 0, easing: 'easeInOutCubic'})"
              >
                Features
              </v-btn>
            </v-cols>
          </v-row>
          <v-row>
            <v-cols
              cols="12"
            >
              <v-btn
                class="text-capitalize my-6 fontweightbold deep-purple--text"
                rounded
                width="100%"
                color="white"
                @click="$vuetify.goTo(4200, {duration: 1000, offset: 0, easing: 'easeInOutCubic'})"
              >
                How it Works
              </v-btn>
            </v-cols>
          </v-row>
          <v-row>
            <v-cols
              cols="12"
            >
              <v-btn
                class="text-capitalize my-6 fontweightbold deep-purple--text"
                rounded
                width="100%"
                color="white"
                @click="$vuetify.goTo(3000, {duration: 1000, offset: 0, easing: 'easeInOutCubic'})"
              >
                Blog
              </v-btn>
            </v-cols>
          </v-row>
          <v-row>
            <v-cols
              cols="12"
            >
              <v-btn
                class="text-capitalize my-6 fontweightbold deep-purple--text"
                rounded
                width="100%"
                color="white"
                to="/login"
              >
                Login
              </v-btn>
            </v-cols>
          </v-row>
          <v-row>
            <v-cols
              cols="12"
            >
              <v-btn
                class="text-capitalize my-6 fontweightbold white--text"
                rounded
                width="100%"
                color="orange"
                to="/signup"
              >
                Get Started
              </v-btn>
            </v-cols>
          </v-row>
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
    >
      <v-card
        height="100vh"
      >
        <div
          class="d-flex"
        >
          <v-spacer></v-spacer>
          <v-btn
            class="mt-4 mr-4"
            icon
            @click="dialog = false"
          >
            <v-icon
              size="46px"
            >
              mdi-close
            </v-icon>
          </v-btn>
        </div>
        <div
          class="d-flex justify-center flex-column align-center"
          style="
          height: 85vh;
          "
        >
          <v-btn
            class="text-capitalize mb-6"
            color="orange"
            rounded
            dark
          >
            Download App
          </v-btn>
          <p
            class="my-6 text-body-2"
          >
            Blog
          </p>
          <p
            class="my-6 text-body-2"
          >
            About Us
          </p>
          <p
            class="my-6 text-body-2"
          >
            Our Products
          </p>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'headerCmp',
  data: () => ({
    dialog: false,
    drawer: false
  }),
  methods: {
    loginPop () {
      this.$emit('loginPop')
    },
    signUpPop () {
      this.$emit('signUpPop')
    }
  }
}
</script>
