
import Image from "next/image";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";

  const data = [
    {
      name: "Nov",
      Reject: 4000,
      Approved: 2400,
      amt: 2400,
    },
    {
      name: "Dec",
      Reject: 3000,
      Approved: 1398,
      amt: 2210,
    },
    {
      name: "Jan",
      Reject: 2000,
      Approved: 9800,
      amt: 2290,
    },
    {
      name: "Feb",
      Reject: 2780,
      Approved: 3908,
      amt: 2000,
    },
    {
      name: "Mar",
      Reject: 1890,
      Approved: 4800,
      amt: 2181,
    },
    {
      name: "Apr",
      Reject: 2390,
      Approved: 3800,
      amt: 2500,
    },
    
  ];

const ProductOverviewBarChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-[450px] p-4 border border-gray-200 shadow-md hover:shadow-lg flex flex-col">
      
      {/* TITLE */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="capitalize text-base font-semibold">Product Status</h1>  
        <Image src="/moreDark.png" alt="icon" width={20} height={20} />
      </div>

      {/* CHART CONTAINER */}
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ddd" />
            <XAxis dataKey="name" axisLine={false} tick={{ fill: "#595959" , fontSize: 12 }} tickLine={false} />
            <YAxis axisLine={false} tick={{ fill: "#595959" , fontSize: 14 }} tickLine={false} />
            <Tooltip />
            <Legend align="center" verticalAlign="bottom" wrapperStyle={{ fontSize: '16px' }} />
            <Bar dataKey="Approved" stackId="a" fill="#8480FF" />
            <Bar dataKey="Reject" stackId="a" fill="#D8D3D3" />          
            </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

export default ProductOverviewBarChart




