import React, { useState } from "react";
import { scaleTime, scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { Group } from "@visx/group";
import { curveMonotoneX } from "@visx/curve";
import { extent, max, bisector } from "d3-array";
import { Tooltip, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import monthlyData from "./data/monthly_emojis.json"; // Adjust the path as necessary

const tooltipStyles = {
  ...defaultStyles,
  background: "none",
  color: "#e7e7e7",
  zIndex: 10,
  boxShadow: "none",
};

const parseMonthDate = (monthDate) => {
  const [year, month] = monthDate.split("-");
  return new Date(Date.parse(`${month} 1, ${year}`));
};

const getCompleteData = (data, startDate, endDate) => {
  const parsedData = Object.entries(data)
    .map(([key, value]) => ({
      date: parseMonthDate(key),
      value: value,
    }))
    .sort((a, b) => a.date - b.date);

  const completeData = [];
  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setMonth(date.getMonth() + 1)
  ) {
    const existing = parsedData.find(
      (d) => d.date.getTime() === date.getTime()
    );
    if (existing) {
      completeData.push(existing);
    } else {
      completeData.push({ date: new Date(date), value: 0 });
    }
  }

  return completeData;
};

const bisectDate = bisector((d) => d.date).left;

const CurveGraph = ({ emoji }) => {
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipLeft, setTooltipLeft] = useState(0);

  const data = monthlyData[emoji];
  if (!data) {
    return <div>אין לנו נתונים {emoji}</div>;
  }

  const startDate = new Date(2023, 0, 1); // January 2023
  const endDate = new Date(2024, 4, 1); // May 2024
  const parsedData = getCompleteData(data, startDate, endDate);

  const width = window.innerWidth * 0.27;
  const height = 150;
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };

  const xScale = scaleTime({
    domain: [startDate, endDate].reverse(), // Reverse the domain
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLinear({
    domain: [0, max(parsedData, (d) => d.value)],
    range: [height - margin.bottom, margin.top],
  });

  const handleTooltip = (event) => {
    const { x } = localPoint(event) || { x: 0 };
    const x0 = xScale.invert(x);
    const index = bisectDate(parsedData, x0, 1);
    const d0 = parsedData[index - 1];
    const d1 = parsedData[index];
    let d = d0;
    if (d1 && d1.date) {
      d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    }
    setTooltipData(d);
    setTooltipLeft(xScale(d.date));
  };

  const formatTooltipDate = (date) => {
    const month = date.toLocaleString("he-IL", { month: "long" });
    const year = date.getFullYear().toString().slice(-2);
    return `${month} ${year}'`;
  };

  return (
    <>
      <svg width={width} height={height}>
        <rect
          width={width}
          height={height}
          fill='transparent'
          onMouseMove={handleTooltip}
          onMouseLeave={() => setTooltipData(null)}
        />
        <Group left={0} top={0}>
          <LinePath
            data={parsedData}
            x={(d) => xScale(d.date)}
            y={(d) => yScale(d.value)}
            stroke='white'
            strokeWidth={1}
            curve={curveMonotoneX}
          />
          <text
            x={margin.left + 20}
            y={height - margin.bottom / 2}
            fontSize={17.1}
            textAnchor='start'
            fill='white'>
            מאי 24׳
          </text>
          <text
            x={width - margin.right - 36}
            y={height - margin.bottom / 2}
            fontSize={17.1}
            textAnchor='end'
            fill='white'>
            ינואר 23׳
          </text>
          {tooltipData && (
            <line
              x1={tooltipLeft}
              x2={tooltipLeft}
              y1={0}
              y2={height - margin.bottom}
              stroke='#8a8989'
              strokeWidth={1}
              pointerEvents='none'
            />
          )}
        </Group>
      </svg>
      {tooltipData && (
        <Tooltip
          key={Math.random()}
          top={margin.top + 260} // Fixed height for the tooltip
          left={tooltipLeft + 15} // 5px away from the line
          style={tooltipStyles}>
          <div>
            <strong>{formatTooltipDate(tooltipData.date)}</strong>
          </div>
        </Tooltip>
      )}
    </>
  );
};

export default CurveGraph;
