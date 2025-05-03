"use client";

import Link from "next/link";
import Image from "next/image";
import { useUserContext } from "@/context/UserContext";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/admin",
        visible: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
      },
      {
        icon: "/teacher.png",
        label: "Seller Management",
        href: "/list/sellers",
        visible: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
        permissionKey: "SELLER",
      },
      {
        icon: "/student.png",
        label: "Product Management",
        href: "/list/product",
        visible: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
        permissionKey: "PRODUCT",
      },
      {
        icon: "/parent.png",
        label: "Order & Delivery",
        href: "/list/order&delivery",
        visible: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
        permissionKey: "ORDERS",
      },
      {
        icon: "/subject.png",
        label: "Customer Management",
        href: "/list/customers",
        visible: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
        permissionKey: "CUSTOMER",
      },
      {
        icon: "/class.png",
        label: "Analytics",
        href: "/list/analitics",
        visible: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
        permissionKey: "ANALYTICS",
      },
      {
        icon: "/lesson.png",
        label: "Admin Management",
        href: "/list/AdminManagement",
        visible: ["ROLE_SUPER_ADMIN"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/list/shopSettings",
        visible: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
      },
    ],
  },
];

const Menu = () => {
  const { role, permissions } = useUserContext();

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2 mx-4" key={section.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {section.title}
          </span>
          {section.items.map((item) => {
            const roleAllowed = item.visible.includes(role);

            // ✅ Allow Super Admin to bypass permissionKey checks
            const permissionAllowed =
              role === "ROLE_SUPER_ADMIN" ||
              !item.permissionKey ||
              permissions.includes(item.permissionKey);

            if (roleAllowed && permissionAllowed) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-[#F4F1FF]"
                >
                  <Image
                    src={item.icon}
                    alt={`${item.label} icon`}
                    width={20}
                    height={20}
                  />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }

            return null;
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
