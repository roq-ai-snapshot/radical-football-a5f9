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
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createEvent } from 'apiSdk/events';
import { Error } from 'components/error';
import { eventValidationSchema } from 'validationSchema/events';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { TeamInterface } from 'interfaces/team';
import { getTeams } from 'apiSdk/teams';
import { EventInterface } from 'interfaces/event';

function EventCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: EventInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createEvent(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<EventInterface>({
    initialValues: {
      name: '',
      start_time: new Date(new Date().toDateString()),
      end_time: new Date(new Date().toDateString()),
      location: '',
      team_id: (router.query.team_id as string) ?? null,
    },
    validationSchema: eventValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Event
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="start_time" mb="4">
            <FormLabel>start_time</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.start_time}
              onChange={(value: Date) => formik.setFieldValue('start_time', value)}
            />
          </FormControl>
          <FormControl id="end_time" mb="4">
            <FormLabel>end_time</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.end_time}
              onChange={(value: Date) => formik.setFieldValue('end_time', value)}
            />
          </FormControl>
          <FormControl id="location" mb="4" isInvalid={!!formik.errors?.location}>
            <FormLabel>location</FormLabel>
            <Input type="text" name="location" value={formik.values?.location} onChange={formik.handleChange} />
            {formik.errors.location && <FormErrorMessage>{formik.errors?.location}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<TeamInterface>
            formik={formik}
            name={'team_id'}
            label={'team_id'}
            placeholder={'Select Team'}
            fetcher={getTeams}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'event',
  operation: AccessOperationEnum.CREATE,
})(EventCreatePage);
