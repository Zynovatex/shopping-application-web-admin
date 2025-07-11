import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

type SocketConnection = {
  client: Client;
  adminId: string;
} | null;

const connectSocket = (onMessage: (msg: any) => void): SocketConnection => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("⛔ No token found, skipping WebSocket connection");
    return null;
  }

  let adminId: string | null = null;
  let exp: number | null = null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    adminId = payload?.adminId;
    exp = payload?.exp; // ⏱️ JWT expiration timestamp (in seconds)
  } catch (err) {
    console.error("⛔ Failed to parse token payload:", err);
    return null;
  }

  // ✅ Check for expiration
  const currentTime = Math.floor(Date.now() / 1000); // in seconds
  if (!exp || currentTime >= exp) {
    console.warn("⛔ Token expired, skipping WebSocket connection");
    return null;
  }

  if (!adminId) {
    console.warn("⛔ adminId missing in token, skipping WebSocket");
    return null;
  }

  const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/ws?token=${token}`;
  const socket = new SockJS(endpoint);

  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: (str) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[🔁 STOMP Debug] ${str}`);
      }
    },
    onConnect: () => {
      console.log("✅ STOMP WebSocket connected");

      // 🔥 FIXED: Correct topic subscription (Spring auto-adds /user/)
      const topic = `/user/${adminId}/admin`; // ✅ correct Spring STOMP topic
      console.log(`📡 Subscribing to topic: ${topic}`);

      client.subscribe(topic, (message) => {
        if (message.body) {
          try {
            const parsed = JSON.parse(message.body);
            console.log("📥 Raw WebSocket message received:", parsed);
            onMessage(parsed);
          } catch (err) {
            console.error("⛔ Failed to parse message:", err);
          }
        }
      });
    },
    onStompError: (frame) => {
      console.error("💥 STOMP Error:", frame.headers['message']);
      console.error("Details:", frame.body);
    },
  });

  client.activate();
  return { client, adminId };
};

export default connectSocket;
