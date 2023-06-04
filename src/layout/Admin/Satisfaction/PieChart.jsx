import { useMemo, useState, useEffect } from "react";
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

export default function PieChart({ order }) {
  const [scores, setScores] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const data = useMemo(
    function () {
      return {
        datasets: [
          {
            label: "Total",
            data: scores,
            backgroundColor: [
              "rgba(123, 45, 67, 0.8)",
              "rgba(0, 150, 200, 0.8)",
              "rgba(255, 128, 0, 0.6)",
              "rgba(150, 75, 200, 0.7)",
              "rgba(76, 187, 23, 0.5)",
              "rgba(200, 50, 150, 0.5)",
              "rgba(100, 100, 100, 0.5)",
              "rgba(0, 255, 0, 0.6)",
              "rgba(98, 210, 76, 0.6)",
              "rgba(15, 129, 200, 0.5)",
              "rgba(255, 0, 0, 0.7)",
              "rgba(50, 50, 50, 0.5)",
            ],
          },
        ],
        labels,
      };
    },
    [scores]
  );
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Total",
        font: {
          size: 15,
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

  useEffect(() => {
    const newScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    order.forEach((item) => {
      const orderDate = new Date(item.order_date);
      const month = orderDate.getMonth();
      newScores[month] += item.price;
    });
    setScores(newScores);
  }, [order]);

  return (
    <div className="App  w-1/2 translate-x-1/2">
      <Pie data={data} options={options} />
    </div>
  );
}
