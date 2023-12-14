<template>
  <div>
    <q-btn color="primary" label="Get Picture" @click="captureImage" />
    <q-btn color="primary" label="Vibrate" @click="hapticsVibrate" />

    <q-img :src="imageSrc" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const imageSrc = ref('');

async function captureImage() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
  });

  // The result will vary based on the value of the resultType option.
  // CameraResultType.Uri - Get the result from image.webPath
  // CameraResultType.Base64 - Get the result from image.base64String
  // CameraResultType.DataUrl - Get the result from image.dataUrl
  imageSrc.value = image.webPath;
}

const hapticsVibrate = async () => {
  await Haptics.vibrate();
};
</script>
