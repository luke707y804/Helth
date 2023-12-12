<template>
  <div>
    <!-- GPS position: <strong>{{ stringPosition }}</strong> -->
    <strong>
      Latitude: {{ positionPosition?.coords?.latitude }}, Longitude:
      {{ positionPosition?.coords?.longitude }}
    </strong>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Geolocation, Position } from '@capacitor/geolocation';

const positionPosition = ref();
const stringPosition = ref();

function getCurrentPosition() {
  Geolocation.getCurrentPosition().then((newPosition) => {
    console.log('Current', newPosition);
    positionPosition.value = newPosition;
  });
}

let geoId: any;

onMounted(() => {
  getCurrentPosition();

  // we start listening
  geoId = Geolocation.watchPosition({}, (newPosition, err) => {
    console.log('New GPS position');
    stringPosition.value = newPosition;
  });
});

onBeforeUnmount(() => {
  // we do cleanup
  Geolocation.clearWatch(geoId);
});
</script>
