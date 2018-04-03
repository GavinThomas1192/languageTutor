import React from 'react';
import ReactDOM from 'react-dom';
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react';

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

export default class VideoChat extends React.Component {

    componentDidMount() {
        console.log(`${process.env.apiKey}`)
    }
    render() {

        return (
            <div
                style={{
                marginLeft: '30em',
                marginTop: '20em'
            }}>
                <OTSession
                    apiKey={`${process.env.apiKey}`}
                    sessionId="your-session-id"
                    token="your-session-token">
                    <OTPublisher/>
                    <OTStreams>
                        <OTSubscriber/>
                    </OTStreams>
                </OTSession>
            </div>
        );
    }
}