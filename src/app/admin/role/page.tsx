'use client';

import Page from "@/app/components/Page";
import { useRole } from "@/hooks/admin/useRole";
import { useHandleModal } from "@/hooks/useModal";
import { Box, Button, Modal, Table, TableBody, TableCell, TableHead, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const tableHead = [
    {
        id: 'number',
        label: 'No',
    },
    {
        id: 'code',
        label: 'Code',
    },
    {
        id: 'desc',
        label: 'Desc',
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

export default function CategoryPage() {
    const { handleQuery, roles } = useRole();
    const { open, handleOpen, handleClose, selectedId, isEdit } = useHandleModal();

    useEffect(() => {
        handleQuery({});
    }, []);

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
                <Typography variant="h4" >Role report</Typography>
                <Button onClick={() => { handleOpen() }}>Create</Button>
                <Button onClick={() => { handleQuery }}>Refresh</Button>

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
                    {roles.length && roles.map((role, index) => (
                        <TableBody key={index}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{role.code}</TableCell>
                            <TableCell>{role.desc}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleOpen(role.code)}>Edit</Button>
                                <Button>Delete</Button>
                            </TableCell>
                        </TableBody>
                    ))}
                </Table>
            </Box>
            <CategoryModal open={open} handleClose={handleClose} selectedId={selectedId} isEdit={isEdit} />
        </Page>
    );
}

const CategoryModal = ({
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
        code: '',
        desc: '',
    });

    const { handleQuery, roles, createRole, updateRole } = useRole();

    useEffect(() => {
        const getCategoryInfo = async () => {
            if (isEdit && selectedId) {
                await handleQuery({ code: selectedId });
                setFormInput({
                    code: roles[0].code,
                    desc: roles[0].desc,
                });
            }
        };
        getCategoryInfo();
    }, [selectedId]);

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
            updateRole(formInput);
        } else {
            createRole(formInput);
        }
        handleClose();
    };

    return <Modal
        open={open}
        onClose={() => {
            handleClose();
            setFormInput({
                code: '',
                desc: '',
            });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={style}
    >
        <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {isEdit ? 'Edit' : 'Create'} Role
            </Typography>

            <form onSubmit={handleSubmit}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '10px',
                }}>
                    <TextField
                        label="Code"
                        name="code"
                        value={formInput.code}
                        onChange={handleInput}
                    />
                    <TextField
                        label="Desc"
                        name="desc"
                        value={formInput.desc}
                        onChange={handleInput}
                    />
                    <Button variant="contained" type="submit">Submit</Button>
                </Box>
            </form>
        </Box>
    </Modal>
};
