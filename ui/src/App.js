import React, { Component } from "react";
import Loader from "react-loader-spinner";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      endpoint: "ws://0.0.0.0:8083/ws",
      loading: false,
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    // const socket = socketIOClient(endpoint);
    let socket = new WebSocket(endpoint);

    socket.onopen = function (e) {
      console.log("Connection established");
    };
    socket.onmessage = (event) => {
      this.setState({
        response: JSON.parse(event.data),
        loading: true,
      });
    };
  }

  render() {
    const { response, loading } = this.state;

    return (
      <>
        <Loader
          type="Rings"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={loading === true ? 500 : 200000}
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
              <div
                style={{
                  fontSize: 30,
                  marginRight: 20,
                  marginLeft: 20,
                  textAlign: "center",
                }}
              >
                Down <br />
                {response.totalDown}
              </div>
              <div style={{ fontSize: 30, textAlign: "center" }}>
                Up
                <br />
                {response.totalUp}
              </div>
            </>
          ) : null}
        </div>
      </>
    );
  }
}
export default App;
