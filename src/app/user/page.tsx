"use client";
import { useVisit } from "@/hooks/user/useVisit";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

const tableHead = [
  {
    id: "number",
    label: "No",
  },
  {
    id: "date",
    label: "Date",
  },
  {
    id: "product",
    label: "Product name",
  },
];

const UserPage = () => {
  const { visits, getVisits } = useVisit();

  useEffect(() => {
    getVisits();
  }, []);

  return (
    <Box>
      <Typography>Visits</Typography>
      <Table>
        <TableHead>
          {tableHead.map((headCell) => (
            <TableCell key={headCell.id} align="center">
              {headCell.label}
            </TableCell>
          ))}
        </TableHead>
        {visits.length &&
          visits.map((visit, index) => (
            <TableBody key={index}>
              <TableCell>{index}</TableCell>
              <TableCell>{visit.date_time.toString()}</TableCell>
              <TableCell>{visit.product_id}</TableCell>
            </TableBody>
          ))}
      </Table>
    </Box>
  );
};

export default UserPage;
