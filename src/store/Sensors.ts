import { defineStore } from "pinia";
import { Components } from '../types';

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
        getByType(state): (typ: Components) => Set | undefined {
            return (typ: Components): Set | undefined => {
                return state.latest.find((set: Set) => set.type == typ)
            } 
        }
        // getCustomerById({ customers }): (id: string) => Customer | undefined {
        //     return (id: string): Customer | undefined => {
        //       return customers.find((customer) => customer.id === id)
        //     }
        //   },
    },
    actions: {
        update(newSet: Set[]) {
            this.latest = newSet;
        }
    }
})