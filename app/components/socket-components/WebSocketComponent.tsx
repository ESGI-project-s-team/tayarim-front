import React, {useEffect, useState} from 'react';
import WebSocketConnection from '../../../socket/webSocketConnection';

const WebSocketComponent = ({token}: {
    token: string
}) => {
    const {messages, sendMessage} = WebSocketConnection(`http://localhost:8080/socket`);

    useEffect(() => {
        if (token) {
            sendMessage(`Connect : Bearer ${token}`);
        }
    }, [token, sendMessage]);

    return (
        <div>
            <h1>WebSocket Messages</h1>
            <ul>
                {messages.map((message: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <button onClick={() => sendMessage('Your message here')}>Send Message</button>
        </div>
    );
};

export default WebSocketComponent;
