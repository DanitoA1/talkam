<!-- eslint-disable -->
<template>
  <v-container>
    <v-row class="justify-center">
      <v-col
        cols="12"
        sm="6"
      >
        <v-card
          color="deep-purple lighten-4"
          elevation="15"
          class="text-center mx-4"
          shaped
        >
          <v-card-title
            class="justify-center"
          >
              Feedback Summary
          </v-card-title>
          <div>
            <v-row no-gutters>
              <v-col cols="8" class="mx-auto">
                <v-row no-gutters>
                  <v-col cols="auto" class="mr-auto">
                    <v-card-text class="font-weight-bold">Board(s)</v-card-text>
                  </v-col>
                  <v-col cols="auto">
                    <v-chip
                      class="ma-2"
                      color="orange"
                      text-color="white"
                    >
                      <v-avatar
                        color="orange darken-4"
                      >
                        0
                      </v-avatar>
                    </v-chip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="8" class="mx-auto">
                <v-row no-gutters>
                  <v-col cols="auto" class="mr-auto">
                    <v-card-text class="font-weight-bold">Response(s)</v-card-text>
                  </v-col>
                  <v-col cols="auto">
                    <v-chip
                      class="ma-2"
                      color="orange"
                      text-color="white"
                    >
                      <v-avatar
                        color="orange darken-4"
                      >
                        0
                      </v-avatar>
                    </v-chip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
          <v-card-text>
              You currently have 0 feedback board(s) and 0 responses
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-card
          color="deep-purple lighten-4"
          elevation="15"
          class="text-center mx-4"
          shaped
        >
          <v-card-title
            class="justify-center"
          >
              Quiz Summary
          </v-card-title>
          <div>
            <v-row no-gutters>
              <v-col cols="8" class="mx-auto">
                <v-row no-gutters>
                  <v-col cols="auto" class="mr-auto">
                    <v-card-text class="font-weight-bold">Quiz(zes)</v-card-text>
                  </v-col>
                  <v-col cols="auto">
                    <v-chip
                      class="ma-2"
                      color="orange"
                      text-color="white"
                    >
                      <v-avatar
                        color="orange darken-4"
                      >
                        0
                      </v-avatar>
                    </v-chip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="8" class="mx-auto">
                <v-row no-gutters>
                  <v-col cols="auto" class="mr-auto">
                    <v-card-text class="font-weight-bold">Entries</v-card-text>
                  </v-col>
                  <v-col cols="auto">
                    <v-chip
                      class="ma-2"
                      color="orange"
                      text-color="white"
                    >
                      <v-avatar
                        color="orange darken-4"
                      >
                        0
                      </v-avatar>
                    </v-chip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
          <v-card-text>
              You currently have 0 quiz(zes) and 0 entries
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <p
          class="text-center h3 font-weight-bold"
        >Boards</p>
        <v-divider></v-divider>
        <p class="text-center body mt-3">You've not opened any feedback board yet!!</p>
        <div class="text-center">
          <v-btn
            color="success"
            rounded
            to="/user/board/create"
          ><v-icon dark>mdi-plus</v-icon>Add New Board</v-btn>
        </div>
      </v-col>

      <v-col
        cols="12"
        sm="6"
      >
        <p
          class="text-center h3 font-weight-bold"
        >Quizzes</p>
        <v-divider></v-divider>
        <p class="text-center body mt-3">You've not created any quiz yet!!</p>
        <div class="text-center">
          <v-btn
            color="success"
            rounded
            to="/user/quiz/create"
          ><v-icon dark>mdi-plus</v-icon>Add New Quiz</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Overview',
};
</script>
