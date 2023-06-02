import axios from 'axios';
import queryString from 'query-string';
import { TeamInterface } from 'interfaces/team';
import { GetQueryInterface } from '../../interfaces';

export const getTeams = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/teams${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTeam = async (team: TeamInterface) => {
  const response = await axios.post('/api/teams', team);
  return response.data;
};

export const updateTeamById = async (id: string, team: TeamInterface) => {
  const response = await axios.put(`/api/teams/${id}`, team);
  return response.data;
};

export const getTeamById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/teams/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTeamById = async (id: string) => {
  const response = await axios.delete(`/api/teams/${id}`);
  return response.data;
};
