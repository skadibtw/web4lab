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

const ResultTable = ({ rows, columns }) => {
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
            {rows.slice(page * 15, page * 15 + 15).map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.id}>{row[column.id]}</TableCell>
                ))}
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
        count={rows.length}
        rowsPerPage={15}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

export default ResultTable;
