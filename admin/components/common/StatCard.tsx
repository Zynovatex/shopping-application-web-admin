import Image from "next/image";

interface StatCardProps {
  iconUrl?: string;
  title: string;
  value: string;
  statusChange: string;
  status: string;
  isPositive: boolean;
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
        {iconUrl ? (
          <Image
            src={iconUrl}
            alt={title}
            width={50}
            height={50}
            className="rounded-md pr-1"
          />
        ) : (
          <div className="w-[50px] h-[50px] bg-gray-200 rounded-md pr-1" />
        )}
        <h3 className="text-gray-500 text-[13px]">{title}</h3>
      </div>

      <h2 className="text-2xl font-semibold mt-2">{value}</h2>

      <div className="flex items-center text-xs mt-3">
        <Image
          src={isPositive ? "/up-trend-icon.png" : "/down-trend-icon.png"}
          alt="trend"
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
