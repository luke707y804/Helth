<template>
  Overview works
  <!-- Was wollen wir hier jetzt nochmal darstellen?-->
  <!-- Trainingsauswahl, Zeit stoppen und dann Ergebnis -->
  <q-card>
    <q-card-section vertical>
      <ActivityDropdownComponent ref="activity"></ActivityDropdownComponent>
    </q-card-section>
    <q-card-section vertical>
      <TrainingTimerComponent></TrainingTimerComponent>
    </q-card-section>
    <q-card-section>
      <q-btn @click="timePassed()" label="Abspeichern" color="cyan"></q-btn>
      <q-btn @click="test()" label="TEST und so" color="cyan"></q-btn>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import ActivityDropdownComponent from 'src/components/ActivityDropdownComponent.vue';
import TrainingTimerComponent from 'src/components/TrainingTimer.vue';
import { storeToRefs } from 'pinia';
import LStore from 'src/stores/time-store';
import UStore from 'src/stores/user-store';
import { ref } from 'vue';

// Auswahl muss mit der Zeit verknüpft werden, um den Kalorienverbrauch zu berehcnen
const store = LStore.useTimeStore();

const timePassed = () => {
  if (store.getUpdate) {
    console.log(store.getTime);
  } else {
    console.log('Wert nicht gesetzt');
  }
};

const uStore = UStore.useUserStore();

const activity = ref();

activity.value.s;

// var user: any = 'No User';

// const test = () => {
//   user = uStore.get;
//   console.log(user);
// };
</script>
