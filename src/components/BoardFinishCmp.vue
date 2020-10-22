<!-- eslint-disable -->
<template>
  <v-container>
    <div
      class="text-center"
    >
      <h1
        class="green--text mt-8"
      >
        All done!!!
      </h1>
      <blockquote
        class="blockquoute black--text"
      >
        Thank you for your feedback 👍
      </blockquote>
    </div>
    <div
      class="my-8"
    >
      <v-img
        class="mx-auto"
        src="\img\SVG\boardfinish.svg"
        contain
        max-height="600px"
        max-width="600px"
      ></v-img>
    </div>
    <div
      class="text-center"
    >
      <blockquote
        class="blockquoute black--text"
      >
        You too can create your own board, quiz and lot more for free
      </blockquote>
      <v-btn
        class="my-3"
        dark
        small
        rounded
        to="/"
      >
        See How
      </v-btn>
    </div>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    Proceed: Function,
  },
  data() {
    return {
      //
    };
  },
};
</script>
