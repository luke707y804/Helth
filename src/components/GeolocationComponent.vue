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
import LStore from 'src/stores/speed-store';

const positionAsObject = ref();
const positionAsString = ref();

var speedArray = [];

function getCurrentPosition() {
  Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(
    (newPosition) => {
      // console.log('Current', newPosition);
      positionAsObject.value = newPosition;
      speedArray.push(newPosition.coords.speed);
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
    const average = (speedArray: any) =>
      speedArray.reduce((p: any, c: any) => p + c, 0) / speedArray.length;
  });
});
</script>
