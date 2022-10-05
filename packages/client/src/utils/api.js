import axios from 'axios';

const SERVER_API = 'http://localhost:1337/api';

/**
 *
 * @param {string} roomId
 * @returns
 */
export function getRoomExists(roomId) {
  return axios
    .get(`${SERVER_API}/room-exists/${roomId}`)
    .then((response) => response.data);
}
