import { defineStore } from 'pinia';
import { User } from 'src/dto/user-dto';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
  }),
  getters: {
    get: (state) => state.user,
  },
  actions: {
    update(input: User) {
      this.user = input;
      console.log(JSON.stringify(this.user));
    },
  },
});

export default {
  useUserStore,
};
