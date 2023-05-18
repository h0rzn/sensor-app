#!/usr/bin/python3
import asyncio
import websockets

async def run(): 
    async with websockets.connect("ws://127.0.0.1:8000") as ws:
        while True:
            rcv = await ws.recv()
            print("<<<RCV:", rcv)


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(run())