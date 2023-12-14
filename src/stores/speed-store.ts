import { defineStore } from 'pinia';

export const useSpeedStore = defineStore('speed', {
  state: () => ({
    speed: [],
  }),
  getters: {
    get: (state) => state.speed,
    getAvrg: (state) => {
      const arrayLength = state.speed.length;

      return state.speed.reduce((acc, num) => acc + num, 0) / arrayLength;
    },
  },
  actions: {
    update(input: never) {
      this.speed.push(input);
      console.log(JSON.stringify(this.speed));
    },
  },
});

export default {
  useSpeedStore,
};
