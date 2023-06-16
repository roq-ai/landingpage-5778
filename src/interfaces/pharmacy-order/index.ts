import { PrescriptionInterface } from 'interfaces/prescription';
import { PharmacistInterface } from 'interfaces/pharmacist';
import { GetQueryInterface } from 'interfaces';

export interface PharmacyOrderInterface {
  id?: string;
  prescription_id?: string;
  pharmacist_id?: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  prescription?: PrescriptionInterface;
  pharmacist?: PharmacistInterface;
  _count?: {};
}

export interface PharmacyOrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  prescription_id?: string;
  pharmacist_id?: string;
  status?: string;
}
