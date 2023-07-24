import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4777');
socket.on('connect', () => {
    console.log(`Connected to the server}`);
});

const App = () => {
    const [command, setCommand] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        socket.on('result', (result) => {
            setResult(result);
        });
        socket.on('history', (history) => {
            setHistory(history);
        });

        return () => {
            socket.off('result');
            socket.off('history');
        };
    }, []);

    const handleCommandChange = (event) => {
        setCommand(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (command.toLowerCase() === 'history') {
            socket.emit('history');
        } else {
            socket.emit('calculate', command);
        }
        setCommand('');
        setResult('');
        setHistory([]);
    };

    return (
        <div>
            <h1>Calculator App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={command}
                    onChange={handleCommandChange}
                    placeholder="Enter command (e.g., 1 + 1) or history to get the last 10 commands"
                />
                <button type="submit">Calculate</button>
            </form>
            {result && <p>Result: {result}</p>}
            {history.length > 0 && (
                <>
                    <h2>History</h2>
                    <ul>
                        {history.map((item, index) => (
                            <li key={index}>
                                {item.command} {item.result}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default App;
