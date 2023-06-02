import AppLayout from 'layout/app-layout';
import React from 'react';
import Link from 'next/link';
import { Text, Box, Spinner } from '@chakra-ui/react';
import { getUserById } from 'apiSdk/users';
import { Error } from 'components/error';
import { UserInterface } from 'interfaces/user';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';

function UserViewPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading } = useSWR<UserInterface>(
    () => (id ? `/users/${id}` : null),
    () => getUserById(id),
  );
  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        User Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              Email: {data?.email}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              First Name: {data?.firstName}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Last Name: {data?.lastName}
            </Text>

            <Text fontSize="md" fontWeight="bold">
              <Link href={`/teams/view/${data?.coach?.[0]?.team?.id}`}>
                coach of team: {data?.coach?.[0]?.team?.name}
              </Link>
            </Text>
          </>
        )}
      </Box>
    </AppLayout>
  );
}
/*
export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: "user",
  operation: AccessOperationEnum.READ,
})(UserViewPage);*/

export default UserViewPage;
