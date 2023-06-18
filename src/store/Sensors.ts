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
        }
    },
    actions: {
        update(newSet: Set[]) {
            this.latest = newSet;
        }
    }
})