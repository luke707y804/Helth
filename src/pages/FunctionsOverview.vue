<template>
  Overview works
  <!-- Was wollen wir hier jetzt nochmal darstellen?-->
  <!-- Trainingsauswahl, Zeit stoppen und dann Ergebnis -->
  <q-card>
    <q-card-section vertical>
      <ActivityDropdownComponent></ActivityDropdownComponent>
    </q-card-section>
    <q-card-section vertical>
      <TrainingTimerComponent></TrainingTimerComponent>
    </q-card-section>
    <q-card-section>
      <q-btn
      @click="timePassed()"
      label="Abspeichern"
      color="cyan"></q-btn>
    </q-card-section>
  </q-card>

</template>
<script setup lang="ts">
import ActivityDropdownComponent from 'src/components/ActivityDropdownComponent.vue';
import TrainingTimerComponent from 'src/components/TrainingTimer.vue'
import { storeToRefs } from 'pinia';
import LStore from 'src/stores/time-store';

  // Auswahl muss mit der Zeit verknüpft werden, um den Kalorienverbrauch zu berehcnen
  const store = LStore.useTimeStore();



  const timePassed = () => {
    if(store.getUpdate) {
      console.log(store.getTime);
    } else {
      console.log("Wert nicht gesetzt")
    }
  };



</script>
