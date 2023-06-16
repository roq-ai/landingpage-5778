import { PharmacyOrderInterface } from 'interfaces/pharmacy-order';
import { PatientInterface } from 'interfaces/patient';
import { DoctorInterface } from 'interfaces/doctor';
import { GetQueryInterface } from 'interfaces';

export interface PrescriptionInterface {
  id?: string;
  patient_id?: string;
  doctor_id?: string;
  status: string;
  created_at?: any;
  updated_at?: any;
  pharmacy_order?: PharmacyOrderInterface[];
  patient?: PatientInterface;
  doctor?: DoctorInterface;
  _count?: {
    pharmacy_order?: number;
  };
}

export interface PrescriptionGetQueryInterface extends GetQueryInterface {
  id?: string;
  patient_id?: string;
  doctor_id?: string;
  status?: string;
}
