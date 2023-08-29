import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Colors,
  Tooltip,
  annotationPlugin
);
import { createDeck } from "@/utils";

type BarChartProps = {
  data: [];
  initialPos: number;
  xLabel: string;
  yLabel: string;
};

export const BarChart = ({
  data,
  initialPos,
  xLabel,
  yLabel,
}: BarChartProps) => {
  console.log(data);

  const bardata = {
    labels: createDeck(52),
    datasets: data?.map((modelRes, index) => {
      return {
        label: `Model-${index + 1}`,
        //@ts-ignore
        data: modelRes.result[parseInt(initialPos.toString())],
        barThickness: 6,
      };
    }),
  };

  const options = {
    // indexAxis: "y" as const,
    maintainAspectRatio: false,
    plugins: {
      colors: {
        forceOverride: true,
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            scaleID: "x",
            value: initialPos - 1,
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
          },
        },
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
  //@ts-ignore
  return <Bar data={bardata} options={options} />;
};
