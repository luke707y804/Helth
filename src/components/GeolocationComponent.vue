<template>
  <div>
    <!-- GPS position: <strong>{{ stringPosition }}</strong> -->
    <strong>
      Latitude: {{ positionAsObject?.coords?.latitude }}, Longitude:
      {{ positionAsObject?.coords?.longitude }}, Speed:
      {{
        positionAsObject?.coords?.speed * 3.6 + ' km/h test' ||
        'Currently not moving'
      }}
    </strong>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Geolocation, Position } from '@capacitor/geolocation';

const positionAsObject = ref();
const positionAsString = ref();

function getCurrentPosition() {
  Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(
    (newPosition) => {
      // console.log('Current', newPosition);
      positionAsObject.value = newPosition;
    }
  );
}

let geoId: any;

onMounted(() => {
  getCurrentPosition();

  // Set up a custom timer to call getCurrentPosition every second
  const timerInterval = setInterval(() => {
    getCurrentPosition();
  }, 1000000);

  // we start listening
  geoId = Geolocation.watchPosition({}, (newPosition, err) => {
    // console.log('New GPS position');
    positionAsString.value = newPosition;
  });
  onBeforeUnmount(() => {
    // we do cleanup
    clearInterval(timerInterval);
    Geolocation.clearWatch(geoId);
  });
});
</script>
