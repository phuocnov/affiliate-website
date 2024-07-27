'use client';

import Page from "@/app/components/Page";
import { useUser } from "@/hooks/admin/useUser";
import { Box, Button, Table, TableBody, TableCell, TableHead, Typography } from "@mui/material";

const tableHead = [
  {
    id: 'username',
    label: 'Username',
  },
  {
    id: 'password',
    label: 'Password',
  },
  {
    id: 'action',
    label: 'Action',
  },
];

export default function UserPage() {
  const { users, fetchUsers } = useUser();

  return (
    <Page title="Admin user">

      <Box sx={
        {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
          borderBottom: '1px solid #000',
          width: '100%'
        }
      }>
        <Typography variant="h4" >User</Typography>
        <Button onClick={fetchUsers}>Refresh</Button>
      </Box>
      <Box>
        <Table>
          <TableHead>
            {tableHead.map((headCell) => (
              <TableCell
                key={headCell.id}
                align="center"
              >
                {headCell.label}
              </TableCell>
            ))}
          </TableHead>
          {users.map((user) => (
            <TableBody key={user.username}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </TableCell>
            </TableBody>
          ))}
        </Table>
      </Box>
    </Page>
  );
}
