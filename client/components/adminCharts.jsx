import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const cigData = [
  {
    name: "Day 1",
    Panels: 4000,
    Inverter: 2400,
    Optimizers: 2400
  },
  {
    name: "Day 2",
    Panels: 3000,
    Inverter: 1398,
    Optimizers: 2210
  },
  {
    name: "Day 3",
    Panels: 2000,
    Inverter: 9800,
    Optimizers: 2290
  },
  {
    name: "Day 4",
    Panels: 2780,
    Inverter: 3908,
    Optimizers: 2000
  },
  {
    name: "Day 5",
    Panels: 1890,
    Inverter: 4800,
    Optimizers: 2181
  },
  {
    name: "Day 6",
    Panels: 2390,
    Inverter: 3800,
    Optimizers: 2500
  },
  {
    name: "Day 7",
    Panels: 3490,
    Inverter: 4300,
    Optimizers: 2100
  }
];


const colorsForProducts = {Inverter:"#00A558",Panels:"#B92211",Optimizers:"#BE9202",White:"#990b97",Black:"#04178f"}


export default function AdminChart() {
  return (
    <div className="mt-10">
        <LineChart width={1000} height={300} data={cigData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30}} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Inverter" stroke={colorsForProducts.Inverter}/>
        <Line type="monotone" dataKey="Panels" stroke={colorsForProducts.Panels} />
        <Line type="monotone" dataKey="Optimizers" stroke={colorsForProducts.Optimizers} />
        </LineChart>
    </div>
  );
}
