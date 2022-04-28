import React, { useEffect, useState } from "react";
import C3Chart from "react-c3js";
import "c3/c3.css";
import styled from "styled-components";
import propTypes from "prop-types";

const GraphicComponentContainer = styled.div`
  padding: 30px;
  width: 750px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
`;
const GraphicComponentTitle = styled.div`
  width: 100%;
  text-align: center;
`;
const NoDataError = styled.span`
  width: 100%;
  text-align: center;
  color: red;
`;

function Graphic(props) {
  const { title, data } = props;

  const [graphicData, setGraphicData] = useState(null);

  /**
   * Format data for c3 chart and set to graphicData
   */
  useEffect(() => {
    if (data && data.length) {
      setGraphicData({
        x: "x",
        columns: [
          ["x", ...data.map((item) => item.date)],
          ["ms", ...data.map((item) => item.value.toFixed(2))],
        ],
        labels: {
          format: (v) => v,
        },
      });
    }
  }, [data]);

  const axis = {
    x: {
      type: "timeseries",
      tick: {
        format: "%Y-%m-%d %H:%M",
        rotate: 45,
        multiline: false,
        centered: true,
      },
    },
  };

  return (
    <GraphicComponentContainer>
      <GraphicComponentTitle>{title}</GraphicComponentTitle>
      {graphicData ? (
        <C3Chart padding={{ right: 50 }} data={graphicData} axis={axis} />
      ) : (
        <NoDataError>There is no data available.</NoDataError>
      )}
    </GraphicComponentContainer>
  );
}

Graphic.defaultProps = {
  title: "Graphic",
  data: null,
};
Graphic.propTypes = {
  title: propTypes.string,
  data: propTypes.array,
};

export default Graphic;
