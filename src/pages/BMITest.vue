<!-- src/pages/BMITest.vue -->
<template>
  <q-page>
    <div class="q-pa-md">
      <div class="chart-container">
        <canvas ref="bmiChartCanvas"></canvas>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const bmiData = [
  { bmi: 18, frequency: 10 },
  { bmi: 20, frequency: 20 },
  { bmi: 22, frequency: 30 },
  // Add more data points as needed
];
const highlightBmi = 22;

const labels = bmiData.map((item) => item.bmi.toString());
const data = bmiData.map((item) => item.frequency);

const meanBmi =
  bmiData.reduce((sum, item) => sum + item.bmi, 0) / bmiData.length;

const bmiChartCanvas = ref<null | HTMLCanvasElement>(null);
const bmiChartInstance = ref<null | Chart>(null);

onMounted(() => {
  if (bmiChartCanvas.value) {
    const ctx = bmiChartCanvas.value.getContext('2d');
    if (ctx) {
      bmiChartInstance.value = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'BMI Distribution',
              data,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Highlight BMI',
              data: [{ x: highlightBmi, y: 0 }],
              pointBackgroundColor: 'red',
              pointRadius: 8,
              pointHoverRadius: 10,
              type: 'scatter',
            },
            {
              label: 'Mean BMI',
              data: Array(labels.length).fill(meanBmi),
              borderColor: 'rgba(255, 0, 0, 1)', // Red color for mean line
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: { title: { display: true, text: 'BMI' } },
            y: { title: { display: true, text: 'Frequency' } },
          },
          plugins: {
            legend: { display: true },
            tooltip: {
              callbacks: {
                label: (context) => {
                  if (context.datasetIndex === 0) {
                    return `Frequency: ${context.parsed.y}`;
                  } else if (context.datasetIndex === 1) {
                    return `Highlight BMI: ${context.parsed.x}`;
                  } else {
                    return `Mean BMI: ${meanBmi.toFixed(2)}`;
                  }
                },
              },
            },
          },
        },
      });
    }
  }
});
</script>

<style scoped>
.chart-container {
  width: 80vw;
  max-width: 600px;
}
</style>
