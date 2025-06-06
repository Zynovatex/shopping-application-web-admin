import Image from "next/image";

interface Props {
  iconSrc: string;
  count: number;
  alt: string;
  onClick?: () => void; // Optional click handler
}

/**
 * NotificationIcon component
 * Displays an icon with an optional notification count badge
 */
const NotificationIcon = ({ iconSrc, count, alt, onClick }: Props) => {
  return (
    <div
      onClick={onClick} // Handles click if provided
      className="bg-white rounded-full w-7 h-7 flex justify-center items-center cursor-pointer relative hover:bg-gray-100 transition duration-150"
    >
      <Image src={iconSrc} alt={alt} width={20} height={20} />
      {/* Notification badge, visible only if count > 0 */}
      {count > 0 && (
        <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center rounded-full bg-purple-500 text-white text-xs animate-pulse">
          {count}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
