import * as yup from 'yup';

export const prescriptionValidationSchema = yup.object().shape({
  status: yup.string().required(),
  patient_id: yup.string().nullable(),
  doctor_id: yup.string().nullable(),
});
