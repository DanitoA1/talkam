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
      <div class="text-center my-4">
        <p
          v-if="boards.length > 1"
          class="deep-purple--text text-subtitle-2 font-weight-bold"
        >
          Your Boards
        </p>
        <p
          v-else
          class="deep-purple--text text-subtitle-2 font-weight-bold"
        >
          Your Board
        </p>
      </div>
      <v-card
        v-for="( board, index ) in boards" :key="index"
        class="d-flex align-content-center flex-wrap mb-2"
        elevation="4"
      >
        <v-card-text>
          <v-row
            no-gutters
          >
            <v-col
              @click="boardResult(index)"
              cols="7"
            >
              <span
                class="font-weight-bold"
              >
                {{ board.board[0].Title }}
              </span>
            </v-col>
            <v-col
              class="d-flex justify-end"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="my-n2"
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="boardResult(index)"
                  >
                    <v-icon>
                      mdi-chart-bar-stacked
                    </v-icon>
                  </v-btn>
                </template>
                <span>See board result</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="my-n2"
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="boardShare(index)"
                  >
                    <v-icon>
                      mdi-share
                    </v-icon>
                  </v-btn>
                </template>
                <span>Share board</span>
              </v-tooltip>
              <v-menu
                bottom
                offset-y
                left
                :close-on-content-click="false"
                transition="scale-transition"
              >
                <template
                  v-slot:activator="{ on, attrs }"
                >
                  <v-btn
                    class="my-n2"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>
                      mdi-dots-vertical
                    </v-icon>
                  </v-btn>
                </template>
                <v-list
                  dense
                >
                  <v-list-item
                    link
                    @click="linkUpdate(index, board.linkactive)"
                  >
                    <v-list-item-title>
                      <v-row
                        class="mt-3 mb-n3"
                        no-gutters
                      >
                        <span
                          v-if="board.linkactive"
                        >Link Active</span>
                        <span
                          v-else
                        >Link Inactive</span>
                        <v-switch
                          :input-value="board.linkactive"
                          disabled
                          class="mt-n2 mx-1"
                          color="green"
                        ></v-switch>
                      </v-row>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    link
                    @click="boardEdit(index)"
                  >
                    <v-list-item-title>
                      Edit Board
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    link
                    @click="boardDelete(index)"
                  >
                    <v-list-item-title>
                      Delete Board
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <div class="text-center mt-10">
        <v-btn
          color="success"
          rounded
          to="/user/board/create"
        ><v-icon dark>mdi-plus</v-icon>Add New Board</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { boardsCollection } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'Board',
  data () {
    return {
      //
    }
  },
  computed: {
    ...mapState(['boards']),
    ...mapState(['userId'])
  },
  methods: {
    boardShare (index) {
      this.$router.push({ name: 'BoardShare', params: { id: this.boards[index].id } })
    },
    boardResult (index) {
      this.$router.push({ name: 'BoardResult', params: { id: this.boards[index].id } })
    },
    boardEdit (index) {
      this.$router.push({ name: 'BoardEdit', params: { id: this.boards[index].id } })
    },
    async linkUpdate (index, state) {
      if (state) {
        await boardsCollection.doc(this.userId).collection('userboards').doc(this.boards[index].id).update({
          linkactive: false
        })
      } else {
        await boardsCollection.doc(this.userId).collection('userboards').doc(this.boards[index].id).update({
          linkactive: true
        })
      }
    },
    async boardDelete (index) {
      await boardsCollection.doc(this.userId).collection('userboards').doc(this.boards[index].id).delete()
    }
  }
}
</script>
