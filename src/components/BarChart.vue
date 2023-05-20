<template>
    <Line
      id="chart"
      ref="chartRef"
      :options="options"
      :data="chartData"
    />
</template>
  
<script>
import { useSensorsStore } from '../store/Sensors.js';
import { toRaw } from 'vue';
import { Chart, registerables } from 'chart.js';
import { Line } from 'vue-chartjs'

Chart.register(...registerables);

// const maxValues = 5;
const updateInterval = 2000;

export default {
    name: 'SensorChart',
    components: { Line },
    data() {
        return {
            updateSetTimer: undefined,
            chartData: {
                labels: [ 0, 1, 2, 3, 4, 5, 7, 8, 9 ],
                datasets: [ { 
                    data: [] 
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
        }
    },
    setup() {
        const store = useSensorsStore();
        return { store };
    },
    created() {
        this.updateSetTimer = setInterval(this.updateSet, updateInterval);
    },
    watch: {
        chartData: {
            handler() {
                let chart = this.$refs.chartRef.chart;
                chart.update();
            },
            deep: true
        }
    },
    methods: {
        updateSet() {
            console.log("updating dataset");
            let chart = this.$refs.chartRef.chart;

            let loadHistory = toRaw(this.store.getCpuLoadHistory);
            chart.data.datasets[0].data = loadHistory;
            chart.update();
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
  