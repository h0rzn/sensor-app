import { defineStore } from 'pinia';

export const useSensorsStore = defineStore("sensors", {
    state: () => ({
        registered: {
            "hostname": "test-pc",
            "ip": "127.0.0.1",
            "registered": [
                {
                    "type": "cpu",
                    "name": "i7 13700k",
                },
                {
                    "type": "gpu",
                    "name": "RTX 2070 Super",
                }
            ]
        },
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
        // get sensor by hw type
        getTempByHardware(state, hardware) {
            console.log(hardware);
            return state.latest.cpu.temperature.value
        },

        getPowerByHardware(state, hardware) {
            console.log(hardware);
            return state.latest.cpu.temperature.value;
        },

        // testing getts
        getLoad(state) {
            return state.latest.data.cpu.load.value
        },
        getPower(state) {
            return state.latest.data.cpu.power.value
        },
        getTemperature(state) {
            return state.latest.data.cpu.temperature.value
        },

        TgetTemp(state) {
            return state.latest.data.cpu.temperature
        },
        TgetPower(state) {
            return state.latest.data.cpu.power
        },



        getByHardwareType(state, type) {
            return state.latest.data[type];
        },
        getCpu(state) {
            return state.latest.data.cpu;
        },
        getCpuLoadHistory: (state) => state.history.cpu.load,
        getLatestCpuLoad: (state) => state.latest.data.cpu.load.value
    },
    actions: {
        set(set) {
            this.latest = set;
            let loadHistory = this.history.cpu.load;
            let cpuLoad = set.data.cpu.load.value;
            if (loadHistory.length == 5) {
                loadHistory.shift();
                loadHistory.push(cpuLoad);
            } else {
                loadHistory.push(cpuLoad);
            }
        }
    }
})