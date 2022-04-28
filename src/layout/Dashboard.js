import React, { useState } from "react";
import TableView from "../components/TableView";
import styled from "styled-components";

const DashboardContainer = styled.div`
  width: 100vw;
  height: 100vh;
  align-items: center;
`;

const TableContainer = styled.div`
  height: 50vh;
  padding: 15px;
`;

const FormContainer = styled.div`
  height: 50vh;
  padding: 15px;
`;

const ButtonContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: end;
  align-items: right;
`;

const Button = styled.input`
  margin-left: 15px;
`;

const PROFILES = ["C", "C++", "C#", "JAVA", "JAVASCRIPT", "PHP"];

function Dashboard() {
  const [list, setList] = useState([
    {
      id: "1",
      firstName: "Hünkar",
      lastName: "Purtul",
      profile: "JAVASCRIPT",
    },
  ]);
  const [selected, setSelected] = useState({});

  const onValueChange = (event) => {
    const { target } = event;

    const tempSelected = selected || {};
    tempSelected[target.id] = target.value;

    setSelected(tempSelected);
  };

  const onSave = () => {
    if (!selected.id) {
      setList([
        ...list,
        {
          id: String(Date.now()),
          profile: PROFILES[0],
          ...selected,
        },
      ]);
    } else {
      setList(list.map((item) => (item.id === selected.id ? selected : item)));
    }
  };

  const createData = () => {
    const tempData = {
      id: String(Date.now()),
      firstName: `name-${list.length}`,
      lastName: `name-${list.length}`,
      profile: PROFILES[0],
    };

    setList([...list, tempData]);
    setSelected(tempData);
  };

  const deleteData = () => {
    setList(list.filter((item) => item.id !== selected.id));
    setSelected({});
  };

  return (
    <DashboardContainer>
      <TableContainer>
        <TableView
          data={list}
          selected={selected}
          onSelection={(selectedData) => {
            setSelected(selectedData);
          }}
        ></TableView>
        <ButtonContainer>
          <Button type={"button"} value={"Create"} onClick={createData} />
          <Button type={"button"} value={"Delete"} onClick={deleteData} />
        </ButtonContainer>
      </TableContainer>
      <FormContainer>
        <div>
          <span>First Name</span>
          <input
            type={"text"}
            value={selected.firstName}
            id="firstName"
            onChange={onValueChange}
          />
        </div>
        <div>
          <span>Last Name</span>
          <input
            type={"text"}
            value={selected.lastName}
            id="lastName"
            onChange={onValueChange}
          />
        </div>
        <div>
          <span>Profile</span>
          <select
            id="profile"
            onChange={onValueChange}
            value={selected.profile}
          >
            {PROFILES.map((item, index) => (
              <option key={String(index)}>{item}</option>
            ))}
          </select>
        </div>
        <ButtonContainer>
          <Button type={"button"} value={"Save"} onClick={onSave} />
        </ButtonContainer>
      </FormContainer>
    </DashboardContainer>
  );
}

export default Dashboard;
