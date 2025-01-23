import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { useAnalyticsData } from "../hooks";
import InfoTooltip from "../components/InfoTooltip";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
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

  const renderChartWithFallback = (chartComponent, hasData) => {
    return hasData ? (
      chartComponent
    ) : (
      <div className="text-center text-gray-500">No data available</div>
    );
  };

  const tileStyle =
    "h-[400px] w-[600px] shadow-xl p-4 rounded-lg flex flex-col justify-center items-center border-gray-300";

  return (
    <div className="p-4 grid grid-cols-2 gap-8">
      <h1 className="text-3xl font-bold col-span-2 text-left mb-6">
        Analytics
      </h1>

      <div className="pr-4 flex justify-center">
        <div className={tileStyle}>
          <h4 className="text-lg font-semibold mb-4 self-start flex items-center">
            Expenses (Current Quarter)
            <InfoTooltip description="This graph shows the expenses trend for the current quarter." />
          </h4>
          <div className="flex-grow flex items-center justify-center">
            {renderChartWithFallback(
              <Line
                data={{
                  labels: data.revenue.labels,
                  datasets: [
                    {
                      label: "Revenue",
                      data: data.revenue.values,
                      borderColor: "rgba(75, 192, 192, 1)",
                      backgroundColor: "rgba(75, 192, 192, 0.2)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "top" } },
                }}
              />,
              data.revenue.values.length > 0
            )}
          </div>
        </div>
      </div>

      <div className="pr-4 flex justify-center">
        <div className={tileStyle}>
          <h4 className="text-lg font-semibold mb-4 self-start flex items-center">
            Expenses (Year to Date)
            <InfoTooltip description="This bar graph represents the total expenses incurred each year to date." />
          </h4>
          <div className="flex-grow flex items-center justify-center">
            {renderChartWithFallback(
              <Bar
                data={{
                  labels: data.expenses.labels,
                  datasets: [
                    {
                      label: "Expenses",
                      data: data.expenses.values,
                      backgroundColor: "rgba(153, 102, 255, 0.6)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "top" } },
                }}
              />,
              data.expenses.values.length > 0
            )}
          </div>
        </div>
      </div>

      <div className="pr-4 flex justify-center">
        <div className={tileStyle}>
          <h4 className="text-lg font-semibold mb-4 self-start flex items-center">
            Budget Claims
            <InfoTooltip description="This pie chart illustrates the proportion of budget claims made, unclaimed, and exceeded." />
          </h4>
          <div className="flex-grow flex items-center justify-center">
            {renderChartWithFallback(
              <Pie
                data={{
                  labels: data.budgetClaims.labels,
                  datasets: [
                    {
                      label: "Claims",
                      data: data.budgetClaims.values,
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.6)",
                        "rgba(54, 162, 235, 0.6)",
                        "rgba(255, 206, 86, 0.6)",
                      ],
                    },
                  ],
                }}
              />,
              data.budgetClaims.values.length > 0
            )}
          </div>
        </div>
      </div>

      <div className="pr-4 flex justify-center">
        <div className={tileStyle}>
          <h4 className="text-lg font-semibold mb-4 self-start flex items-center">
            Approval Rates
            <InfoTooltip description="This donut chart shows the approval and rejection rates of proposals." />
          </h4>
          <div className="flex-grow flex items-center justify-center">
            {renderChartWithFallback(
              <Doughnut
                data={{
                  labels: data.approvalRates.labels,
                  datasets: [
                    {
                      label: "Approval",
                      data: data.approvalRates.values,
                      backgroundColor: [
                        "rgba(75, 192, 192, 0.6)",
                        "rgba(255, 159, 64, 0.6)",
                      ],
                    },
                  ],
                }}
              />,
              data.approvalRates.values.length > 0
            )}
          </div>
        </div>
      </div>

      <div className="col-span-2 flex justify-center">
        <div className={tileStyle}>
          <h4 className="text-lg font-semibold mb-4 self-start flex items-center">
            Overtime Roles
            <InfoTooltip description="This bar graph depicts the number of overtime hours logged by different contract roles." />
          </h4>
          <div className="flex-grow flex items-center justify-center">
            {renderChartWithFallback(
              <Bar
                data={{
                  labels: data.overtime.labels,
                  datasets: [
                    {
                      label: "Overtime Hours",
                      data: data.overtime.values,
                      backgroundColor: "rgba(255, 206, 86, 0.6)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "top" } },
                }}
              />,
              data.overtime.values.length > 0
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
