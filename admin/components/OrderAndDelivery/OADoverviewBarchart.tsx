import Image from "next/image";
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";

// Sample data representing seller counts per month
const data = [
    { name: "Nov", Sellers: 5454 },
    { name: "Dec", Sellers: 3908 },
    { name: "Jan", Sellers: 2800 },
    { name: "Feb", Sellers: 3800 },
    { name: "Mar", Sellers: 2300 },
];

/**
 * OADoverviewBarchart component
 * Displays a bar chart showing overall orders per month
 */
const OADoverviewBarchart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-[450px] p-4 border border-gray-200 shadow-md hover:shadow-lg flex flex-col">
      
      {/* Title section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="capitalize text-base font-semibold">Overall Orders</h1>
        {/* More options icon */}
        <Image src="/moreDark.png" alt="icon" width={20} height={20} />
      </div>

      {/* Chart container */}
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            {/* Background grid, vertical lines hidden */}
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ddd" />

            {/* X-axis with month names */}
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tick={{ fill: "#595959", fontSize: 14 }} 
              tickLine={false} 
            />

            {/* Y-axis for seller counts */}
            <YAxis 
              axisLine={false} 
              tick={{ fill: "#595959", fontSize: 14 }} 
              tickLine={false} 
            />

            {/* Tooltip on hover */}
            <Tooltip />

            {/* Legend at bottom center */}
            <Legend 
              align="center" 
              verticalAlign="bottom" 
              wrapperStyle={{ fontSize: '16px' }} 
            />

            {/* Bars representing sellers */}
            <Bar 
              dataKey="Sellers" 
              fill="#FFE8B2" 
              barSize={30} 
              background={{ fill: "#f0f0f0" }} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default OADoverviewBarchart;
