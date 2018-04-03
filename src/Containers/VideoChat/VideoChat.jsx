import React from 'react';
import ReactDOM from 'react-dom';
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react';

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

export default class VideoChat extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div
                    id="otEmbedContainer"
                    style={{
                    width: '800px',
                    height: '640px'
                }}></div>
                <iframe
                    src="https://tokbox.com/embed/embed/ot-embed.js?embedId=665b1af9-803b-4c0f-9e92-9b4b49f12fba&room=111&iframe=true"
                    width="800px"
                    height="640px"
                    allow="microphone; camera"></iframe>
                <h1 style={{
                    color: 'black'
                }}>hello from video chat</h1>
            </div>
        )
    }
}
