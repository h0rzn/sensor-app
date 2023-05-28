
export enum SensorType {
    Load,
    Power,
    Temperature
};

export interface Sensor {
    type: SensorType,
    hwName: String,
};
