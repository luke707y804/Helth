<template>
  <div></div>
</template>
<script setup lang="ts">
import LStore from 'src/stores/speed-store';
import AStore from 'src/stores/exercise-store';
import { onMounted, onUpdated, ref } from 'vue';

var exercises;
var averageSpeed;
var exercisesWithSpeed: string[];

async function fillStores() {
  await sleep(1500);
  exercises = AStore.useExerciseStore().get;
  averageSpeed = LStore.useSpeedStore().getAvrg;
  exercisesWithSpeed = exercises.filter((x: string) => x.includes('mph'));
}
var chosenActivity: string[];

onMounted(() => {
  fillStores().then(() => console.log(activityWithSpeed('Running')));
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function selectSpeed(activity: string): number {
  const extractNumbers = (input: string): number[] => {
    // Remove content within brackets
    const stringWithoutBrackets = input.replace(/\([^)]+\)/g, '');

    // Extract numeric values
    const numberMatches = stringWithoutBrackets.match(/[\d.]+/g);
    if (numberMatches) {
      return numberMatches.map(Number);
    }
    return [];
  };

  const resultArray: number[] = chosenActivity.flatMap(extractNumbers);

  return findClosestNumber(resultArray, 9.3);
}

function findClosestNumber(arr: number[], randomNumber: number): number {
  // Combine the array and the random number
  const combinedArray = [...arr, randomNumber];

  // Sort the array in ascending order
  combinedArray.sort((a, b) => a - b);

  // Find the index of the random number in the combined array
  const randomIndex = combinedArray.indexOf(randomNumber);

  // Determine the closest numbers on either side of the random number
  const closestLower = combinedArray[randomIndex - 1];
  const closestHigher = combinedArray[randomIndex + 1];

  // Calculate the differences
  const diffToLower = randomNumber - closestLower;
  const diffToHigher = closestHigher - randomNumber;

  // Determine the closest number
  const closestNumber =
    diffToLower < diffToHigher ? closestLower : closestHigher;

  return closestNumber;
}

async function activityWithSpeed(activity: string): Promise<string> {
  chosenActivity = await exercisesWithSpeed.filter((x: string) =>
    x.includes(activity)
  );
  console.log(chosenActivity);
  console.log(
    chosenActivity.filter((x) =>
      x.includes(selectSpeed(activity).toString())
    )[0]
  );
  return await chosenActivity.filter((x) =>
    x.includes(selectSpeed(activity).toString())
  )[0];
}
</script>
