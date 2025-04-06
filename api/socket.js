import { Server } from 'socket.io';
import { createServer } from 'http';

export default function handler(req, res) {
    // Sunucusuz fonksiyonlar için body parser'ı kapatıyoruz
    res.status(200).send("Socket.io connected");

    // HTTP server oluşturuyoruz
    const server = createServer((req, res) => {
        res.status(200).send('Socket server is running');
    });

    // Socket.io'yu bağlamak
    const io = new Server(server, {
        path: '/api/socket', // API URL
        cors: {
            origin: "*", // CORS yapılandırması
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        // Mesaj gönderme
        socket.on('send_message', (message) => {
            io.emit('receive_message', message);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    // Sunucuyu başlatıyoruz
    server.listen(83, () => {
        console.log("Server listening on port 83");
    });
}

export const config = {
    api: {
        bodyParser: false, // Raw socket isteklerini kabul etmemiz için body parser'ı devre dışı bırakıyoruz
        externalResolver: true, // Dış bağlantıları destekliyoruz
    }
};
