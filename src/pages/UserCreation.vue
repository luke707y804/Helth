<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <img src="src\assets\helth.png" /> -->
    <div class="q-pa-md row items-start">
      <q-img src="src/assets/banner_bmi.svg" spinner-color="white" />

      <div>
        <q-form>
          <q-input
            class="q-gutter-md"
            filled
            v-model="name"
            label="Your name *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            class="q-gutter-md"
            filled
            type="number"
            v-model="age"
            label="Your age *"
            lazy-rules
            :rules="ageRules"
          />
          <q-input
            class="q-gutter-md"
            filled
            type="number"
            v-model="weight"
            label="Your weight in KG *"
            lazy-rules
            :rules="weightRules"
          />
          <q-input
            class="q-gutter-md"
            filled
            type="number"
            v-model="height"
            label="Your height in cm *"
            lazy-rules
            :rules="heigthRules"
            width="100%"
          />

          <q-btn class="button" label="abschicken" @click="saveUser()" />
        </q-form>
      </div>
    </div>
  </q-layout>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import LStore from 'src/stores/user-store';
import { User } from 'src/dto/user-dto';
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref();
const age = ref();
const weight = ref();
const height = ref();

watch(name, async () => {
  console.log(name.value);
});

const saveUser = () => {
  const userTest = new User(name.value, age.value, weight.value, height.value);

  const store = LStore.useUserStore();
  store.update(userTest);
  console.log(userTest);
  routeToBMI();
};

const routeToBMI = () => {
  router.push({
    path: '/bmi',
  });
};

const ageRules = [
  (val: string | null) =>
    (val !== null && val !== '') || 'Please type your age',
  (val: number) => (val > 0 && val < 100) || 'Please type a real age',
];

const weightRules = [
  (val: string | null) =>
    (val !== null && val !== '') || 'Please type your weight',
  (val: number) => (val > 40 && val < 500) || 'Please type a real weight',
];

const heigthRules = [
  (val: string | null) =>
    (val !== null && val !== '') || 'Please type your weight',
  (val: number) => (val > 100 && val < 250) || 'Please type a real weight',
];

// const $my_user = LStore.useUserStore
// const { user } = storeToRefs($my_user);

// const saveUser = (usert) => {
//   $my_user.update(usert)
</script>
<style scoped>
/* Stil für das gesamte Formular-Container
.q-layout-lHh_Lpr_lFf {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}*/

.q-gutter-md {
  width: 98vw;
}

/* Stil für das Bild */
.sporty-img {
  height: 200px;
  max-width: 100%;
  margin-bottom: 20px;
}

/* Stil für den Button */
.button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>
