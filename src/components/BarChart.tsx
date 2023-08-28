import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Colors,
  Tooltip
);
import { createDeck } from "@/utils";

type BarChartProps = {
  data: [];
  initialPos: string;
  xLabel: string;
  yLabel: string;
};

export const BarChart = ({
  data,
  initialPos,
  xLabel,
  yLabel,
}: BarChartProps) => {
  const bardata = {
    labels: createDeck(52),
    datasets: data?.map((modelRes, index) => {
      return {
        label: `Model-${index + 1}`,
        data: modelRes[parseInt(initialPos)],
        barThickness: 6,
      };
    }),
  };

  const options = {
    indexAxis: "y" as const,
    maintainAspectRatio: false,
    plugins: {
      colors: {
        forceOverride: true,
      },
    },
    scales: {
      y: {
        grid: { display: false },
        title: { text: yLabel, display: true },
      },
      x: {
        grid: { display: false },
        title: { text: xLabel, display: true },
      },
    },
  };

  return <Bar data={bardata} options={options} />;
};
