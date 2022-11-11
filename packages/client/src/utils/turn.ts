import { getTurnCredentials } from './api';

let turnIceServers: RTCConfiguration['iceServers'] | null = null;

export async function fetchTurnCredentials() {
  const { token = null } = await getTurnCredentials();

  if (token?.iceServers) {
    turnIceServers = token.iceServers;
  }

  return turnIceServers;
}

export function getTurnIceServers() {
  return turnIceServers;
}
