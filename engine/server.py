
import cv2
from quart import Quart, Response, jsonify, websocket
from quart_cors import cors
# from quart_socketio import SocketIO, emit
import base64
import time
import numpy as np
import json
from dl.persondetection import DetectorAPI, TrackableObject, CentroidTracker
from config import config

# import tensorflow.compat.v1 as tf
# tf.disable_v2_behavior()
from dl.face_verify import faceRec


app = Quart(__name__)
cors(app)

config = (dict(**config()))
camera = faceRec()

# graph = tf.get_default_graph()


@app.route("/")
async def index():
    return jsonify({"msg": "welcome to engine"})


@app.websocket('/ws')
async def get_stream():
    # global graph
    # with graph.as_default():
    

    while True:
        frame = camera.main()
        
        _, frame = cv2.imencode('.jpg', frame)

        jpg_as_text = base64.b64encode(frame).decode('ascii')
        data = {"image": jpg_as_text}
        await websocket.send(json.dumps(data))

        # if not grabbed:
        #     time.sleep(2)
        #     cap = cv2.VideoCapture(src)
        #     continue


# @app.route("/feed")
# async def feed():
#     return Response(get_stream(),
#                     mimetype='multipart/x-mixed-replace; boundary=frame'), 200


if __name__ == '__main__':
    server = f"engine start {config['host']}:{config['port']}"
    print(server)
    app.run(host=config['host'], port=config['port'])
