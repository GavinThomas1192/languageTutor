import React from "react";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";

export default class VideoChat extends React.Component {
  render() {
    return (
      <div>
        <div
          id="otEmbedContainer"
          style={{
            width: "800px",
            height: "640px"
          }}
        />
        <iframe
          src="https://tokbox.com/embed/embed/ot-embed.js?embedId=665b1af9-803b-4c0f-9e92-9b4b49f12fba&room=111&iframe=true"
          width="800px"
          height="640px"
          allow="microphone; camera"
        />
        <h1
          style={{
            color: "black"
          }}
        >
          hello from video chat
        </h1>
      </div>
    );
  }
}
