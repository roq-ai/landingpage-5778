import { PharmacyOrderInterface } from 'interfaces/pharmacy-order';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PharmacistInterface {
  id?: string;
  name: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  pharmacy_order?: PharmacyOrderInterface[];
  user?: UserInterface;
  _count?: {
    pharmacy_order?: number;
  };
}

export interface PharmacistGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}
