import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { api } from './api';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
const PORT = process.env['PORT'] || 3002;

app.use('/api', api);
app.use(express.static('src'));
app.use(cors());

app.get('*', (req, res) => {
	res.sendFile(__dirname + 'index.html');
})

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.emit('welcome', { message: 'Welcome to the server!' });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
