import { createStore } from 'vuex';

export default createStore({
  state: {
    cash: 1000,
    sharesOwned: 0,
    prevDayPrice: 0,
    priceTdy: 0,
    day: 1,
    startIndex: 0,
    csv: 0,
    restricted: false
  },
  mutations: {
    initialSetup(state, payload) {
      state.csv = payload;
      state.startIndex = Math.floor(Math.random() * (Math.floor(payload.length) - 11));
      let startIndex = state.startIndex;
      state.priceTdy = payload[startIndex]["Open"];
      state.prevDayPrice = payload[startIndex - 1]["Open"];
      state.priceTdy = Math.round(state.priceTdy * 100) / 100;  // result .12
      state.prevDayPrice = Math.round(state.prevDayPrice * 100) / 100;  // result .12
    },
    buyShare(state, numshares) {
      console.log(numshares);
      let cost = numshares * state.priceTdy;
      if (cost > state.cash) {
        alert('Not enough funds');
        return;
      }
      state.cash -= cost;
      state.sharesOwned += Number(numshares);
      state.cash = Math.round(state.cash * 100) / 100;  // result .12

    },
    sellShare(state, numshares) {
      let cost = numshares * state.priceTdy;
      if (numshares > state.sharesOwned) {
        alert('Not enough shares');
        return;
      }
      if (state.restricted) {
        alert('Cannot sell today! Restricted GME trading');
        return;
      }
      console.log(Math.random() * 10);
      state.cash += cost;
      state.sharesOwned -= numshares;
      state.cash = Math.round(state.cash * 100) / 100;  // result .12
    },
    nextDay(state) {
      if (Math.random() * 10 > 8) {
        alert('WARNING: Robinhood has restricted GME trading for today');
        state.restricted = true;
      } else {
        state.restricted = false;
      }
      state.day += 1;
      state.startIndex += 1;
      //setting prices
      let startIndex = state.startIndex;
      state.priceTdy = state.csv[startIndex]["Open"];
      state.prevDayPrice = state.csv[startIndex - 1]["Open"];
      state.priceTdy = Math.round(state.priceTdy * 100) / 100;  // result .12
      state.prevDayPrice = Math.round(state.prevDayPrice * 100) / 100;  // result .12
      if (state.day == 11) {
        alert('GAME OVER! You ended up with: ' + state.cash);
        state.cash = 1000;
        state.sharesOwned = 0;
        state.day = 1;
        state.restricted = false;
        let startIndex = state.startIndex;
        state.priceTdy = state.csv[startIndex]["Open"];
        state.prevDayPrice = state.csv[startIndex - 1]["Open"];
        state.priceTdy = Math.round(state.priceTdy * 100) / 100;  // result .12
        state.prevDayPrice = Math.round(state.prevDayPrice * 100) / 100;  // result .12
      }

    }
  },
  actions: {
  },
  getters: {
    loggedInState(state) {
      return state.loginUserState;
    }
  },
  modules: {
  }
});
