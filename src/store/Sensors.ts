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

        ]
    }),
    getters: {
        getByType({ latest }): (type: string) => Set | undefined {
            return ((type: string) => {
                // latest.forEach((set) => {
                //     if (set.type == type) {
                //         return set
                //     }
                // })
                // return undefined


                const fake: Set = {
                    type: "cpu",
                    name: "name ehre",
                    temperature: 80.1,
                    load: 54,
                    power: 150
                };

                return fake;

                // console.log(latest);
                // return latest.find((set) => set.type == type);
            });
        }

    },
    actions: {
        update(newSet: Set[]) {
            this.latest = newSet;
        }
    }
})