<!-- src/pages/PomodoroTimer.vue -->
<template>
  <q-page>
    <div class="q-pa-md text-h6">
      <q-card>
        <q-card-section>
          <div v-if="isWorkTimer || isBreakTimer">
            <div v-if="isWorkTimer">
              <div class="timer">
                <q-badge color="red" text-color="white" class="q-mr-xs">
                  {{ formatTime(timeRemaining) }}
                </q-badge>
                <q-icon name="timer" size="2em" color="red" />
              </div>
            </div>
            <div v-if="isBreakTimer">
              <div class="timer">
                <q-badge color="green" text-color="white" class="q-mr-xs">
                  {{ formatTime(timeRemaining) }}
                </q-badge>
                <q-icon name="timer" size="2em" color="green" />
              </div>
            </div>
          </div>
          <div v-else>
            <q-input
              v-model="workDuration"
              label="Work Duration (minutes)"
              type="number"
              outlined
              dense
            />
            <q-input
              v-model="breakDuration"
              label="Break Duration (minutes)"
              type="number"
              outlined
              dense
            />
            <q-input v-model="reps" label="Reps" type="number" outlined dense />
            <div class="q-mt-md">
              <q-btn
                v-if="!isRunning"
                @click="startTimer"
                label="Start"
                color="primary"
                class="q-mr-sm"
              />
              <!-- <q-btn
                v-if="isRunning"
                @click="pauseTimer"
                label="Pause"
                color="warning"
                class="q-mr-sm"
              /> -->
              <q-btn @click="resetTimer" label="Reset" color="negative" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';

const workDuration = ref<number>(0.1);
const breakDuration = ref<number>(0.2);
const totalWorkoutDuration = ref<number>(1);
const isWorkTimer = ref<boolean>(false);
const isBreakTimer = ref<boolean>(false);
const isRunning = ref<boolean>(false);
let timerInterval: number;
const timeRemaining = ref<number>(workDuration.value * 60);
const reps = ref<number>(5);

const startTimer = () => {
  if (!isRunning.value) {
    isRunning.value = true;
    if (reps.value > 0) {
      if (isWorkTimer.value) {
        reps.value -= 1;
        isWorkTimer.value = false;
        isBreakTimer.value = true;
        timeRemaining.value = breakDuration.value * 60;
      } else {
        isWorkTimer.value = true;
        isBreakTimer.value = false;
        timeRemaining.value = workDuration.value * 60;
      }
    } else {
      isWorkTimer.value = false;
      isBreakTimer.value = false;
    }

    timerInterval = setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value -= 1;
      } else {
        clearInterval(timerInterval);
        isRunning.value = false;
        startTimer(); // Start the next timer
      }
    }, 1000);
  }
};

const pauseTimer = () => {
  clearInterval(timerInterval);
  isRunning.value = false;
};

const resetTimer = () => {
  clearInterval(timerInterval);
  isRunning.value = false;
  isWorkTimer.value = false;
  isBreakTimer.value = false;
  timeRemaining.value = workDuration.value * 60;
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const handleTimeout = () => {
  resetTimer();
};

watch([workDuration, breakDuration], () => {
  resetTimer();
});

onBeforeUnmount(() => {
  clearInterval(timerInterval);
});
</script>

<style scoped>
.timer {
  display: flex;
  align-items: center;
}
</style>
