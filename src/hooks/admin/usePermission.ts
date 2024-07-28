import {
  createPermissionAPI,
  deletePermissionAPI,
  getPermissionListAPI,
  updatePermissionAPI,
} from "@/api/admin/permission";
import { IPermission } from "@/types";
import { useEffect, useState } from "react";

export const usePermission = () => {
  const [permissions, setPermissions] = useState<IPermission[]>([]);

  useEffect(() => {
    handleQuery({});
  }, []);

  const handleQuery = async (query: { code?: string }) => {
    try {
      const data = await getPermissionListAPI(query);
      setPermissions(data);
    } catch (error) {
      setPermissions([]);
    }
  };

  const createPermission = async (permission: IPermission) => {
    try {
      await createPermissionAPI(permission);
      await handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  const updatePermission = async (permission: IPermission) => {
    try {
      await updatePermissionAPI(permission);
      await handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  const deletePermission = async (code: string) => {
    try {
      await deletePermissionAPI(code);
      await handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  return {
    permissions,
    handleQuery,
    createPermission,
    updatePermission,
    deletePermission,
  };
};
