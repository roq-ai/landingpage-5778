import axios from 'axios';
import queryString from 'query-string';
import { PharmacistInterface, PharmacistGetQueryInterface } from 'interfaces/pharmacist';
import { GetQueryInterface } from '../../interfaces';

export const getPharmacists = async (query?: PharmacistGetQueryInterface) => {
  const response = await axios.get(`/api/pharmacists${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPharmacist = async (pharmacist: PharmacistInterface) => {
  const response = await axios.post('/api/pharmacists', pharmacist);
  return response.data;
};

export const updatePharmacistById = async (id: string, pharmacist: PharmacistInterface) => {
  const response = await axios.put(`/api/pharmacists/${id}`, pharmacist);
  return response.data;
};

export const getPharmacistById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/pharmacists/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePharmacistById = async (id: string) => {
  const response = await axios.delete(`/api/pharmacists/${id}`);
  return response.data;
};
