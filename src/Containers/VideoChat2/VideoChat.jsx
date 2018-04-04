import React from 'react';
import {
  OTSession,
  OTPublisher,
  OTStreams,
  OTSubscriber,
  createSession,
} from 'opentok-react';

export default class VideoChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { streams: [] };
  }

  componentWillMount() {
    this.sessionHelper = createSession({
      apiKey: `${process.env.REACT_APP_API_KEY}`,
      sessionId: `${process.env.REACT_APP_sessionId}`,
      token: `${process.env.REACT_APP_token}`,
      onStreamsUpdated: (streams) => {
        this.setState({ streams });
      },
    });
  }

  componentWillUnmount() {
    this.sessionHelper.disconnect();
  }

  render() {
    return (
      <div style={{ marginLeft: '30em', marginTop: '30em' }}>
        <OTPublisher session={this.sessionHelper.session} />

        {this.state.streams.map(stream => (
          <OTSubscriber
            key={stream.id}
            session={this.sessionHelper.session}
            stream={stream}
          />
        ))}
      </div>
    );
  }
}
