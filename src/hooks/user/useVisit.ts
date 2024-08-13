import { getVisitsAPI } from "@/api/user/visit";
import { useCallback, useState } from "react";

export type IVisit = {
  username: string;
  product_id: string;
  date_time: Date;
};

export const useVisit = () => {
  const [visits, setVisits] = useState<IVisit[]>([]);

  const getVisits = async () => {
    try {
      const response = await getVisitsAPI();
      console.log(response);
      setVisits(response);
    } catch (error) {
      throw error;
    }
  };

  return {
    visits,
    getVisits,
  };
};
