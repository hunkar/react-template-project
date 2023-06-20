import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import UserList, { UserModal } from "../components/user";
import { showUserAddModal } from "../store/reducers/users";
import { ActionButton } from "../components/user/UserList";

const ListContainer = styled.div`
  max-height: 80vh;
  display: flex;
  row-gap: 10px;
  column-gap: 10px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  font-size: 25px;
  font-weight: bold;
  overflow-y: auto;
  padding: 15px;
  flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const AddButton = styled(ActionButton)`
  margin-right: 20px;
  background-color: green;
`;

const Title = styled.h1`
  margin-left: 20px;
`;

const Warning = styled.h3`
  background-color: #ff0000;
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  opacity: 0.5;
  width: 100%;
`;

function UserLayout() {
  const userList = useSelector((state) => state.users.userList);
  const activeUser = useSelector((state) => state.users.activeUser);

  const dispatch = useDispatch();

  return (
    <>
      <Title>Users</Title>
      <ButtonContainer>
        <AddButton
          role="button-new-user"
          onClick={() => dispatch(showUserAddModal())}
        >
          New User
        </AddButton>
      </ButtonContainer>
      <>
        <ListContainer>
          {userList?.length ? (
            <UserList />
          ) : (
            <Warning>There is no user!</Warning>
          )}
          {activeUser && <UserModal />}
        </ListContainer>
      </>
    </>
  );
}

export default UserLayout;
