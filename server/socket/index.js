import { Server } from 'socket.io';
import { evaluate } from 'mathjs';

const invalidCommand = 'Invalid command';
export const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
        },
    });
    io.on('connection', (socket) => {
        const history = [];
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.on('history', () => {
            socket.emit('history', history);
        });
        socket.on('calculate', (command) => {
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
            history.push(entry);
        });
    });
};
