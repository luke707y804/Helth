<!-- src/pages/PomodoroTimer.vue -->
<template>
  <q-layout view="lHh Lpr lFf">
    <div class="q-pa-md text-h6">
      <q-card class="my-card">
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
            <q-input class="q-gutter-md"
              filled
              v-model="workDuration"
              label="Work Duration (minutes)"
              type="number"
              
            />
            
            <q-input class="q-gutter-md"
              v-model="breakDuration"
              label="Break Duration (minutes)"
              type="number"
              filled
            />
            <q-input class="q-gutter-md"
            v-model="reps" 
            label="Reps" 
            type="number" 
            filled
            />
            <div class="q-mt-md">
              <q-btn class="button"
                v-if="!isRunning"
                @click="startTimer"
                label="Start"
                filled
                
              />
              <!-- <q-btn
                v-if="isRunning"
                @click="pauseTimer"
                label="Pause"
                
              /> -->
              <q-btn class="button" @click="resetTimer" label="Reset" color="negative" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';

const workDuration = ref<number>(0.05);
const breakDuration = ref<number>(0.05);
const totalWorkoutDuration = ref<number>(1);
const isWorkTimer = ref<boolean>(false);
const isBreakTimer = ref<boolean>(false);
const isRunning = ref<boolean>(false);
let timerInterval: number;
const timeRemaining = ref<number>(workDuration.value * 60);
const reps = ref<number>(2);
var count = reps.value * 2 - 1;

const startTimer = () => {
  if (!isRunning.value) {
    isRunning.value = true;
    if (count > 0) {
      if (isWorkTimer.value) {
        reps.value -= 1;
        count -= 1;
        isWorkTimer.value = false;
        isBreakTimer.value = true;
        timeRemaining.value = breakDuration.value * 60;
      } else {
        count -= 1;
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
/* styles.css */

/* Stil für das gesamte Formular-Container */
.q-layout-lHh_Lpr_lFf {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Stil für die q-card */
.my-card {
  width: 80%; /* Hier kannst du die Breite nach Bedarf anpassen */
  margin: 0 auto; /* Zentriert die Karte im Container */
}

/* Stil für das Timer-Element */
.timer {
  display: flex;
  align-items: center;
}


/* Stil für den Button */
.button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

/* Zusätzlicher Stil für den "Start" Button */
.button[disabled] {
  background-color: #ddd; /* Hintergrundfarbe für deaktivierten Zustand */
  cursor: not-allowed; /* Zeige an, dass der Button deaktiviert ist */
}
/* Stil für die Eingabefelder */
.q-gutter-md {
  width: 100%;
  padding: 10px; /* Hinzugefügtes Padding für konsistentes Erscheinungsbild */
}



</style>
