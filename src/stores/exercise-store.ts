import { defineStore } from 'pinia';

export const useExerciseStore = defineStore('exercises', {
  state: () => ({
    exercises: [],
  }),
  getters: {
    get: (state) => state.exercises,
  },
  actions: {
    update(input: any) {
      this.exercises = input;
      // console.log(JSON.stringify(this.exercises));
    },
  },
});

export default {
  useExerciseStore,
};
