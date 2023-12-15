<template>
  <q-select
    filled
    v-model="activitySelection"
    use-input
    input-debounce="0"
    clearable
    label="Sportart auswählen"
    :options="options"
    @filter="filterFn"
    behavior="menu"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
  <q-btn color="green" @click="fetchtest()">Test </q-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import AStore from 'src/stores/exercise-store';

import userStore from 'src/stores/user-store';
import timeStore from 'src/stores/time-store';

const URL_CALORIE = 'https://api.api-ninjas.com/v1/caloriesburned?activity=';
const URL_ALL = 'https://api.api-ninjas.com/v1/caloriesburnedactivities';
const API_KEY = 'CV0yaQY+YW/AfGyqRLQvzQ==l69t0wMCKBV6MOfr';

const URL_TEST =
  'https://api.api-ninjas.com/v1/caloriesburned?activity=Unicycling&weight=90&duration=1';

const stringOptions: string[] = [];

const options = ref();

const activitySelection = ref();

const queryParams = new URLSearchParams();

const filterFn = (val: any, update: any) => {
  if (val === '') {
    update(() => {
      options.value = stringOptions.values.activities;
      console.log(stringOptions.values.activities);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.values.activities.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

var userStoreVar: any = null;

const user = userStore.useUserStore();

const time = timeStore.useTimeStore();

//TODO: Der Store ist hier immer undefined, in der Page gehts, hier nicht -> WHY??
async function fetchtest() {
  const getUser = user.get;
  console.log(getUser.weight);
  let weight = +getUser.weight;

  const url = 'https://api.api-ninjas.com/v1/caloriesburned';
  const params = new URLSearchParams({
    // activity: activitySelection.value,
    // weight: getUser.weight,
    // duration: time.getTime.toString(),

    activity: activitySelection.value,
    weight: weight.toString(),
    duration: '20',
  });
  //TODO: mit Zeit vom Timer verbinden
  const headers = new Headers({
    'X-API-Key': API_KEY,
  });

  const options2 = {
    method: 'GET',
    headers: headers,
  };

  try {
    const response = await fetch(`${url}?${params}`, options2);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
//TODO: Request parameter mitgeben -> activity, weight, duration
// Async function to fetch data
async function fetchData() {
  try {
    const response = await fetch(
      URL_CALORIE + activitySelection.value + getUser.weight,
      {
        headers: {
          'X-Api-Key': API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();

    console.log('Activity: ' + activitySelection.value);
    console.log('Klappt: ' + JSON.stringify(data));
  } catch (error: any) {
    console.error('Request failed:', error.message);
  }
}

async function fetchAll() {
  try {
    const response = await fetch(URL_ALL, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    stringOptions.values = await response.json();
    const exerciseStore = AStore.useExerciseStore();
    exerciseStore.update(stringOptions.values.activities);
  } catch (error: any) {
    console.error('Request failed:', error.message);
  }
}

// Call the fetchData function
//fetchData();

fetchAll();
</script>
<style scoped></style>
