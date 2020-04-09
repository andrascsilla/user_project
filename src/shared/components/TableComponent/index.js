import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

const StyledTable = styled(Table)`
  td {
    vertical-align: middle;
    cursor: pointer;
  }
`;

function TableComponent({ header, children, ...props }) {
  return (
    <StyledTable striped>
      <thead>
        <tr>
          {header.map(head => (
            <th key={head.id}>{head.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </StyledTable>
  );
}

TableComponent.propTypes = {
  header: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.node.isRequired,
    })
  ),
  children: PropTypes.node,
};

export default TableComponent;
