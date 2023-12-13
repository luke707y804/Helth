<template>
  <q-btn
    @click="
      hapticsImpactMedium();
      hapticsVibrate();
    "
    label="Vibrate"
  ></q-btn>
</template>

<script setup lang="ts">
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const hapticsImpactMedium = async () => {
  await Haptics.impact({ style: ImpactStyle.Medium });
};

const hapticsVibrate = async () => {
  await Haptics.vibrate();
};
</script>
