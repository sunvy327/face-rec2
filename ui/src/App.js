import React, { Component } from "react";
import Loader from "react-loader-spinner";

class App extends Component {
  // constructor(props) {
    state = {
      response: [],
      endpoint: "ws://0.0.0.0:8083/ws",
      loading: false,
    }
  // }

  componentDidMount() {
    const { endpoint } = this.state;
    // const socket = socketIOClient(endpoint);
    let socket = new WebSocket(endpoint);

    socket.onopen = function (e) {
      console.log("Connection established");
    };
    socket.onmessage = (event) => {

      this.setState({
        loading: true,
        response: JSON.parse(event.data),
      });
    };
  }

  render() {
    const { response, loading } = this.state;
    console.log(response)
    return (
      <>
        <Loader
          type="Rings"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={loading === true}
          style={{ marginTop: "200px", marginLeft: "36em" }}
        />
        <div style={{ display: "flex" }}>
          {loading ? (
            <>
              <div>
                <img
                  src={
                    response.image && `data:image/gif;base64,${response.image}`
                  }
                  alt=""
                />
              </div>
              <div style={{ fontSize: 25, textAlign: "center", margin:"20px 70px" }}>
                <h3>Detected Face</h3>
                <br />
                <img
                  src={
                    response.detection && `data:image/gif;base64,${response.detection}`
                  }
                  alt=""
                  width="300"
                /> <br />
                  {response.name ? <>Name: {response.name} <br /></> : null}
                  {response.score ? <>Score: {response.score} <br /></> : null}
              </div>
            </>
          ) : null}
        </div>
      </>
    );
  }
}
export default App;
