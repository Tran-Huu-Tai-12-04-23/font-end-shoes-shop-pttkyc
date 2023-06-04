import React, { useMemo, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Services from "../../../Services";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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

const options = {
  fill: true,
  animations: false,
  scales: {
    y: {
      min: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function BarChart({ order }) {
  const [scores, setScores] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const newScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    order.forEach((item) => {
      const orderDate = new Date(item.order_date);
      const month = orderDate.getMonth();
      newScores[month] += item.price;
    });
    setScores(newScores);
  }, [order]);

  const data = useMemo(
    function () {
      const colors = [
        "rgba(123, 45, 67, 0.8)",
        "rgba(98, 210, 76, 0.6)",
        "rgba(15, 129, 200, 0.9)",
        "rgba(255, 0, 0, 0.7)",
        "rgba(50, 50, 50, 0.5)",
        "rgba(0, 150, 200, 0.8)",
        "rgba(255, 128, 0, 0.6)",
        "rgba(150, 75, 200, 0.7)",
        "rgba(76, 187, 23, 0.8)",
        "rgba(200, 50, 150, 0.5)",
        "rgba(100, 100, 100, 0.9)",
        "rgba(0, 255, 0, 0.6)",
      ];

      return {
        datasets: [
          {
            label: "Total shop",
            tension: 0.3,
            data: scores,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: colors.slice(0, scores.length),
          },
        ],
        labels,
      };
    },
    [scores]
  );
  return (
    <div className="App">
      <Bar data={data} options={options} />
    </div>
  );
}
