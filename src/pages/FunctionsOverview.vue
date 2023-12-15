<template>
  Overview works
  <!-- Was wollen wir hier jetzt nochmal darstellen?-->
  <!-- Trainingsauswahl, Zeit stoppen und dann Ergebnis -->
  <q-card class="my-card">
    <q-card-section>
      <q-img
        class="sporty-img"
        src="src/assets/Stay_focused!.svg"
        spinner-color="white"
      />
    </q-card-section>
  </q-card>
  <q-card class="my-card">
    <q-card-section>
      <div class="dropDown">
        <ActivityDropdownComponent></ActivityDropdownComponent>
      </div>
    </q-card-section>
  </q-card>
  <TrainingTimerComponent></TrainingTimerComponent>

  <q-btn @click="timePassed()" label="Abspeichern" color="cyan"></q-btn>
  <!-- <q-btn @click="test()" label="TEST und so" color="cyan"></q-btn> -->
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

// var user: any = 'No User';

// const test = () => {
//   user = uStore.get;

//   // activity.setUserStore(uStore);
// };
</script>
<style scoped>
.dropDown {
  padding: 20px;
}
</style>
