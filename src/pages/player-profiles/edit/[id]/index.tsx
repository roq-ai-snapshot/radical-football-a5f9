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
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getPlayerProfileById, updatePlayerProfileById } from 'apiSdk/player-profiles';
import { Error } from 'components/error';
import { playerProfileValidationSchema } from 'validationSchema/player-profiles';
import { PlayerProfileInterface } from 'interfaces/player-profile';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { getPlayers } from 'apiSdk/players';

function PlayerProfileEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PlayerProfileInterface>(
    () => (id ? `/player-profiles/${id}` : null),
    () => getPlayerProfileById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PlayerProfileInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePlayerProfileById(id, values);
      mutate(updated);
      resetForm();
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PlayerProfileInterface>({
    initialValues: data,
    validationSchema: playerProfileValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Player Profile
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="position" mb="4" isInvalid={!!formik.errors?.position}>
              <FormLabel>position</FormLabel>
              <Input type="text" name="position" value={formik.values?.position} onChange={formik.handleChange} />
              {formik.errors.position && <FormErrorMessage>{formik.errors?.position}</FormErrorMessage>}
            </FormControl>
            <FormControl id="skill_level" mb="4" isInvalid={!!formik.errors?.skill_level}>
              <FormLabel>skill_level</FormLabel>
              <NumberInput
                name="skill_level"
                value={formik.values?.skill_level}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('skill_level', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.skill_level && <FormErrorMessage>{formik.errors?.skill_level}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<PlayerInterface>
              formik={formik}
              name={'player_id'}
              label={'player_id'}
              placeholder={'Select Player'}
              fetcher={getPlayers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.user_id}
                </option>
              )}
            />
            <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
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
  entity: 'player_profile',
  operation: AccessOperationEnum.UPDATE,
})(PlayerProfileEditPage);
