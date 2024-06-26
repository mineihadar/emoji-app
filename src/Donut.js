import React from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

const data = [
  { label: "חיובי", value: 112, color: "#6F7DFF" },
  { label: "ניטרלי", value: 122, color: "#4759FF" },
  { label: "שלילי", value: 46, color: "#001AFF" },
];

const width = 400;
const height = 400;
const innerRadius = 100;
const outerRadius = 150;

const DonutChart = () => {
  return (
    <svg width={width} height={height}>
      <Group top={height / 2} left={width / 2}>
        <Pie
          data={data}
          pieValue={(d) => d.value}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          padAngle={0.02}>
          {(pie) =>
            pie.arcs.map((arc, index) => {
              const [centroidX, centroidY] = pie.path.centroid(arc);
              return (
                <g key={`arc-${arc.data.label}-${index}`}>
                  <path d={pie.path(arc)} fill={arc.data.color} />
                  <Text
                    x={centroidX}
                    y={centroidY}
                    dy='.33em'
                    fontSize={14}
                    textAnchor='middle'
                    fill='#C7CBEE'>
                    {arc.data.label}
                  </Text>
                </g>
              );
            })
          }
        </Pie>
      </Group>
    </svg>
  );
};

export default DonutChart;
