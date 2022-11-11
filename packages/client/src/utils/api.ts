import axios from 'axios';

const SERVER_API = 'http://localhost:1337/api';

// Simplified Twilio interface
interface TokenInstance {
  /** @see https://github.com/twilio/twilio-node/blob/3cbb3f899568b698ff24fa91af7861295caf027c/lib/rest/oauth/v1/token.d.ts#L72 */
  // accessToken: string;
  // accessTokenExpiresAt: Date;
  // idToken: string;
  // refreshToken: string;
  // refreshTokenExpiresAt: Date;

  /** @see https://github.com/twilio/twilio-node/blob/0018eca40e914d9149b49a3e6b198f4704dc82b2/lib/rest/api/v2010/account/token.d.ts#L68 */
  accountSid: string;
  dateCreated: Date;
  dateUpdated: Date;
  iceServers: RTCConfiguration['iceServers'];
  password: string;
  ttl: string;
  username: string;
}

export async function getRoomExists(roomId: string) {
  const response = await axios.get<{ roomExists: boolean; isFull: boolean }>(
    `${SERVER_API}/room-exists/${roomId}`
  );

  return response.data;
}

export async function getTurnCredentials() {
  const response = await axios.get<{ token: TokenInstance | null }>(
    `${SERVER_API}/turn-credentials`
  );

  return response.data;
}
