import { io } from 'socket.io-client';

// Vercel'deki API URL'sine bağlanıyoruz
const socket = io('https://chat-liard-eta.vercel.app/api/socket'); // Vercel URL

// Mesaj alındığında DOM'a ekleme
export default socket