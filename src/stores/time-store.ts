import { defineStore } from 'pinia';

export const useTimeStore = defineStore('time', {
  state: () => ({
    time: 0,
    wasUpdated: false,
  }),
  getters: {
    getTime: (state) => {
      state.wasUpdated = false;
      return state.time
    },
    getUpdate: (state) => state.wasUpdated,
  },
  actions: {
    update(input: number) {
      this.time = input;
      this.wasUpdated = true;
    },
  },
});

export default {
  useTimeStore,
};
