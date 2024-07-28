import {
  createRoleAPI,
  deleteRoleAPI,
  getRoleListAPI,
  updateRoleAPI,
} from "@/api/admin/role";
import { IRole } from "@/types";
import { useEffect, useState } from "react";

export const useRole = () => {
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    handleQuery({});
  }, []);

  const handleQuery = async (query: { code?: string }) => {
    try {
      const data = await getRoleListAPI(query);
      setRoles(data);
    } catch (error) {
      setRoles([]);
    }
  };

  const createRole = async (role: IRole) => {
    try {
      await createRoleAPI(role);
      await handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  const updateRole = async (role: IRole) => {
    try {
      await updateRoleAPI(role);
      await handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  const deleteRole = async (code: string) => {
    try {
      await deleteRoleAPI(code);
      await handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  return {
    roles,
    handleQuery,
    createRole,
    updateRole,
    deleteRole,
  };
};
