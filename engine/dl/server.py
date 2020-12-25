import base64
import json
from quart import Quart, jsonify, websocket
from face_verify import faceRec

camera = faceRec()

app = Quart(__name__)

@app.route("/")
async def index():
    return jsonify({"msg": "welcome to engine"})


@app.websocket('/ws')
async def get_stream():

    while True:
        frame = camera.main()
        print(frame)
        jpg_as_text = base64.b64encode(frame).decode('ascii')
        data = {"image": jpg_as_text}
        await websocket.send(json.dumps(data))

if __name__ == '__main__':
    server = f"engine start 0.0.0.0:8083"
    print(server)
    app.run(host="0.0.0.0", port="8083")
