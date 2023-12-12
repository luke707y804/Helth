<template></template>

<script setup lang="ts">
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

async function getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
  }

 function watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {
    })
</script>
