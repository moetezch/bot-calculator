import { Server } from 'socket.io';
import { evaluate } from 'mathjs';
import { getHistory, setHistory } from '../services/index.js';
const invalidCommand = 'Invalid command';

export const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
        },
    });
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('history', async () => {
            const history = await getHistory();
            socket.emit('history', history);
        });

        socket.on('calculate', async (command) => {
            const entry = {
                command,
            };
            try {
                const result = evaluate(command);
                entry.result = result;
                socket.emit('result', result);
            } catch (error) {
                entry.result = invalidCommand;
                socket.emit('result', invalidCommand);
            }
            await setHistory(entry);
        });
    });
};
