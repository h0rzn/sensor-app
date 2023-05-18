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

def randomized_set():
    set = data_set
    set["data"]["cpu"]["temperature"]["value"] = random.randint(0, 100)
    set["data"]["cpu"]["load"]["value"] = random.randint(0, 50)
    set["data"]["cpu"]["power"]["value"] = random.randint(30, 180)
    return json.dumps(set)


# create handler for each connection
async def handler(websocket, path):
    print("handling")

    while True:
        try:
            print("sending", random.randint(0, 999))
            await websocket.send(randomized_set())

        except websockets.exceptions.ConnectionClosed:
            print("<disconnect>")
            return  
        time.sleep(1)


if __name__ == "__main__":
    start_server = websockets.serve(handler, "localhost", 8000)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
