import { useState, useEffect } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import Services from "../../../Services";

export default function LineChartS({ order, setOrder }) {
  const [data, setData] = useState([
    { name: "January", number_order: 0, total: 0 },
    { name: "February", number_order: 0, total: 0 },
    { name: "March", number_order: 0, total: 0 },
    { name: "April", number_order: 0, total: 0 },
    { name: "May", number_order: 0, total: 0 },
    { name: "June", number_order: 0, total: 0 },
    { name: "July", number_order: 0, total: 0 },
    { name: "August", number_order: 0, total: 0 },
    { name: "September", number_order: 0, total: 0 },
    { name: "October", number_order: 0, total: 0 },
    { name: "November", number_order: 0, total: 0 },
    { name: "December", number_order: 0, total: 0 },
  ]);

  useEffect(() => {
    // Calculate number_order and total from the given objects
    const updatedData = data.map((month) => {
      let { number_order, total } = month;
      total = 0;
      number_order = 0;
      // Iterate through the objects and update the values
      for (const obj of order) {
        const orderDate = new Date(obj.order_date);
        const orderMonth = orderDate.getMonth();
        const orderYear = orderDate.getFullYear();
        // Check if the order's month and year match the current month
        if (
          orderMonth === data.indexOf(month) &&
          orderYear === new Date().getFullYear()
        ) {
          number_order += 1;
          total += obj.total;
        }
      }
      return { ...month, number_order, total };
    });
    setData(updatedData);
  }, [order]);

  useEffect(() => {
    const initOrder = async () => {
      const res = await Services.getDataFromApi("/api/item/order/all-sold");
      if (res.status === 200) {
        setOrder(
          JSON.parse(res.data).map((item, index) => {
            return {
              ...item,
              id: index + 1,
            };
          })
        );
      }
    };
    initOrder();
  }, []);
  return (
    <ResponsiveContainer className="chart" height={300}>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="number_order" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
