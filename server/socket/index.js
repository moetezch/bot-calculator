import { Server } from 'socket.io';

export const initSocket = (server) => {
    const io = new Server(server);
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.on('history', () => {
            // return history
        });
        socket.on('calculate', (command) => {
            // calculate then emit the result
        });
    });
};
