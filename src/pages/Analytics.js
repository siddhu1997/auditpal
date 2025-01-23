import { useAnalyticsData } from "../hooks";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [data, isLoading, error] = useAnalyticsData();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Analytics Overview",
      },
    },
  };

  const chartData = {
    labels: data?.labels,
    datasets: [
      {
        label: "Sales",
        data: data?.sales,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Revenue",
        data: data?.revenue,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Analytics;
