import { useState } from "react";

export const useHandleModal = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleOpen = (id?: string) => {
    setOpen(true);
    if (id) {
      setIsEdit(true);
      setSelectedId(id);
    } else {
      setIsEdit(false);
      setSelectedId(null);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setSelectedId(null);
  };

  return {
    open,
    isEdit,
    selectedId,
    handleOpen,
    handleClose,
  };
};
