import axios from 'axios';
import queryString from 'query-string';
import { TrainingPlanInterface } from 'interfaces/training-plan';
import { GetQueryInterface } from '../../interfaces';

export const getTrainingPlans = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/training-plans${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTrainingPlan = async (trainingPlan: TrainingPlanInterface) => {
  const response = await axios.post('/api/training-plans', trainingPlan);
  return response.data;
};

export const updateTrainingPlanById = async (id: string, trainingPlan: TrainingPlanInterface) => {
  const response = await axios.put(`/api/training-plans/${id}`, trainingPlan);
  return response.data;
};

export const getTrainingPlanById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/training-plans/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTrainingPlanById = async (id: string) => {
  const response = await axios.delete(`/api/training-plans/${id}`);
  return response.data;
};
