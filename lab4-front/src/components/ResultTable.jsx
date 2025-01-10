import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";

const ResultTable = ({
  rows = [],
  columns,
  page,
  totalItems,
  onChangePage,
}) => {
  const handleChangePage = (event, newPage) => {
    onChangePage(event, newPage);
  };

  return (
    <Paper sx={{ bgcolor: "primary.dark", color: "white" }}>
      <TableContainer>
        <Table
          sx={{
            bgcolor: "primary.dark",
            "& th, & td": {
              color: "white",
              borderColor: "white",
            },
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => {
                  let value = row[column.id];
                  if (column.id === "timestamp") {
                    value = new Date(value).toLocaleString();
                  } else if (column.id === "insideArea") {
                    value = value ? "✅" : "❌";
                  }
                  return <TableCell key={column.id}>{value}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{
          color: "white",
        }}
        rowsPerPageOptions={[]}
        component="div"
        count={totalItems}
        rowsPerPage={15}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

export default ResultTable;
