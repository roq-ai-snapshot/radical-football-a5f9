import axios from 'axios';
import queryString from 'query-string';
import { CoachInterface } from 'interfaces/coach';
import { GetQueryInterface } from '../../interfaces';

export const getCoaches = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/coaches${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCoach = async (coach: CoachInterface) => {
  const response = await axios.post('/api/coaches', coach);
  return response.data;
};

export const updateCoachById = async (id: string, coach: CoachInterface) => {
  const response = await axios.put(`/api/coaches/${id}`, coach);
  return response.data;
};

export const getCoachById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/coaches/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCoachById = async (id: string) => {
  const response = await axios.delete(`/api/coaches/${id}`);
  return response.data;
};
