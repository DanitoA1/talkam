<!-- eslint-disable -->
<template>
  <v-container class="mx-auto">
    <p
        class="text-center h3 font-weight-bold"
      >Quiz Page</p>
      <v-divider></v-divider>
    <v-img
      class="mx-auto my-4"
      src="/img/SVG/mobile_life.svg"
      contain
      max-height="600px"
      max-width="400"
    ></v-img>
    <p class="text-center body mt-3">You've not created any quiz yet!!</p>
    <div class="text-center">
      <v-btn
        color="success"
        rounded
        to="/user/quiz/create"
      ><v-icon dark>mdi-plus</v-icon>Add New Quiz</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Quiz',
};
</script>
