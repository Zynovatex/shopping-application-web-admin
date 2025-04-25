import Image from "next/image";

interface CategoryCardProps {
  iconUrl: string;
  category: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ iconUrl, category }) => {
  return (
    <div className="p-4 rounded-xl border border-gray-200 shadow-md hover:shadow-lg bg-white w-full min-h-[100px]">
      <div className="flex items-center gap-2">
        <Image src={iconUrl} alt="icon" width={40} height={40} className="rounded-md" />
        <h3 className="text-lg font-semibold p-4">{category}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
