# sensor-app-ui
Sensor App is a tool, to monitor a remote hardware device.
This repository contains the frontend project and is written in Vue.

The UI is designed for a 5'' display (480x320). Responsive design is planned.

Repository for the Windows-Deamon can be found <here>. 

## 
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

{
    "type": "error",
    "msg": "<error-message>"
}
```
