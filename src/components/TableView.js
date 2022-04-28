import React, { useState } from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const TableContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const NoDataError = styled.span`
  width: 100%;
  text-align: center;
  color: red;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Row = styled.tr`
  border: 1px solid black;
  text-align: center;
  background-color: ${(props) => (props.isSelected ? "yellow" : "white")};
`;

const Column = styled.th`
  border: 1px solid black;
  text-align: center;
`;

function TableView(props) {
  const { data, onSelection, selected } = props;

  return (
    <TableContainer>
      {data && data.length ? (
        <Table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <Row
                key={item.id}
                onClick={() => {
                  if (onSelection) {
                    onSelection(item);
                  }
                }}
                isSelected={selected && selected.id === item.id}
              >
                <Column>{item.firstName}</Column>
                <Column>{item.lastName}</Column>
                <Column>{item.profile}</Column>
              </Row>
            ))}
          </tbody>
        </Table>
      ) : (
        <NoDataError>No data found.</NoDataError>
      )}
    </TableContainer>
  );
}

TableView.defaultProps = {
  onSelection: null,
  data: [],
  selected: null,
};
TableView.propTypes = {
  onSelection: propTypes.func,
  data: propTypes.array,
  selected: propTypes.shape({})
};

export default TableView;
