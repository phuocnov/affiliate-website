'use client';

import Page from "@/app/components/Page";
import { useRole } from "@/hooks/admin/useRole";
import { useUser } from "@/hooks/admin/useUser";
import { useHandleModal } from "@/hooks/useModal";
import { IUser } from "@/types";
import { Box, Button, MenuItem, Modal, Table, TableBody, TableCell, TableHead, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: 400,
  backgroudColor: 'white',
  p: 4,
};


export default function UserPage() {
  const { users, fetchUsers } = useUser();
  const { open, handleOpen, handleClose, selectedId, isEdit } = useHandleModal();
  useEffect(() => {
    fetchUsers({});
  }, []);

  return (
    <Page title="Admin user">
      <UserModal
        open={open}
        handleClose={handleClose}
        selectedId={selectedId}
        isEdit={isEdit}
      />

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
        <Button onClick={() => {
          handleOpen();
        }}>Create</Button>
        <Button onClick={() => fetchUsers({})}>Refresh</Button>
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
                <Button onClick={() => handleOpen(user.username)}>Edit</Button>
                <Button>Delete</Button>
              </TableCell>
            </TableBody>
          ))}
        </Table>
      </Box>
    </Page>
  );
}

const UserModal = ({
  open,
  handleClose,
  selectedId,
  isEdit
}: {
  open: boolean;
  handleClose: () => void;
  selectedId: string | null;
  isEdit: boolean;
}) => {
  const [formInput, setFormInput] = useState({
    username: '',
    password: '',
    role: '',
  });

  const { users, createUser, updateUser, fetchUsers } = useUser();
  const { roles, handleQuery } = useRole();

  useEffect(() => {
    const getUser = async () => {
      await fetchUsers({ username: selectedId?.toString() });
      setFormInput({
        username: users[0].username,
        password: users[0].password,
        role: users[0].role,
      });
    }
    if (isEdit) {
      getUser();
    }
  }, [selectedId]);

  useEffect(() => {
    handleQuery({});
  }, []);

  const handleInput: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (isEdit) {
      updateUser(formInput);
    } else {
      createUser(formInput);
    }
    handleClose();
  };

  return <Modal
    open={open}
    onClose={() => {
      setFormInput({
        username: '',
        password: '',
        role: '',
      });
      handleClose();
    }}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    sx={style}
  >
    <Box sx={{
      backgroundColor: 'white',
    }}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {'Create'} User
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '10px',
        }}>
          <TextField
            label="Username"
            name="username"
            value={formInput.username}
            disabled
            onChange={handleInput}
          />
          <TextField
            label="Password"
            name="password"
            value={formInput.password}
            onChange={handleInput}
          />
          <TextField
            select
            label="Role"
            name="role"
            value={formInput.role}
            onChange={(evt) => {
              setFormInput(prevState => ({
                ...prevState,
                role: evt.target.value
              }));
            }}
          >
            {
              roles.map((role) => (
                <MenuItem key={role.code} value={role.code}>{role.code}</MenuItem>
              ))
            }
          </TextField>
          <Button variant="contained" type="submit">Submit</Button>
        </Box>
      </form>
    </Box >
  </Modal >
};