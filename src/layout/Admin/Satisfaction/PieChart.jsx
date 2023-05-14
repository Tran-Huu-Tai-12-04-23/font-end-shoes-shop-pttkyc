import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
} from "chart.js";
ChartJS.register(Title, Tooltip, Legend, PieController, ArcElement);

export default function PieChart() {
  const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5];
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Mis datos",
          data: scores,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
        },
      ],
      labels,
    };
  }, []);
  const options = {
    plugins: {
      title: {
        display: true,
        text: "My Pie Chart",
        font: {
          size: 20,
        },
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="App  w-1/2 translate-x-1/2">
      <Pie data={data} options={options} />
    </div>
  );
}
