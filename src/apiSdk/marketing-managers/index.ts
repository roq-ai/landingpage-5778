import axios from 'axios';
import queryString from 'query-string';
import { MarketingManagerInterface, MarketingManagerGetQueryInterface } from 'interfaces/marketing-manager';
import { GetQueryInterface } from '../../interfaces';

export const getMarketingManagers = async (query?: MarketingManagerGetQueryInterface) => {
  const response = await axios.get(`/api/marketing-managers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMarketingManager = async (marketingManager: MarketingManagerInterface) => {
  const response = await axios.post('/api/marketing-managers', marketingManager);
  return response.data;
};

export const updateMarketingManagerById = async (id: string, marketingManager: MarketingManagerInterface) => {
  const response = await axios.put(`/api/marketing-managers/${id}`, marketingManager);
  return response.data;
};

export const getMarketingManagerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/marketing-managers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMarketingManagerById = async (id: string) => {
  const response = await axios.delete(`/api/marketing-managers/${id}`);
  return response.data;
};
