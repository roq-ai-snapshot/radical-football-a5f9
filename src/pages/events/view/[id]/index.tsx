import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import { UserSelect } from 'components/user-select';
import { getEventById } from 'apiSdk/events';
import { Error } from 'components/error';
import { EventInterface } from 'interfaces/event';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function EventViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<EventInterface>(
    () => (id ? `/events/${id}` : null),
    () =>
      getEventById(id, {
        relations: ['team'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Event Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              name: {data?.name}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              start_time: {data?.start_time as unknown as string}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              end_time: {data?.end_time as unknown as string}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              location: {data?.location}
            </Text>
            {hasAccess('team', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <Text fontSize="md" fontWeight="bold">
                team: <Link href={`/teams/view/${data?.team?.id}`}>{data?.team?.name}</Link>
              </Text>
            )}
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'event',
  operation: AccessOperationEnum.READ,
})(EventViewPage);
