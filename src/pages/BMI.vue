<template>
  <h1>{{ user }}</h1>
  <q-input v-model="test"></q-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import LStore from 'src/stores/user-store';
import { onMounted } from 'vue';
import { User } from 'src/dto/user-dto';

const $my_usern = LStore.useUserStore();
var user: any = null;

const test = ref();

// var user: any;

const getUser = () => {
  user = $my_usern.get;
};

//  BMI = weight / (height)²

onMounted(async () => {
  getUser();
  test.value = user;
  console.log(JSON.stringify(user));
});
</script>
