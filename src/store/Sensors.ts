import { defineStore } from "pinia";

export type Set = {
    type: string;
    name: string;
    temperature: number;
    load: number;
    power: number;
}

type State = {
    latest: Set[];
}

export const useSensors = defineStore("sensors", {
    state: (): State => ({
        latest: []
    }),
    getters: {
        getByType(state): (typ: string) => Set | undefined {
            return (typ: string): Set | undefined => {
                return state.latest.find((set: Set) => set.type == typ)
            }
        },
        getSensor(state): (type: string, sensor: string) => number | undefined {
            return (type: string, sensor: string): number | undefined => {
                const set: Set | undefined = state.latest.find((set: Set) => set.type == type)
                if (set == undefined) {
                    return
                }
                switch (sensor) {
                    case "load":
                        return set.load;
                    case "temperature":
                        return set.temperature;
                    case "power":
                        return set.power;
                    default:
                        return undefined;
                }
            }
        },

    },
    actions: {
        update(newSet: Set[]) {
            this.latest = newSet;
        }
    }
})


// setup store
// export const useSensors = defineStore("sensors", () => {
//     const data: Ref<State> = ref({
//         latest: []
//     });

//     const getByType = computed<Set | undefined>((): Set | undefined => {
//         return (type: string) => data.value.latest.find((set: Set) => set.type == type)
//     })

//     function update(newSet: Set[]) {
//         data.value.latest = newSet;
//     }


//     return { data, getByType, update }
// })
