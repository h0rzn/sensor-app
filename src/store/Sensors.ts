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
        latest: [
            {
                type: "mytype",
                name: "myname",
                temperature: 7,
                load: 7,
                power: 7
            }
        ]
    }),
    getters: {
        getByType(state): (typ: string) => Set | undefined {
            return (typ: string): Set | undefined => {
                return state.latest.find((set: Set) => set.type == typ)
            }
        }
    },
    actions: {
        update(newSet: Set[]) {
            this.latest = newSet;
        }
    }
})