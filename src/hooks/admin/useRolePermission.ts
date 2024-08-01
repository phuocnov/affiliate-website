import {
  createRolePermissionAPI,
  deleteRolePermissionAPI,
  getRolePermissionListAPI,
  updateRolePermissionAPI,
} from "@/api/admin/rolePermission";
import { IRolePermission } from "@/types";
import { useEffect, useState } from "react";

export const useRolePermission = () => {
  const [rolePermissions, setRolePermissions] = useState<IRolePermission[]>([]);

  useEffect(() => {
    handleQuery({});
  }, []);

  const handleQuery = async (query: {
    role_code?: string;
    permission_code?: string;
  }) => {
    try {
      const data = await getRolePermissionListAPI(query as IRolePermission);
      setRolePermissions(data);
    } catch (error) {
      setRolePermissions([]);
    }
  };

  const createRolePermission = async (rolePermission: IRolePermission) => {
    try {
      await createRolePermissionAPI(rolePermission);
      await handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  const updateRolePermission = async (rolePermission: IRolePermission) => {
    try {
      await updateRolePermissionAPI(rolePermission);
      await handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  const deleteRolePermission = async (code: string) => {
    try {
      await deleteRolePermissionAPI(code);
      await handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  return {
    rolePermissions,
    handleQuery,
    createRolePermission,
    updateRolePermission,
    deleteRolePermission,
  };
};
