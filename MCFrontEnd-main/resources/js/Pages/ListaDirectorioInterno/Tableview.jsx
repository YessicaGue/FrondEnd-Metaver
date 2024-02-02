import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TablaView = ({ usuarios }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Tabla Directorio Interno">
        <TableHead>
          <TableRow>
            <TableCell><b>ÓRGANOS DE DIRECCIÓN</b></TableCell>
            <TableCell><b>DIRIGENTE</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((fila, index) => (
            <TableRow key={index}>
              <TableCell>{fila.organo}</TableCell>
              <TableCell>{fila.dirigente}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaView;
