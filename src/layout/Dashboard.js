import React from "react";
import styled from "styled-components";

const DashboardContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <span>Welcome to template application.</span>
    </DashboardContainer>
  );
}

export default Dashboard;
