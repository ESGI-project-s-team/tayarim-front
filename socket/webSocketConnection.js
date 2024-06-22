import {useEffect, useState} from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const WebSocketConnection = (url) => {
    const [ws, setWs] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = new ReconnectingWebSocket(url);

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (message) => {
            console.log('WebSocket message received:', message);
            setMessages((prevMessages) => [...prevMessages, message.data]);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        setWs(socket);

        /* return () => {
             socket.close();
         };*/
    }, [url]);

    const sendMessage = (message) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        } else {
            console.error('WebSocket is not open');
        }
    };

    return {messages, sendMessage};
};

export default WebSocketConnection;
