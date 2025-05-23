import Image from "next/image";

interface QuickShopPendingApprovalProps {
  name: string;
  isOdd: boolean; // Used to determine shadow and hover colors
}

/**
 * QuickShopPendingApproval component
 * Displays a shop name with accept and reject buttons, styled differently based on index
 */
const QuickShopPendingApproval: React.FC<QuickShopPendingApprovalProps> = ({
  name,
  isOdd,
}) => {
  return (
    <div
      className={`w-full px-3 py-2 mb-6 bg-white rounded-lg border border-gray-200
        ${isOdd ? "hover:shadow-[0px_12px_2px_0px_rgba(132,128,255,0.4)]" : "hover:shadow-[0px_12px_2px_0px_rgba(255,188,161,0.4)]"}
        ${isOdd ? "shadow-[0px_10px_2px_0px_rgba(132,128,255,0.4)]" : "shadow-[0px_10px_2px_0px_rgba(255,188,161,0.4)]"}
        inline-flex justify-between items-center overflow-hidden`}
    >
      {/* Shop Name */}
      <div className="text-black text-base font-normal font-['Inter']">{name}</div>

      {/* Accept & Reject Buttons */}
      <div className="flex items-center gap-2">
        {/* Accept Button */}
        <button className="focus:outline-none cursor-pointer" aria-label="Accept">
          <Image
            src="/accept-icon-image.png" // Replace with actual PNG path
            alt="Accept"
            width={20}
            height={20}
          />
        </button>

        {/* Reject Button */}
        <button className="focus:outline-none cursor-pointer" aria-label="Reject">
          <Image
            src="/reject-icon-image.png" // Replace with actual PNG path
            alt="Reject"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default QuickShopPendingApproval;
