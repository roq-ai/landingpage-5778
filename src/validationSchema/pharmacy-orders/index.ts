import * as yup from 'yup';

export const pharmacyOrderValidationSchema = yup.object().shape({
  status: yup.string().required(),
  prescription_id: yup.string().nullable(),
  pharmacist_id: yup.string().nullable(),
});
