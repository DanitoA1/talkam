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
    <QuizFillCmp
      v-if="stage2 === true"
      :Proceed="Proceed"
      :Title="Quiz.quiz[0].Title"
      :Caption="Quiz.quiz[0].Caption"
      :Question="Quiz.quiz[0].questionsList[index]"
      :currentQuestion="index + 1"
      :totalQuestion="total"
      :Next="Next"
      :Prev="Prev"
      :AllResult="Result"
      :key="componentKey"
    />
    <QuizWelcomeCmp
      v-if="stage1 === true"
      :Proceed="Proceed"
      :userId="id[0]"
      :authorName="authorName"
      :linkState="Quiz.linkactive"
    />
    <QuizFinishCmp
      v-if="stage3 === true"
      :Proceed="Proceed"
      :Questions="Quiz.quiz[0].questionsList"
      :wrongAnsArr="wrongAnsArr"
      :Score="Score"
      :totalQuestion="total"
    />
  </div>
</template>

<script>
import QuizFillCmp from '@/components/QuizFillCmp.vue'
import QuizWelcomeCmp from '@/components/QuizWelcomeCmp.vue'
import QuizFinishCmp from '@/components/QuizFinishCmp.vue'
// import BoardQuestions from '@/boards.json';
import { quizResults, quizCollection } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'QuizFill',
  components: {
    QuizFillCmp,
    QuizWelcomeCmp,
    QuizFinishCmp
  },
  data () {
    return {
      Result: [],
      answerIndexArr: [],
      index: 0,
      counter: 0,
      Name: null,
      totalAns: 0,
      correctAns: 0,
      wrongAnsArr: [],
      Score: 0,
      stage1: true,
      stage2: false,
      stage3: false,
      id: [],
      componentKey: 0
    }
  },
  computed: {
    ...mapState(['Quiz']),
    authorName () {
      return this.Quiz.userName
    },
    total () {
      return this.Quiz.quiz[0].questionsList.length
    }
  },
  created () {
    this.id = this.$route.params.id.split('_')
    this.$store.dispatch('getQuiz', this.id)
    /* boardsCollection.doc(this.id[0]).collection('userboards').doc(this.id[1]).get()
      .then((doc) => {
        this.Quiz = doc.data()
        this.authorName = this.Quiz.userName
        this.total = this.Quiz.quiz[0].questionsList.length
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      }) */
  },
  mounted () {
    this.$root.$on('add-update-result', (r) => {
      this.updateResultList(r)
    })
    this.$root.$on('add-name-to-result', (n) => {
      this.resultName(n)
    })
    this.$root.$on('addToFirebase', () => {
      this.scoreCalculate()
      this.addToFirebase()
    })
  },
  watch: {
    Quiz () {
      this.getCorrectAnswer()
    }
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
      if (resultIndex >= 0) {
        this.$set(this.Result, resultIndex, res)
      } else {
        this.Result.push(JSON.parse(JSON.stringify(res)))
      }
      this.forceRerender()
    },
    resultName (name) {
      this.Name = name
    },
    async addToFirebase () {
      await quizResults.doc(this.id[0]).collection(`${this.id[1]}`).add({
        createdOn: new Date(),
        Name: this.Name,
        gotCorrect: this.correctAns,
        score: this.Score,
        wrongans: this.wrongAnsArr,
        Result: this.Result
      })
      await quizCollection.doc(this.id[0]).collection('userquizzes').doc(this.id[1]).update({
        totalQuizFill: this.Quiz.totalQuizFill + 1
      })
    },
    getCorrectAnswer () {
      var totalans = 0
      const ansArr = []
      this.Quiz.quiz[0].questionsList.forEach((ques, i) => {
        let m = 0
        const ansIndex = []
        ques.question.options.forEach((opt, j) => {
          if (opt.answer) {
            ansIndex.push(opt.body)
            m += 1
          }
        })
        ansArr.push(ansIndex)
        totalans += m
      })
      this.totalAns = totalans
      this.answerIndexArr = ansArr
    },
    scoreCalculate () {
      var correctans = 0
      const wrongansarr = []
      this.answerIndexArr.forEach((ans, i) => {
        ans.forEach(x => {
          const correctcount = correctans
          this.Result[i].result.answer.forEach(y => {
            if (x === y) {
              correctans += (1 / ans.length)
            }
          })
          if (correctcount === correctans) {
            wrongansarr.push(i)
          }
        })
      })
      const wrongans = wrongansarr.reduce(function (a, b) {
        if (a.indexOf(b) < 0) a.push(b)
        return a
      }, [])
      const m = (correctans / this.total) * 100
      this.correctAns = correctans
      this.wrongAnsArr = wrongans
      this.Score = m.toFixed(0)
    },
    forceRerender () {
      this.componentKey += 1
    }
  }
}
</script>
