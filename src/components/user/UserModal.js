import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  closeUserAddModal,
  saveActiveUser,
  updateActiveUser,
} from "../../store/reducers/users";
import { ActionButton } from "./UserList";

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  z-index: 9999999;
  top: 0px;
  left: 0px;
  background-color: #00000080;
  align-items: center;
`;

const ModalContentContainer = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 10px;
  border: black 5px solid;
  border-radius: 15px;
`;

const Form = styled.div`
  height: fit-content;
  width: 100%;
`;

const FormItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const CloseButton = styled(ActionButton)`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: red;
`;

const SubmitButton = styled(ActionButton)`
  width: 100%;
  top: 5px;
  right: 5px;
  background-color: green;
`;

const DEPARTMENT = "department";
const NAME = "name";
const SKILLS = "skills";
const SURNAME = "surname";

function UserList() {
  const activeUser = useSelector((state) => state.users.activeUser);
  const isReadonly = useSelector((state) => state.users.isReadonly);

  const dispatch = useDispatch();

  const _onChange = (field) => (e) => {
    dispatch(updateActiveUser({ [field]: e.target.value }));
  };

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <Modal>
      <ModalContentContainer>
        <CloseButton
          role="button-close-modal"
          onClick={() => {
            dispatch(closeUserAddModal());
          }}
        >
          X
        </CloseButton>
        <Form>
          {[NAME, SURNAME, DEPARTMENT].map((field) => {
            return (
              <FormItem key={field}>
                <label>{capitalizeFirstLetter(field)}: </label>
                <input
                  readOnly={isReadonly}
                  type="text"
                  role={`input-${field}`}
                  value={activeUser[field]}
                  onChange={_onChange(field)}
                />
              </FormItem>
            );
          })}
          <FormItem>
            <label>Skills: </label>
            <input
              readOnly={isReadonly}
              type="text"
              role={"input-skills"}
              value={activeUser[SKILLS]}
              onChange={(e) => {
                dispatch(
                  updateActiveUser({ [SKILLS]: e.target.value.split(",") })
                );
              }}
            />
          </FormItem>

          {!isReadonly && (
            <SubmitButton
              role={"submit-user"}
              onClick={() => {
                dispatch(saveActiveUser());
              }}
            >
              Save
            </SubmitButton>
          )}
        </Form>
      </ModalContentContainer>
    </Modal>
  );
}

export default UserList;
