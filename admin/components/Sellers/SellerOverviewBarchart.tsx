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
  { name: "Nov", Sellers: 5454 },
  { name: "Dec", Sellers: 3908 },
  { name: "Jan", Sellers: 2800 },
  { name: "Feb", Sellers: 3800 },
  { name: "Mar", Sellers: 2300 },
];

const SellerOverviewBarchart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-[450px] p-4 border border-gray-200 shadow-md hover:shadow-lg flex flex-col">
      
      {/* TITLE */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="capitalize text-base font-semibold">Overall Sellers</h1>
        <Image src="/moreDark.png" alt="icon" width={20} height={20} />
      </div>

      {/* CHART CONTAINER */}
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ddd" />
            <XAxis dataKey="name" axisLine={false} tick={{ fill: "#595959", fontSize: 14 }} tickLine={false} />
            <YAxis axisLine={false} tick={{ fill: "#595959", fontSize: 14 }} tickLine={false} />
            <Tooltip />
            <Legend align="center" verticalAlign="bottom" wrapperStyle={{ fontSize: "16px" }} />
            <Bar dataKey="Sellers" fill="#FFBCA1" barSize={30} background={{ fill: "#f0f0f0" }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default SellerOverviewBarchart;
