import Image from "next/image";

interface CategoryCardProps {
  iconUrl: string;
  category: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ iconUrl, category }) => {
  return (
    <div className="p-4 rounded-xl border border-gray-200 shadow-md hover:shadow-lg bg-white w-full min-h-[100px] transition duration-200 hover:scale-[1.02]">
      <div className="flex items-center gap-4">
        <Image
          src={iconUrl}
          alt={`${category} icon`}
          width={40}
          height={40}
          className="rounded-md"
        />
        <h3 className="text-base font-semibold text-gray-800">{category}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
