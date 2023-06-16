import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getPharmacyOrderById, updatePharmacyOrderById } from 'apiSdk/pharmacy-orders';
import { Error } from 'components/error';
import { pharmacyOrderValidationSchema } from 'validationSchema/pharmacy-orders';
import { PharmacyOrderInterface } from 'interfaces/pharmacy-order';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PrescriptionInterface } from 'interfaces/prescription';
import { PharmacistInterface } from 'interfaces/pharmacist';
import { getPrescriptions } from 'apiSdk/prescriptions';
import { getPharmacists } from 'apiSdk/pharmacists';

function PharmacyOrderEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PharmacyOrderInterface>(
    () => (id ? `/pharmacy-orders/${id}` : null),
    () => getPharmacyOrderById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PharmacyOrderInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePharmacyOrderById(id, values);
      mutate(updated);
      resetForm();
      router.push('/pharmacy-orders');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PharmacyOrderInterface>({
    initialValues: data,
    validationSchema: pharmacyOrderValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Pharmacy Order
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
              <FormLabel>Status</FormLabel>
              <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
              {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<PrescriptionInterface>
              formik={formik}
              name={'prescription_id'}
              label={'Select Prescription'}
              placeholder={'Select Prescription'}
              fetcher={getPrescriptions}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.status}
                </option>
              )}
            />
            <AsyncSelect<PharmacistInterface>
              formik={formik}
              name={'pharmacist_id'}
              label={'Select Pharmacist'}
              placeholder={'Select Pharmacist'}
              fetcher={getPharmacists}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'pharmacy_order',
  operation: AccessOperationEnum.UPDATE,
})(PharmacyOrderEditPage);
