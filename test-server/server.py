#!/usr/bin/python3
import asyncio
import websockets
import json
import time
import random

SEND_DATA = "test123"

data_set = {
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

data_set_new = {
    "type": "sensors",
    "data": [
        {
            "type": "cpu",
            "name": "i7 13700k",
            "temperature": 54.3,
            "load": 56,
            "power": 120
        },
        {
            "type": "gpu",
            "name": "RTX 2070 Super",
            "temperature": 54.3,
            "load": 56,
            "power": 120
        }
    ]
}

def randomized_set():
    set = data_set_new
    for item in set["data"]:
        item["temperature"] = random.randint(0, 100)
        item["load"] = random.randint(0, 50)
        item["power"]  = random.randint(30, 180)
    return set


# create handler for each connection
async def handler(websocket, path):
    print("handling")

    while True:
        try:
            set = randomized_set()
            print("sending", set)
            await websocket.send(json.dumps(set))

        except websockets.exceptions.ConnectionClosed:
            print("<disconnect>")
            return  
        time.sleep(1)


if __name__ == "__main__":
    start_server = websockets.serve(handler, "localhost", 8000)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
