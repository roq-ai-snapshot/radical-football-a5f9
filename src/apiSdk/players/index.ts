import axios from 'axios';
import queryString from 'query-string';
import { PlayerInterface } from 'interfaces/player';
import { GetQueryInterface } from '../../interfaces';

export const getPlayers = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/players${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPlayer = async (player: PlayerInterface) => {
  const response = await axios.post('/api/players', player);
  return response.data;
};

export const updatePlayerById = async (id: string, player: PlayerInterface) => {
  const response = await axios.put(`/api/players/${id}`, player);
  return response.data;
};

export const getPlayerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/players/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePlayerById = async (id: string) => {
  const response = await axios.delete(`/api/players/${id}`);
  return response.data;
};
