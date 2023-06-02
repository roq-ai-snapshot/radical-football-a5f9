import axios from 'axios';
import queryString from 'query-string';
import { AcademyInterface } from 'interfaces/academy';
import { GetQueryInterface } from '../../interfaces';

export const getAcademies = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/academies${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAcademy = async (academy: AcademyInterface) => {
  const response = await axios.post('/api/academies', academy);
  return response.data;
};

export const updateAcademyById = async (id: string, academy: AcademyInterface) => {
  const response = await axios.put(`/api/academies/${id}`, academy);
  return response.data;
};

export const getAcademyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/academies/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAcademyById = async (id: string) => {
  const response = await axios.delete(`/api/academies/${id}`);
  return response.data;
};
