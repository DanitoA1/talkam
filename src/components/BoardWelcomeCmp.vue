<!-- eslint-disable -->
<template>
  <v-container>
    <div
      class="text-center"
    >
      <h1
        class="green--text"
      >
        Welcome
      </h1>
      <blockquote
        class="blockquoute black--text"
      >
        You've been invited by {{ authorName }} for your honest feedback
      </blockquote>
    </div>
    <div
      class="my-8"
    >
      <v-img
        class="mx-auto"
        src="\img\SVG\boardwelcome.svg"
        contain
        max-height="500px"
        max-width="500px"
      ></v-img>
    </div>
    <div class="text-center">
      <p
        class="orange--text text-caption font-italic"
      >
        All your feedback will be completely anonymous
      </p>
      <v-btn
        class="mb-6"
        color="success"
        rounded
        dark
        small
        @click="Proceed"
      >
        Proceed to Board
      </v-btn>
    </div>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    Proceed: Function,
    userId: String,
    authorName: String,
  },
  data() {
    return {
      //
    };
  },
};
</script>
