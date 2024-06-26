// BarChart.js
import React from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Text } from "@visx/text";

const data = [
  { emoji: "🇮🇱", frequency: 136 },
  { emoji: "👏", frequency: 27 },
  { emoji: "❤️", frequency: 26 },
  { emoji: "💙", frequency: 60 },
  { emoji: "👑", frequency: 10 },
  { emoji: "🙏", frequency: 7 },
  { emoji: "😂", frequency: 100 },
  { emoji: "🙌", frequency: 80 },
];

const BarChart = ({ width, height }) => {
  const margin = { top: 40, right: 20, bottom: 40, left: 40 };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Scales
  const xScale = scaleBand({
    domain: data.map((d) => d.emoji),
    padding: 0.2,
  }).rangeRound([xMax, 0]); // Reverse the range to go right to left

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.frequency))],
    nice: true,
  }).range([yMax, 0]);

  return (
    <svg width={width} height={height}>
      <Group top={margin.top} left={margin.left}>
        {data.map((d, i) => {
          const barHeight = yMax - yScale(d.frequency);
          return (
            <Group
              key={`bar-${i}`}
              left={xScale(d.emoji)}
              top={yScale(d.frequency)}>
              <Bar
                x={0}
                y={0}
                width={xScale.bandwidth()}
                height={barHeight}
                fill='blue'
              />
            </Group>
          );
        })}
      </Group>
      <AxisBottom
        scale={xScale}
        top={yMax + margin.top}
        stroke='black'
        tickStroke='black'
        tickLabelProps={() => ({
          fill: "black",
          fontSize: 19,
          textAnchor: "middle",
        })}
      />
    </svg>
  );
};

export default BarChart;
