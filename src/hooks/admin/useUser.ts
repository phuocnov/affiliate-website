import {
  createUserAPI,
  deleteUserAPI,
  getUserListAPI,
  updateUserAPI,
} from "@/api/admin/user";
import { IUser } from "@/types/user";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetchUsers({});
  }, []);

  const fetchUsers = async ({ username }: { username?: string }) => {
    try {
      const data = await getUserListAPI({ username });
      setUsers(data);
    } catch (error) {
      setUsers([]);
    }
  };

  const createUser = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      createUserAPI({
        username: username,
        password: password,
      });
      fetchUsers({});
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async ({
    username,
    password,
    role,
  }: {
    username: string;
    password: string;
    role: string;
  }) => {
    try {
      updateUserAPI({
        username: username,
        password: password,
        role: role,
      });
      fetchUsers({});
    } catch (error) {
      throw error;
    }
  };

  const deleteUser = async (username: string) => {
    try {
      await deleteUserAPI(username);
      fetchUsers({});
    } catch (error) {
      throw error;
    }
  };

  return { users, fetchUsers, createUser, updateUser, deleteUser };
};
