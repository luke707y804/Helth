import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  getters: {
    get: (state) => state.user,
  },
  actions: {
    update(input: any) {
      this.user = input;
      console.log(JSON.stringify(this.user));
    },
  },
});

export default {
  useUserStore,
};
