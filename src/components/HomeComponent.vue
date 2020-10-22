<!-- eslint-disable -->
<template>
  <v-container fluid class="fill">
    <div class="wrapper">
      <div
      class="caption1 text-center"
      >
      Talkam</div>
      <div
      class="caption-text1 text-center text-h5 text-md-h4"
      >Connect with people around you in an amazing way
      </div>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="pos1">
        <v-btn
        rounded
        color="orange"
        >
          Get Started Now
        </v-btn>
      </div>
      <div
       class="pos2"
       >
        <h2>Cool Features</h2>
      </div>
    </div>

    <div>

    <v-container class="mt-n16">
      <v-row>
        <v-col
          cols="6"
        >
          <v-img
            src="/img/SVG/quiz.svg"
          ></v-img>
        </v-col>
        <v-col
          cols="6"
        >
          <v-img
            src="/img/SVG/feedback.svg"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-card
           class="ma-2 cardbck"
           rounded
           min-height="268px"
           >
            <v-card-title
              class="white--text text-center"
            ><v-icon
              x-large
              color="orange"
              class="mr-2"
            >mdi-account-question</v-icon>
             Anonymous Feedback Board</v-card-title>
            <v-card-text
            class="text-justify"
            >Receive anonymous messages and feedbacks from friends, collegues and
              just about anyone else, by setting up your message board and sharing the link
              with the required audience. Your message board could be a self survey or any
              other topic you want honest review on. Anonymity gives people the chance to be
              really honest
              with you.
            </v-card-text>
            <v-btn
                rounded
                color="success"
                class="mt-0 ml-4 mb-4"
                >Learn more</v-btn>
          </v-card>
        </v-col>
        <v-col>
          <v-card
           class="ma-2 cardbck"
           rounded
           min-height="268px"
           >
            <v-card-title
              class="white--text"
            ><v-icon
              x-large
              color="orange"
              class="mr-2"
            >mdi-account-supervisor-circle</v-icon>
             Fun Quizzes</v-card-title>
            <v-card-text
            class="text-justify"
            >
              Create fun quizzes to see how well your friends know you. Add simple questions
              about yourself and select the correct answers, your quiz will go live with a link
              to share with your friends. This is a great way of teaching your friends and loved
              ones the most basic things about yourself.
            </v-card-text>
            <v-btn
                rounded
                color="success"
                class="ma-4"
                >Learn more</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <h2
        class="purple--text text--darken-4 text-center"
      >How it Works</h2>
      <v-row>
        <v-col>
          <v-img
            src="img/SVG/steps.svg"
          ></v-img>
        </v-col>
      </v-row>
      <v-row
      class="mx-5"
      >
        <v-col
          cols="12"
          md="6"
        >
          <v-row>
            <v-col
              cols="2"
            >
              <v-icon
              x-large
              color="success"
              >mdi-account</v-icon>
            </v-col>
            <v-col
              cols="10"
            >
              <v-text>Simply create an account, this takes less than a minute</v-text>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-row>
            <v-col
              cols="2"
            >
              <v-icon
              x-large
              color="success"
              >mdi-checkbox-marked-circle</v-icon>
            </v-col>
            <v-col
              cols="10"
            >
              <v-text>One account gives you free access to all available tools on talkam</v-text>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-row>
            <v-col
              cols="2"
            >
              <v-icon
              x-large
              color="success"
              >mdi-pencil</v-icon>
            </v-col>
            <v-col
              cols="10"
            >
              <v-text>Open a new anonymous feedback board or create a fun quiz
              </v-text>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-row>
            <v-col
              cols="2"
            >
              <v-icon
              x-large
              color="success"
              >mdi-share-variant</v-icon>
            </v-col>
            <v-col
              cols="10"
            >
              <v-text>Share the link with appropriate audience on social media
                 in just one click</v-text>
            </v-col>
          </v-row>
        </v-col>

      </v-row>
      <v-row
        class="text-center my-6"
      >
        <v-col>
          <v-btn
            rounded
            color="orange"
          >
            Get Started Now
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    </div>
    <div class="wrapper2">
      <v-container>
      <blockquote
       class="text-justify blockquote"
       >We relate better with our friends, collegues and generally people around
         us when we have a clearer picture of what they think about us and when we can
         actually get the chance to teach them about ourselves. Talkam is that interactive
         app with the tool needed to teach and learn from people that matters to us. With
         Talkam you can receive anonymous messages, feedbacks and ratings and you can
         also quiz your friends and show them the right answers that describes you
         better</blockquote>
      </v-container>
    </div>
    <v-footer
      dark
      padless
      color="deep-purple"
    >
      <v-container
        class="text-center"
      >
        Nitos-Tech -- 2020
      </v-container>
    </v-footer>
  </v-container>
</template>

<style scoped>
  .fill{
    margin: 0;
    padding: 0;
  }
  .wrapper{
    width: 100%;
    height: 600px;
    overflow: hidden;
    background: linear-gradient(20deg, white 55%, black 55%, #673ab7 100%);
  }
  .wrapper2{
    width: 100%;
    height: 500px;
    overflow: hidden;
    color: rgb(153, 152, 152);
    background: linear-gradient(210deg, white 55%, black 55%, #673ab7 100%);
  }
  .caption1{
    font-family: poppins;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 50px;
    font-weight: bold;
    color: rgb(236, 209, 209);
    text-transform: uppercase;
    margin: 0;
  }
  .caption-text1{
    font-family: poppins;
    position: absolute;
    top: 260px;
    left: 50%;
    transform: translate(-50%,-50%);
    min-width: 300px;
    font-weight: bold;
    color: goldenrod;
    text-transform: capitalize;
    margin: 0;
  }
  .pos1{
    position: absolute;
    top: 370px;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .pos2{
    position: absolute;
    top: 500px;
    left: 50%;
    color: #4A148C;
    transform: translate(-50%,-50%);
  }
  .cardbck{
    background: linear-gradient(-20deg, goldenrod 40%, #673ab7 100%);
  }
  .restofpage{
    background-color: goldenrod;
  }
  .box div{
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: transparent;
    border: 6px solid goldenrod;
  }
  .box div:nth-child(1){
    top: 72px;
    left: 42%;
    animation: animate 10s linear infinite;
  }
  .box div:nth-child(2){
    top: 420px;
    left: 50%;
    animation: animate 7s linear infinite;
  }
  .box div:nth-child(3){
    top: 102px;
    left: 6%;
    animation: animate 9s linear infinite;
  }
    .box div:nth-child(4){
    top: 120px;
    left: 60%;
    animation: animate 10s linear infinite;
  }
    .box div:nth-child(5){
    top: 402px;
    left: 10%;
    animation: animate 6s linear infinite;
  }
    .box div:nth-child(6){
    top: 480px;
    left: 70%;
    animation: animate 12s linear infinite;
  }
    .box div:nth-child(7){
    top: 360px;
    left: 80%;
    animation: animate 15s linear infinite;
  }
    .box div:nth-child(8){
    top: 192px;
    left: 25%;
    animation: animate 16s linear infinite;
  }
    .box div:nth-child(9){
    top: 540px;
    left: 25%;
    animation: animate 9s linear infinite;
  }
    .box div:nth-child(10){
    top: 120px;
    left: 80%;
    animation: animate 5s linear infinite;
  }
  @keyframes animate {
    0%{
      transform: scale(0) translateY(0) rotate(0);
      opacity: 1;
    }
    100%{
      transform: scale(1.3) translateY(-90px) rotate(360deg);
      opacity: 0;
    }
  }
</style>

<script>
export default {
  name: 'Home',

  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
};
</script>
