"use client";

import { Dialog } from "@headlessui/react";
import Image from "next/image";

type Shop = {
  id: number;
  shopId: string;
  name: string;
  category: string;
  address: string;
  district: string;
  area: string;
  photo: string;
  verified: boolean;
  type: string;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  shop: Shop | null;
}

export default function ShopDetailsModal({ isOpen, onClose, shop }: Props) {
  if (!shop) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Modal content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="text-xl font-semibold mb-4">
            {shop.name}
          </Dialog.Title>

          <div className="flex items-center gap-4 mb-4">
            <Image
              src={shop.photo}
              alt={shop.name}
              width={50}
              height={50}
              className="rounded-full w-12 h-12 object-cover"
            />
            <span className="text-sm text-gray-500">Shop ID: {shop.shopId}</span>
          </div>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <p><strong>Category:</strong> {shop.category}</p>
            <p><strong>Address:</strong> {shop.address}</p>
            <p><strong>District:</strong> {shop.district}</p>
            <p><strong>Area:</strong> {shop.area}</p>
            <p><strong>Type:</strong> {shop.type}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={shop.verified ? "text-green-600" : "text-yellow-600"}>
                {shop.verified ? "Verified" : "Pending"}
              </span>
            </p>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#5A31F5] text-white text-sm rounded hover:bg-[#4d29cf]"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
