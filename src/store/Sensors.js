import { defineStore } from 'pinia';

export const useSensorsStore = defineStore("sensors", {
    state: () => ({ 
        latest: {
            "type": "sensors",
            "data": {
                "cpu": {
                    "name": "i7 13700k",
                    "temperature": {
                        "value": 63,
                        "unit": "degrees"
                    },
                    "load": {
                        "value": 70,
                        "unit": "percent"
                    },
                    "power": {
                        "value": 108,
                        "unit": "watt"
                    }
                },
                "gpu": {
                    "name": "RTX 2070 Super",
                    "temperature": {
                        "value": 63,
                        "unit": "degrees"
                    },
                    "load": {
                        "value": 70,
                        "unit": "percent"
                    },
                    "power": {
                        "value": 108,
                        "unit": "watt"
                    }
                } 
            }
        },
        history: {
            cpu: {
                load: [10, 20, 30]
            }
        },
    }),
    getters: {
        getCpu(state) {
            return state.latest.data.cpu;
        },
        // getCpuLoadHistory(state) {
        //     console.log("[store] get cpu load history");
        //     return state.history.cpu.load;
        // }
        getCpuLoadHistory: (state) => state.history.cpu.load,
        getLatestCpuLoad: (state) => state.latest.data.cpu.load.value
    },
    actions: {
        set(set) {
            this.latest = set;
            let loadHistory = this.history.cpu.load;
            let cpuLoad = set.data.cpu.load.value;
            if (loadHistory.length == 10) {
                loadHistory.shift();
                loadHistory.push(cpuLoad);
            } else {
                loadHistory.push(cpuLoad);
            }
        }
    }
})