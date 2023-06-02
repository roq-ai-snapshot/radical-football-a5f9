import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import { UserSelect } from 'components/user-select';
import { getPlayerProfileById } from 'apiSdk/player-profiles';
import { Error } from 'components/error';
import { PlayerProfileInterface } from 'interfaces/player-profile';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function PlayerProfileViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PlayerProfileInterface>(
    () => (id ? `/player-profiles/${id}` : null),
    () =>
      getPlayerProfileById(id, {
        relations: ['player'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Player Profile Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              position: {data?.position}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              skill_level: {data?.skill_level}
            </Text>
            {hasAccess('player', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <Text fontSize="md" fontWeight="bold">
                player: <Link href={`/players/view/${data?.player?.id}`}>{data?.player?.user_id}</Link>
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
  entity: 'player_profile',
  operation: AccessOperationEnum.READ,
})(PlayerProfileViewPage);
