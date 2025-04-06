import { io } from 'socket.io-client';

// Vercel'deki API URL'sine bağlanıyoruz
const socket = io('http://localhost:5173/api/socket'); // Vercel URL

// Mesaj alındığında DOM'a ekleme
export default socket