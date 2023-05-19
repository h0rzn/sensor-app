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
const updateInterval = 1000;

export default {
    name: 'SensorChart',
    components: { Line },
    data() {
        return {
            updateSetTimer: undefined,
            chartData: {
                labels: [ 'A', 'B', 'C' ],
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
        console.log("created timer h");
    },
    mounted() {
        console.log("mounted")

        // new Chart(this.$refs.chartRef, {
        //     type: "line",
        //     data: {
        //         labels: [ 'A', 'B', 'C' ],
        //         datasets: [ { 
        //             data: [10, 20, 30] 
        //         }]
        //     },
        //     options: {
        //         responsive: true,
        //         elements: {
        //             point: {
        //                 pointStyle: false,
        //             },
        //         },
        //         scales: {
        //             y: {
        //                 ticks: {
        //                     display: false,
        //                 },
        //                 grid: {
        //                     display: false,
        //                 },
        //                 border: {
        //                     display: false,
        //                 }
        //             },
        //             x: {
        //                 ticks: {
        //                     display: false,
        //                 },
        //                 grid: {
        //                     display: false,
        //                 },
        //                 border: {
        //                     display: false,
        //                 }
        //             }
        //         },
        //         plugins: {
        //             legend: {
        //                 display: false,
                        
        //             }
        //         }
        //     }
        // })
    },
    computed: {
        // history() {

        // }
    },
    methods: {
        updateSet() {
            console.log("updating dataset");
            let chart = toRaw(this.$refs.chartRef.chart);
            let data = chart.data.datasets[0].data;

            let loadHistory = toRaw(this.store.getCpuLoadHistory);
            this.chartData.datasets[0].data = loadHistory;
            
            console.log(loadHistory, this.chartData.datasets[0].data, data);
            
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
  