import Image from "next/image";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

// Dummy Data for Admin Roles
const data = [
  { name: "Product Manager", Actions: 5400 },
  { name: "Order Admin", Actions: 3900 },
  { name: "Analytics Admin", Actions: 2800 },
  { name: "Seller Manager", Actions: 3800 },
  { name: "Support Admin", Actions: 2300 },
];

const AMbarChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-[450px] p-4 border border-gray-200 shadow-md hover:shadow-lg flex flex-col">

      {/* TITLE */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="capitalize text-base font-semibold">Top Admin Roles by Activity</h1>
        <Image src="/moreDark.png" alt="icon" width={20} height={20} />
      </div>

      {/* CHART CONTAINER */}
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ddd" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tick={{ fill: "#595959", fontSize: 12 }} 
              tickLine={false} 
            />
            <YAxis 
              axisLine={false} 
              tick={{ fill: "#595959", fontSize: 12 }} 
              tickLine={false} 
            />
            <Tooltip />
            <Bar 
              dataKey="Actions" 
              fill="#7BADFF" 
              barSize={40} 
              background={{ fill: "#f0f0f0" }} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AMbarChart;
