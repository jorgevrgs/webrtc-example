import axios from 'axios';

const SERVER_API = 'http://localhost:1337/api';

/**
 *
 * @param {string} roomId
 * @returns
 */
export function getRoomExists(roomId: string) {
  return axios
    .get<{ roomExists: boolean; isFull: boolean }>(
      `${SERVER_API}/room-exists/${roomId}`
    )
    .then((response) => response.data);
}
