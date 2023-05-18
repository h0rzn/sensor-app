<template>
    <!-- <Line
      id="chart"
      ref="chartRef"
      :options="options"
      :data="chartData"
    /> -->
    <canvas ref="chartRef" width="500" height="300"></canvas>
</template>
  
<script>
import { useSensorsStore } from '../store/Sensors.js';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// const maxValues = 3;

export default {
    name: 'SensorChart',
    data() {
        return {
            updateSetTimer: undefined
        }
    },
    setup() {
        const store = useSensorsStore();
        return { store };
    },
    created() {
        this.updateSetTimer = setInterval(this.updateDataSet, 1000);
        console.log("created timer h");
    },
    mounted() {
        console.log("mounted")

        new Chart(this.$refs.chartRef, {
            type: "line",
            data: {
                labels: [ 'A', 'B', 'C' ],
                datasets: [ { 
                    data: [0, 0, 0] 
                }]
            },
            options: {
                responsive: true,
                elements: {
                    point: {
                        pointStyle: false,
                    },
                },
                scales: {
                    y: {
                        ticks: {
                            display: false,
                        },
                        grid: {
                            display: false,
                        },
                        border: {
                            display: false,
                        }
                    },
                    x: {
                        ticks: {
                            display: false,
                        },
                        grid: {
                            display: false,
                        },
                        border: {
                            display: false,
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                        
                    }
                }
            }
        })
    },
    methods: {
        updateDataSet() {
            console.log("updating dataset");
            let cpuLoadHistory = this.store.getCpuLoadHistory();
            console.log(cpuLoadHistory);

            // this.$refs.chartRef._chart
            // this.$refs.chartRef._chart.update();
        },
        cancelUpdateSetTimer () {
            clearInterval(this.updateSetTimer);
        }
    },
}
</script>

<style>
/* #chart {
    border: 1px solid red;
} */

</style>
  