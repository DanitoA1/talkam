<template>
  <v-container>
    <div
      v-if="linkState"
    >
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
    </div>
    <div
      v-else
    >
      <div
        class="text-center"
      >
        <h1
          class="green--text"
        >
          Oops!!!
        </h1>
        <blockquote
          class="blockquoute red--text"
        >
          Sorry this link has been disabled
        </blockquote>
      </div>
      <div
        class="my-8"
      >
        <v-img
          class="mx-auto"
          src="\img\SVG\linkclosed.svg"
          contain
          max-height="500px"
          max-width="500px"
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
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    Proceed: Function,
    userId: String,
    authorName: String,
    linkState: Boolean
  },
  data () {
    return {
      //
    }
  }
}
</script>
