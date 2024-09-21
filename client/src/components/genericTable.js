import React from 'react';
import { Table } from 'react-bootstrap';

const GenericTable = ({ data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{row}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GenericTable;
