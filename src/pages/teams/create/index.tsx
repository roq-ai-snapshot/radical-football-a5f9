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
import { createTeam } from 'apiSdk/teams';
import { Error } from 'components/error';
import { teamValidationSchema } from 'validationSchema/teams';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { AcademyInterface } from 'interfaces/academy';
import { getUsers } from 'apiSdk/users';
import { UserInterface } from 'interfaces/user';
import { getAcademies } from 'apiSdk/academies';
import { TeamInterface } from 'interfaces/team';

function TeamCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TeamInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTeam(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TeamInterface>({
    initialValues: {
      name: '',
      academy_id: (router.query.academy_id as string) ?? null,
      coach: [],
      event: [],
      player: [],
    },
    validationSchema: teamValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Team
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<AcademyInterface>
            formik={formik}
            name={'academy_id'}
            label={'academy_id'}
            placeholder={'Select Academy'}
            fetcher={getAcademies}
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
  entity: 'team',
  operation: AccessOperationEnum.CREATE,
})(TeamCreatePage);
