import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'mainStore',
  state: () => ({
    name: null, // Initial empty value
  }),
  actions: {
    update(input: any) {
      this.name = input;
      if (this.name != null) {
        console.log('Username: ' + JSON.stringify(this.name));
      }
    },

    // clear() {
    //   this.name = '';
    // },
  },
});

export default {
  useStore,
};
