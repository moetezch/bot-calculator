import { Server } from 'socket.io';
import { getHistory, calculate } from '../services/index.js';

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
            const result = await calculate(command);
            socket.emit('result', result);
        });
    });
};
