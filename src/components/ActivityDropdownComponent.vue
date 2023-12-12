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
    style="width: 250px"
    behavior="menu"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
  <q-btn @click="fetchData()">Test</q-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LStore from 'src/stores/user-store';

const URL_CALORIE = 'https://api.api-ninjas.com/v1/caloriesburned?activity=';
const URL_ALL = 'https://api.api-ninjas.com/v1/caloriesburnedactivities';
const API_KEY = 'CV0yaQY+YW/AfGyqRLQvzQ==l69t0wMCKBV6MOfr';

const stringOptions: string[] = [];

const options = ref();

const activitySelection = ref();

const filterFn = (val: any, update: any) => {
  if (val === '') {
    update(() => {
      options.value = stringOptions.values.activities;
      // console.log(stringOptions.values.activities);
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

const $my_usern = LStore.useUserStore();

var user: any = null;

const getUser = () => {
  user = $my_usern.get;
};

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
  } catch (error: any) {
    console.error('Request failed:', error.message);
  }
}

// Call the fetchData function
//fetchData();

fetchAll();
</script>
