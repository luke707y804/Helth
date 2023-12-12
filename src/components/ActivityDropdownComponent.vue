<template>
  <h1>Sportart auswählen</h1>
  <q-select
    filled
    v-model="model.value"
    use-input
    input-debounce="0"
    label="Simple filter"
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
</template>

<script setup lang="ts">
import { ref } from 'vue';

const URL_CALORIE = 'https://api.api-ninjas.com/v1/caloriesburned?activity=';
const URL_ALL = 'https://api.api-ninjas.com/v1/caloriesburnedactivities';
const API_KEY = 'CV0yaQY+YW/AfGyqRLQvzQ==l69t0wMCKBV6MOfr';

const stringOptions: string[] = [];

const model = ref();
const options = ref(stringOptions);

const activity = ref();

const filterFn = (val: any, update: any) => {
  if (val === '') {
    update(() => {
      options.value = stringOptions;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

// Async function to fetch data
async function fetchData() {
  try {
    const response = await fetch(URL_CALORIE + activity, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
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
