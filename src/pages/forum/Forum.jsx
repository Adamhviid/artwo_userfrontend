import React, { useState, useEffect } from "react";
import axios from "axios";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useAuth } from "../../AuthContext";

function Forum() {
    const [messageHistory, setMessageHistory] = useState([]);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const { state } = useAuth();

    const { sendMessage, lastMessage, readyState } = useWebSocket(
        "ws://localhost:8000",
        {
            onOpen: () => console.log("WebSocket Client Connected"),
        }
    );

    useEffect(() => {
        getAllMessages();
        if (state.user) {
            setUsername(state.user.username);
        }
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage));
        }
    }, [lastMessage, setMessageHistory]);

    const handleClickSendMessage = () => {
        sendMessage(
            JSON.stringify({
                time: new Date().toLocaleString().slice(12, 20),
                username: state.user.username,
                userId: state.user.id,
                message: message,
            })
        );
        setMessage("");
    };

    const getAllMessages = () => {
        axios
            .get(`${import.meta.env.VITE_URL}/user/chat`)
            .then((res) => {
                console.log(res.data);
                setMessageHistory(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const connectionStatus = {
        [ReadyState.CONNECTING]: "Forbinder",
        [ReadyState.OPEN]: "Åben",
        [ReadyState.CLOSING]: "Lukker",
        [ReadyState.CLOSED]: "Lukket",
        [ReadyState.UNINSTANTIATED]: "Bruh",
    }[readyState];

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    return (
        <div>
            <h3>{connectionStatus}</h3>
            {!state.isAuthenticated ? (
                <p>Du skal være logget ind for at bruge chatten</p>
            ) : (
                <>
                    <input
                        type="text"
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button
                        onClick={handleClickSendMessage}
                        disabled={readyState !== ReadyState.OPEN}
                    >
                        Send besked
                    </button>
                </>
            )}
            <ul>
                {messageHistory.map((message, i) => (
                    <p key={i}>
                        {message.username} [{formatDate(message.createdAt)}]:{" "}
                        <p style={{ fontWeight: "bold" }}>{message.content}</p>
                        <br />
                    </p>
                ))}
            </ul>
        </div>
    );
}

export default Forum;
