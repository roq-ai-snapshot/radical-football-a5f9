import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getUsers } from 'apiSdk/users';
import { UserInterface } from 'interfaces/user';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';

function UserListPage() {
  const { data, error, isLoading } = useSWR<UserInterface[]>(
    () => '/users',
    () => getUsers(),
  );
  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        User
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Email</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>View</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.email}</Td>
                    <Td>{record.firstName}</Td>
                    <Td>{record.lastName}</Td>
                    <Td>
                      <Link href={`/users/view/${record.id}`} passHref legacyBehavior>
                        <Button as="a">View</Button>
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
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
})(UserListPage);
 */
export default UserListPage;
