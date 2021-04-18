<!-- eslint-disable -->
<template>
  <div>
    <v-toolbar
      color="deep-purple"
      dark
      dense
    >
      <v-toolbar-title
        class="mx-auto"
      >Talkam</v-toolbar-title>
    </v-toolbar>
    <BoardFillCmp
      v-if="stage2 === true"
      :Proceed="Proceed"
      :Title="Board.board[0].Title"
      :Caption="Board.board[0].Caption"
      :Question="Board.board[0].questionsList[index]"
      :currentQuestion="index + 1"
      :totalQuestion="total"
      :Next="Next"
      :Prev="Prev"
      :AllResult="Result"
      :key="componentKey"
    />
    <BoardWelcomeCmp
      v-if="stage1 === true"
      :Proceed="Proceed"
      :userId="id[0]"
      :authorName="authorName"
      :linkState="Board.linkactive"
    />
    <BoardFinishCmp
      v-if="stage3 === true"
      :Proceed="Proceed"
    />
  </div>
</template>

<script>
import BoardFillCmp from '@/components/BoardFillCmp.vue'
import BoardWelcomeCmp from '@/components/BoardWelcomeCmp.vue'
import BoardFinishCmp from '@/components/BoardFinishCmp.vue'
// import BoardQuestions from '@/boards.json';
import { boardResults, boardsCollection } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'BoardFill',
  components: {
    BoardFillCmp,
    BoardWelcomeCmp,
    BoardFinishCmp
  },
  data () {
    return {
      Result: [],
      index: 0,
      counter: 0,
      stage1: true,
      stage2: false,
      stage3: false,
      id: [],
      componentKey: 0
    }
  },
  computed: {
    ...mapState(['Board']),
    authorName () {
      return this.Board.userName
    },
    total () {
      return this.Board.board[0].questionsList.length
    }
  },
  created () {
    this.id = this.$route.params.id.split('_')
    this.$store.dispatch('getBoard', this.id)
    /* boardsCollection.doc(this.id[0]).collection('userboards').doc(this.id[1]).get()
      .then((doc) => {
        this.Board = doc.data()
        this.authorName = this.Board.userName
        this.total = this.Board.board[0].questionsList.length
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      }) */
  },
  mounted () {
    this.$root.$on('add-update-result', (r) => {
      this.updateResultList(r)
    })
    this.$root.$on('addToFirebase', () => {
      this.addToFirebase()
    })
  },
  methods: {
    Next () {
      this.index += 1
    },
    Prev () {
      this.index -= 1
    },
    Proceed () {
      if (this.stage1 === true) {
        this.stage1 = false
        this.stage2 = true
      } else if (this.stage2 === true) {
        this.stage1 = false
        this.stage2 = false
        this.stage3 = true
      }
    },
    updateResultList (res) {
      const resultIndex = this.Result
        .findIndex((x) => x.result.questionID === res.result.questionID)
      console.log('value of findindex', resultIndex)
      if (resultIndex >= 0) {
        this.$set(this.Result, resultIndex, res)
      } else {
        this.Result.push(JSON.parse(JSON.stringify(res)))
      }
      this.forceRerender()
    },
    async addToFirebase () {
      await boardResults.doc(this.id[0]).collection(`${this.id[1]}`).add({
        createdOn: new Date(),
        Result: this.Result
      })
      await boardsCollection.doc(this.id[0]).collection('userboards').doc(this.id[1]).update({
        totalBoardFill: this.Board.totalBoardFill + 1
      })
    },
    forceRerender () {
      this.componentKey += 1
    }
  }
}
</script>
