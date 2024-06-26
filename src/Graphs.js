import React from "react";
import { LinePath, AreaClosed } from "@visx/shape";
import { curveNatural } from "@visx/curve";
import { scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { LinearGradient } from "@visx/gradient";

const accentColor = "#001AFF";
const accentColorDark = "#001AFF";

// Transformed data
const lineData = [
  { week: "2023-01-01", x: 0, y: 85 },
  { week: "2023-01-08", x: 1, y: 4 },
  { week: "2023-01-15", x: 2, y: 115 },
  { week: "2023-01-22", x: 3, y: 60 },
  { week: "2023-01-29", x: 4, y: 53 },
  { week: "2023-02-05", x: 5, y: 53 },
  { week: "2023-02-12", x: 6, y: 69 },
  { week: "2023-02-19", x: 7, y: 254 },
  { week: "2023-02-26", x: 8, y: 70 },
  { week: "2023-03-05", x: 9, y: 61 },
  { week: "2023-03-12", x: 10, y: 131 },
  { week: "2023-03-19", x: 11, y: 65 },
  { week: "2023-03-26", x: 12, y: 130 },
  { week: "2023-04-02", x: 13, y: 97 },
  { week: "2023-04-09", x: 14, y: 207 },
  { week: "2023-04-16", x: 15, y: 106 },
  { week: "2023-04-23", x: 16, y: 126 },
  { week: "2023-04-30", x: 17, y: 145 },
  { week: "2023-05-07", x: 18, y: 334 },
  { week: "2023-05-14", x: 19, y: 101 },
  { week: "2023-05-21", x: 20, y: 135 },
  { week: "2023-05-28", x: 21, y: 111 },
  { week: "2023-06-04", x: 22, y: 76 },
  { week: "2023-06-11", x: 23, y: 116 },
  { week: "2023-06-18", x: 24, y: 100 },
];

// Dates to highlight
const highlightDates = [
  { date: "2023-02-19" },
  { date: "2023-04-30" },
  { date: "2023-05-21" },
  { date: "2023-05-07" },
];

const getWeekIndex = (startDate, targetDate) => {
  const start = new Date(startDate);
  const target = new Date(targetDate);
  const diffInDays = (target - start) / (1000 * 60 * 60 * 24);
  return Math.floor(diffInDays / 7);
};

// Transform highlightDates to pointData
const startDate = "2022-12-26"; // Starting date of the first week in the dataset
const pointData = highlightDates.map((d) => {
  const weekIndex = getWeekIndex(startDate, d.date);
  const lineDataPoint = lineData.find((point) => point.x === weekIndex);
  return {
    x: weekIndex,
    y: lineDataPoint ? lineDataPoint.y : 0, // Default to 0 if no matching line data point
  };
});

// Define the dimensions and margins of the graph
const width = 1300;
const height = 400;
const margin = { top: 20, right: 40, bottom: 80, left: 40 };

// Define the scales
const xScale = scaleLinear({
  domain: [0, lineData.length - 1],
  range: [width - margin.right, margin.left],
});

const yScale = scaleLinear({
  domain: [0, Math.max(...lineData.map((d) => d.y))],
  range: [height - margin.bottom, margin.top],
});

const CurveGraph = () => (
  <svg width={width} height={height}>
    <LinearGradient id='teal' from={accentColor} to={accentColorDark} />
    <AreaClosed
      data={lineData}
      x={(d) => xScale(d.x)}
      y={(d) => yScale(d.y)}
      yScale={yScale}
      fill='url(#teal)'
      strokeWidth={2}
      curve={curveNatural}
    />
    {pointData.map((d, i) => (
      <circle
        key={`point-${i}`}
        cx={xScale(d.x)}
        cy={yScale(d.y)}
        r={4}
        fill='#FFD600'
      />
    ))}
    <AxisBottom
      top={height - margin.bottom}
      scale={xScale}
      //   stroke='#C7CBEE'
      tickValues={[0, lineData.length - 1]}
      tickFormat={(value, index) => {
        if (value === 0) return lineData[0].week;
        if (value === lineData.length - 1)
          return lineData[lineData.length - 1].week;
        return "";
      }}
      tickLabelProps={() => ({
        fill: "#C7CBEE",
        fontSize: 14,
        textAnchor: "middle",
        dy: 10,
      })}
    />
  </svg>
);

export default CurveGraph;
