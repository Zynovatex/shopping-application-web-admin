import Image from "next/image";

interface StatCardProps {
  iconUrl: string;  // PNG icon URL (replace with actual file path)
  title: string;    // Title text (e.g., "Total Order")
  value: string;    // Main value (e.g., "23423")
  statusChange: string; // Percentage (e.g., "8.6%")
  status: string;   // Status text (e.g., "Up compared to last month")
  isPositive: boolean; // Whether the trend is up or down
}

const StatCard: React.FC<StatCardProps> = ({
  iconUrl,
  title,
  value,
  statusChange,
  status,
  isPositive,
}) => {
  return (
    <div className="flex md:flex-1 sm:flex-1 flex-col p-5 min-w-[160px] rounded-xl border border-gray-200 shadow-md hover:shadow-lg bg-white">
      <div className="flex items-center space-x-2">
        {/* Replace with actual PNG file */}
        <Image src={iconUrl} alt="icon" width={50} height={50} className="rounded-md pr-1" />
        <h3 className="text-gray-500 text-[13px]">{title}</h3>
      </div>

      <h2 className="text-2xl font-semibold mt-2">{value}</h2>

      <div className="flex items-center text-xs mt-3">
        {/* Replace with actual PNG file */}
        <Image 
          src={isPositive ? "/up-trend-icon.png" : "/down-trend-icon.png"} 
          alt="status-icon" 
          width={14} 
          height={14} 
        />
        <span className={isPositive ? "text-green-500 ml-1" : "text-red-500 ml-1"}>
          {statusChange}
        </span>
        <span className="text-gray-400 ml-2">{status}</span>
      </div>
    </div>
  );
};

export default StatCard;
