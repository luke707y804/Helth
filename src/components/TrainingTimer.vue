<!-- src/pages/PomodoroTimer.vue -->
<template>
  <q-page>
    <div class="q-layout-lHh_Lpr_lFf">
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
            <q-input
              class="q-gutter-md"
              v-model="workDuration"
              label="Work Duration (minutes)"
              type="number"
              outlined
              dense
              filled
            />
            <q-input
              class="q-gutter-md"
              v-model="breakDuration"
              label="Break Duration (minutes)"
              type="number"
              outlined
              dense
              filled
            />
            <q-input
              class="q-gutter-md"
              v-model="reps"
              label="Reps"
              type="number"
              outlined
              dense
              filled
            />
            <div>
              <q-btn
                v-if="!isRunning"
                @click="startTimer"
                label="Start"
                color="green"
              />
              <!-- <q-btn
                v-if="isRunning"
                @click="pauseTimer"
                label="Pause"
                color="warning"
                class="q-mr-sm"
              /> -->
              <q-btn
                @click="resetTimer"
                label="Reset"
                color="white"
                text-color="green"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import LStore from 'src/stores/time-store';

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
    //storePassedTime();
    isRunning.value = true;
    if (count > 0) {
      if (isWorkTimer.value) {
        // reps.value -= 1;
        console.log(count + ' in der Schleife');
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
      // isWorkTimer.value = false;
      // isBreakTimer.value = false;
    }

    timerInterval = setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value -= 1;
      } else {
        clearInterval(timerInterval);
        isRunning.value = false;
        if (count > 0) {
          startTimer(); // Start the next timer
        } else {
          console.log(count + ' Am Ende der Schleife');
          storePassedTime();
          resetTimer();
        }
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

const storePassedTime = () => {
  // Speichern der vergangengen Zeit als Number
  const store = LStore.useTimeStore();
  store.update(workDuration.value * reps.value);
};
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
  width: 100%; /* Hier kannst du die Breite nach Bedarf anpassen */
  margin: 0 auto; /* Zentriert die Karte im Container */
}

/* Stil für das Timer-Element */
.timer {
  display: flex;
  align-items: center;
}

/* Stil für den Button */

/* Zusätzlicher Stil für den "Start" Button */

/* Stil für die Eingabefelder */
.q-gutter-md {
  width: 100%;
  padding: 10px; /* Hinzugefügtes Padding für konsistentes Erscheinungsbild */
}
.timer {
  display: flex;
  flex-direction: column; /* Setzt die Richtung der Flexbox auf vertikal (untereinander) */
  align-items: center; /* Zentriert die Elemente horizontal in der Flexbox */
}
.q-badge {
  font-size: 32px; /* Passe die Schriftgröße nach Bedarf an */
  padding: 20px;
}
.custom-image {
  width: 90%;
  margin: 0 auto; /* Horizontal zentrieren */
  display: flex;
  align-items: center; /* Vertikal zentrieren */
  justify-content: center; /* Vertikal zentrieren */
}
.sporty-img {
  height: 200px;
  max-width: 100%;
  margin-bottom: 20px;
}
</style>
