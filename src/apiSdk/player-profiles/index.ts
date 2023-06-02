import axios from 'axios';
import queryString from 'query-string';
import { PlayerProfileInterface } from 'interfaces/player-profile';
import { GetQueryInterface } from '../../interfaces';

export const getPlayerProfiles = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/player-profiles${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPlayerProfile = async (playerProfile: PlayerProfileInterface) => {
  const response = await axios.post('/api/player-profiles', playerProfile);
  return response.data;
};

export const updatePlayerProfileById = async (id: string, playerProfile: PlayerProfileInterface) => {
  const response = await axios.put(`/api/player-profiles/${id}`, playerProfile);
  return response.data;
};

export const getPlayerProfileById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/player-profiles/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePlayerProfileById = async (id: string) => {
  const response = await axios.delete(`/api/player-profiles/${id}`);
  return response.data;
};
