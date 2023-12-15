<template>
  <GeolocationComponent> </GeolocationComponent>
  <ActivityDropdownComponent> </ActivityDropdownComponent>
  <speed></speed>
</template>
<script setup>
import ActivityDropdownComponent from 'src/components/ActivityDropdownComponent.vue';
import GeolocationComponent from 'src/components/GeolocationComponent.vue';
import speed from 'src/components/SpeedComponent.vue';
</script>
<style>
/* Globales Styling */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

/* Styling für GeolocationComponent */
GeolocationComponent {
  /* Füge hier deine Stile hinzu */
  margin-bottom: 20px;
}

/* Styling für ActivityDropdownComponent */
ActivityDropdownComponent {
  /* Füge hier deine Stile hinzu */
  margin-bottom: 20px;
}

/* Styling für die Geschwindigkeitskomponente */
speed {
  /* Füge hier deine Stile hinzu */
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
</style>
