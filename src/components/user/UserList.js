import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  showUserUpdateModal,
  showUserDetailModal,
  deleteUser,
} from "../../store/reducers/users";

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const UserRow = styled.tr`
  text-align: center;

  :hover {
    background-color: #ddd;
  }

  :nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const HeaderCell = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
  text-align: center;
`;

const BodyCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const ButtonContainer = styled.td`
  display: flex;
  justify-content: center;
`;

export const ActionButton = styled.button`
  font-weight: bold;
  font-size: 20px;
  margin: 5px;
  padding: 5px;
  color: white;
  border-radius: 10px;
  border: gray 2px solid;
  cursor: pointer;
`;

const DetailButton = styled(ActionButton)`
  background-color: deepskyblue;
  border: gray 2px solid;
`;

const UpdateButton = styled(ActionButton)`
  background-color: darkorange;
`;

const DeleteButton = styled(ActionButton)`
  background-color: red;
  border: gray 2px solid;
`;

function UserList() {
  const users = useSelector((state) => state.users.userList);
  const dispatch = useDispatch();

  return (
    <UserTable>
      <thead>
        <HeaderCell>Id</HeaderCell>
        <HeaderCell>Name</HeaderCell>
        <HeaderCell>Surname</HeaderCell>
        <HeaderCell>Department</HeaderCell>
        <HeaderCell>Skills</HeaderCell>
        <HeaderCell></HeaderCell>
      </thead>
      <tbody>
        {(users || []).map(({ id, name, surname, department, skills = [] }) => {
          return (
            <UserRow>
              <BodyCell>{id}</BodyCell>
              <BodyCell>{name}</BodyCell>
              <BodyCell>{surname}</BodyCell>
              <BodyCell>{department}</BodyCell>
              <BodyCell>{skills.join(",")}</BodyCell>
              <BodyCell>
                <ButtonContainer>
                  <DetailButton
                    onClick={() => {
                      dispatch(showUserDetailModal(id));
                    }}
                  >
                    Detail
                  </DetailButton>
                  <UpdateButton
                    onClick={() => {
                      dispatch(showUserUpdateModal(id));
                    }}
                  >
                    Update
                  </UpdateButton>
                  <DeleteButton
                    onClick={() => {
                      dispatch(deleteUser(id));
                    }}
                  >
                    Delete
                  </DeleteButton>
                </ButtonContainer>
              </BodyCell>
            </UserRow>
          );
        })}
      </tbody>
    </UserTable>
  );
}

export default UserList;
