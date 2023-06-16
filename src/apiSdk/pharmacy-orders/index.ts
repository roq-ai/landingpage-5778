import axios from 'axios';
import queryString from 'query-string';
import { PharmacyOrderInterface, PharmacyOrderGetQueryInterface } from 'interfaces/pharmacy-order';
import { GetQueryInterface } from '../../interfaces';

export const getPharmacyOrders = async (query?: PharmacyOrderGetQueryInterface) => {
  const response = await axios.get(`/api/pharmacy-orders${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPharmacyOrder = async (pharmacyOrder: PharmacyOrderInterface) => {
  const response = await axios.post('/api/pharmacy-orders', pharmacyOrder);
  return response.data;
};

export const updatePharmacyOrderById = async (id: string, pharmacyOrder: PharmacyOrderInterface) => {
  const response = await axios.put(`/api/pharmacy-orders/${id}`, pharmacyOrder);
  return response.data;
};

export const getPharmacyOrderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/pharmacy-orders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePharmacyOrderById = async (id: string) => {
  const response = await axios.delete(`/api/pharmacy-orders/${id}`);
  return response.data;
};
