<template>
  <div id="app">
    <div class="notStarted" v-if="notStart">
      <el-button type="success" v-on:click="startGame">Start</el-button>
    </div>
    <div v-else>
      <!-- HEADING OF THE PAGE -->
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6" class="col">
          <h1>Cash: ${{ cash }}</h1>
          <h2>GME Shares Owned: {{ sharesOwned }}</h2>
        </el-col>
      </el-row>
      <!-- Bottom of the Display -->
      <el-row type="flex" class="row-bg" justify="center">
        <!-- Left Bottom -->
        <el-col :span="8" class="col prevInfo">
          <h2>Day {{ day }}</h2>
          <h2>Price Today: {{ priceTdy }}</h2>
          <h2>Prev Price: {{ prevDayPrice }}</h2>
          <div v-if="restricted" class="warning">selling restricted today</div>
          <div v-if="cash > 1000">
            <img
              src="https://media4.giphy.com/media/ckNFgnUmAuFcYmWR3a/giphy.gif"
              width="200"
              height="100"
            />
            <div class="good">You're making money!</div>
          </div>
          <div v-else-if="cash == 1000"></div>
          <div v-else>
            <img
              src="https://media.tenor.com/images/6c4828cbd78e5db79b6e529b2c3c0973/tenor.gif"
              width="200"
              height="100"
            />
            <div class="warning">You're down in money!</div>
          </div>
        </el-col>
        <!-- Right Bottom -->
        <el-col :span="8" class="col buySellDisplay">
          <!-- Buy Half -->
          <div class="buyHalf">
            <div>
              <el-input
                type="number"
                placeholder="Amount of shares to buy"
                v-model="numSharesToBuy"
                min="0"
              ></el-input>
              <h3>Total Cost to Buy: {{ totalCost }}</h3>
              <el-button type="success" v-on:click="buyButtonClicked" plain
                >Buy</el-button
              >
            </div>
          </div>
          <!-- Sell Half -->
          <div class="sellHalf">
            <div>
              <el-input
                type="number"
                placeholder="Amount of shares to buy"
                v-model="numSharesToSell"
                min="0"
              ></el-input>
              <h3>Total Cost to Sell: {{ totalSell }}</h3>
              <el-button type="warning" v-on:click="sellButtonClicked" plain
                >Sell</el-button
              >
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-button type="success" v-on:click="nextDay"> Next Day </el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import gamestonk from "./gamestonk/gamestonk.json";
import cashsound from "./assets/cashsound.mp3";
import ding from "./assets/ding.mp3";
import background from "./assets/ncs.mp3";
export default {
  name: "App",
  components: {},
  mounted() {
    this.initialSetup(gamestonk);
  },
  data: () => {
    return {
      numSharesToBuy: 0,
      numSharesToSell: 0,
      notStart: true,
    };
  },
  methods: {
    ...mapMutations(["initialSetup", "buyShare", "sellShare", "nextDay"]),
    startGame() {
      this.notStart = false;
      this.playSoundLoop(background);
    },
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    playSoundLoop(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.loop = true;
        audio.play();
      }
    },
    buyButtonClicked() {
      this.playSound(ding);
      this.buyShare(this.numSharesToBuy);
    },
    sellButtonClicked() {
      this.sellShare(this.numSharesToSell);
      this.playSound(cashsound);
    },
  },
  computed: {
    totalCost() {
      return Math.round(this.numSharesToBuy * this.priceTdy * 100) / 100;
    },
    totalSell() {
      return Math.round(this.numSharesToSell * this.priceTdy * 100) / 100;
    },
    ...mapState([
      "day",
      "cash",
      "sharesOwned",
      "prevDayPrice",
      "priceTdy",
      "restricted",
    ]),
  },
};
</script>

<style>
html {
  margin: 0px;
  background-color: black;
}
#app {
  color: white;
  height: 100vh;
  margin: 2rem;
}
.interface {
  display: flex;
}

.prevInfo {
  border: 5px solid black;
  margin: 1rem;
}
.buySellDisplay {
  margin: 1rem;
}
.col {
  text-align: center;
}
.buyHalf {
  margin-bottom: 2rem;
}

.notStarted {
  display: flex;
  justify-content: center;
}

.warning {
  color: red;
}

.good {
  color: green;
}
</style>
