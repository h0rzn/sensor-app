# sensor-app-ui
Sensor App is a tool, to monitor a remote hardware device.
This repository contains the frontend project and is written in Vue.

The UI is designed for a 3.5'' display (480x320). Responsive design is planned.

The Windows-Deamon is currently in a rather early state but the source code will be uploaded soon. 

<!-- ![screenshot](./github/Screenshot%202023-05-21%20at%2016.33.20.png) -->

### Initial Message
```json
{
    "hostname": "<hostname of pc daemon is running on>",
    "ip": "<ip of pc daemon is running on>",
    "registered": [
        {
            "type": "cpu | gpu",
            "name": "<name like i7 13700k>",
        }
    ]
}
```

### Generic Sensor Data Message
```json
{
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
}
```

### Error Message
```json
{
    "type": "error",
    "msg": "<error-message>"
}
```
