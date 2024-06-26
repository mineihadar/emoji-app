import React from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleBand, scaleLinear } from "@visx/scale";

const MarimekkoChart = ({
  width,
  height,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
}) => {
  const data = [
    {
      category: "9 במאי",
      subcategories: [
        { name: "🇮🇱", value: 40 },
        { name: "🦄", value: 34 },
        { name: "👏", value: 10 },
      ],
    },
    {
      category: "10 במאי",
      subcategories: [
        { name: "🇮🇱", value: 55 },
        { name: "🦄", value: 47 },
        { name: "👏", value: 28 },
      ],
    },
    {
      category: "11 במאי",
      subcategories: [
        { name: "🇮🇱", value: 60 },
        { name: "🦄", value: 38 },
        { name: "👏", value: 42 },
      ],
    },
  ];

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const categories = data.map((d) => d.category);

  const categoryScale = scaleBand({
    domain: categories,
    range: [0, innerHeight],
    padding: 0, // Adding some padding between categories
  });

  const colors = {
    "🇮🇱": "#FF5733",
    "🦄": "#33FF57",
    "👏": "#3357FF",
    // Define more colors as needed
  };

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        {data.map((d, i) => {
          const categoryHeight = categoryScale.bandwidth();
          const yOffset = categoryScale(d.category);

          const totalValue = d.subcategories.reduce(
            (acc, sc) => acc + sc.value,
            0
          );

          let cumulativeWidth = 0;

          return (
            <Group key={`category-${d.category}`} top={yOffset}>
              {d.subcategories.map((sc, j) => {
                const barWidth = innerWidth * (sc.value / totalValue);
                const subcategoryHeight = categoryHeight - 70;

                const xOffset = cumulativeWidth;
                cumulativeWidth += barWidth;

                return (
                  <Bar
                    key={`bar-${d.category}-${sc.name}`}
                    x={xOffset}
                    y={0}
                    width={barWidth}
                    height={subcategoryHeight}
                    fill={colors[sc.name]}
                    stroke='#FFFFFF'
                    strokeWidth={1}
                  />
                );
              })}
            </Group>
          );
        })}
      </Group>
    </svg>
  );
};

export default MarimekkoChart;
