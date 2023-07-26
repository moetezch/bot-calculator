import { useState, useEffect, MouseEvent } from 'react';
import Terminal, {
    ColorMode,
    TerminalOutput,
    TerminalInput,
} from 'react-terminal-ui';
import { socket } from './socket';

const App = () => {
    const [colorMode, setColorMode] = useState(ColorMode.Dark);
    const [lineData, setLineData] = useState([
        <TerminalOutput>
            Welcome to the bot calculator coding challenge!&#128075;
        </TerminalOutput>,
        <TerminalOutput></TerminalOutput>,
        <TerminalOutput>
            You can chat with the bot using only 2 possible command types:
        </TerminalOutput>,
        <TerminalOutput>
            Operation command: 1 + 1 or 5 * 3, 1526 - 1452 + 5623 * 2, ...
        </TerminalOutput>,
        <TerminalOutput>
            History command: 'history' to display latest 10 calculations used.
        </TerminalOutput>,
        <TerminalOutput>'clear' will clear the terminal.</TerminalOutput>,
    ]);

    function handleHistory(history: { command: string; result: string }[]) {
        let ld = [...lineData];
        history.forEach((entry) => {
            const line = `${entry.command} = ${entry.result}`;
            ld.push(<TerminalInput>{line}</TerminalInput>);
        });
        setLineData(ld);
    }

    function handleResult(result: string) {
        let ld = [...lineData];

        ld.push(<TerminalInput>{result}</TerminalInput>);
        setLineData(ld);
    }
    useEffect(() => {
        socket.on('connect', () => {
            console.log(`Connected to the server}`);
        });
        socket.on('disconnect', () => {
            console.log(`disconnected from the server}`);
        });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    useEffect(() => {
        socket.on('result', handleResult);
        socket.on('history', handleHistory);

        return () => {
            socket.off('result');
            socket.off('history');
        };
    }, [lineData]);

    function toggleColorMode(e: MouseEvent) {
        e.preventDefault();
        setColorMode(
            colorMode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light
        );
    }

    function onInput(input: string) {
        let ld = [...lineData];
        ld.push(<TerminalInput>{input}</TerminalInput>);
        setLineData(ld);
        if (input.toLocaleLowerCase().trim() === 'history') {
            socket.emit('history');
        } else if (input.toLocaleLowerCase().trim() === 'clear') {
            ld = [];
        } else {
            socket.emit('calculate', input);
        }
        setLineData(ld);
    }

    const btnClasses = ['btn'];
    if (colorMode === ColorMode.Light) {
        btnClasses.push('btn-dark');
    } else {
        btnClasses.push('btn-light');
    }

    return (
        <div className="container">
            <div className="d-flex flex-row-reverse p-2">
                <button
                    className={btnClasses.join(' ')}
                    onClick={toggleColorMode}
                >
                    Enable {colorMode === ColorMode.Light ? 'Dark' : 'Light'}{' '}
                    Mode
                </button>
            </div>
            <Terminal
                name="Bot Calculator"
                colorMode={colorMode}
                onInput={onInput}
            >
                {lineData}
            </Terminal>
        </div>
    );
};

export default App;
