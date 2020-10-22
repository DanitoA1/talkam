<!-- eslint-disable -->
<template>
  <v-container class="mx-auto">
    <div
      v-if="!boards.length"
    >
      <p
        class="text-center h3 font-weight-bold"
      >Feedback Board Page</p>
      <v-divider></v-divider>
      <v-img
        class="mx-auto my-4"
        src="/img/SVG/reviews.svg"
        contain
        max-height="600px"
        max-width="400"
      ></v-img>
      <p class="text-center body mt-3">You've not opened any feedback board yet!!</p>
      <div class="text-center">
        <v-btn
          color="success"
          rounded
          to="/user/board/create"
        ><v-icon dark>mdi-plus</v-icon>Add New Board</v-btn>
      </div>
    </div>
    <div
      v-else
    >
      All available boards will show up here
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Board',
  computed: {
    ...mapState(['boards']),
  },
};
</script>
