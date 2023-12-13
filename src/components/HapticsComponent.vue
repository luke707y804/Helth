<template>
  <q-btn @click="hapticsVibrate()" label="Vibrate"></q-btn>
</template>

<script setup lang="ts">
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const hapticsVibrate = async () => {
  await Haptics.vibrate();
};
</script>
