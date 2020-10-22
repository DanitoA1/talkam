<!-- eslint-disable -->
<template>
  <div>
    <v-toolbar
      color="deep-purple"
      dark
      dense
    >
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="d-md-none"
      ></v-app-bar-nav-icon>

      <v-toolbar-title
        class="mx-auto"
      >Talkam</v-toolbar-title>

    </v-toolbar>

    <v-navigation-drawer
      absolute
      v-model="drawer"
      color="orange"
      dark
      fixed
      :mini-variant="$vuetify.breakpoint.mdAndUp"
      :expand-on-hover="$vuetify.breakpoint.mdAndUp"
      :permanent="$vuetify.breakpoint.mdAndUp"
      class="mt-12"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar
            size="36"
          >
            <img src="/img/habiba.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ userProfile.name }}</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="logout()"
        >
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'User',
  data: () => ({
    drawer: false,
    items: [
      { title: 'Home', icon: 'mdi-home-city', link: '/' },
      { title: 'Overview', icon: 'mdi-view-dashboard', link: '/user/overview' },
      { title: 'Feedback Board', icon: 'mdi-animation-outline', link: '/user/board' },
      { title: 'Quiz', icon: 'mdi-account-question-outline', link: '/user/quiz' },
    ],
  }),
  computed: {
    ...mapState(['userProfile']),
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>
