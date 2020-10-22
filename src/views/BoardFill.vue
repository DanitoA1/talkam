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
    />
    <BoardFinishCmp
      v-if="stage3 === true"
      :Proceed="Proceed"
    />
  </div>
</template>

<script>
import BoardFillCmp from '@/components/BoardFillCmp.vue';
import BoardWelcomeCmp from '@/components/BoardWelcomeCmp.vue';
import BoardFinishCmp from '@/components/BoardFinishCmp.vue';
// import BoardQuestions from '@/boards.json';
import { boardsCollection, boardResults } from '@/firebase';

export default {
  name: 'BoardFill',
  components: {
    BoardFillCmp,
    BoardWelcomeCmp,
    BoardFinishCmp,
  },
  data() {
    return {
      Board: [],
      Result: [],
      index: 0,
      total: 0,
      counter: 0,
      stage1: true,
      stage2: false,
      stage3: false,
      id: [],
      authorName: '',
      componentKey: 0,
    };
  },
  /* computed: {
    totalAnswered() {
      this.counter = 0;
      this.Result.forEach((x) => {
        if (x.result.answer) {
          this.counter += 1;
        }
      });
      for (let i = 0; i < this.Result.length; i += 1) {
        if (this.Result.result.answer) {
          counter += 1;
        }
      }
      return this.counter;
    },
  }, */
  created() {
    this.id = this.$route.params.id.split('_');
    boardsCollection.doc(this.id[0]).collection('userboards').doc(this.id[1]).get()
      .then((doc) => {
        this.Board = doc.data();
        this.authorName = this.Board.userName;
        this.total = this.Board.board[0].questionsList.length;
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  },
  mounted() {
    this.$root.$on('add-update-result', (r) => {
      this.updateResultList(r);
    });
    this.$root.$on('addToFirebase', () => {
      this.addToFirebase();
    });
  },
  methods: {
    Next() {
      this.index += 1;
    },
    Prev() {
      this.index -= 1;
    },
    Proceed() {
      if (this.stage1 === true) {
        this.stage1 = false;
        this.stage2 = true;
      } else if (this.stage2 === true) {
        this.stage1 = false;
        this.stage2 = false;
        this.stage3 = true;
      }
    },
    updateResultList(res) {
      const resultIndex = this.Result
        .findIndex((x) => x.result.questionID === res.result.questionID);
      console.log('value of findindex', resultIndex);
      if (resultIndex >= 0) {
        this.$set(this.Result, resultIndex, res);
      } else {
        this.Result.push(JSON.parse(JSON.stringify(res)));
      }
      this.forceRerender();
    },
    async addToFirebase() {
      await boardResults.doc(this.id[0]).collection(`${this.id[1]}`).add({
        createdOn: new Date(),
        Result: this.Result,
      });
    },
    forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>
