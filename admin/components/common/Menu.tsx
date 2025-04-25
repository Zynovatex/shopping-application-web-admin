import Link from "next/link";
import Image from "next/image";
import { role } from "@/lib/data";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/admin",
        visible: ["admin", "superadmin"],
      },
      {
        icon: "/teacher.png",
        label: "Seller Management",
        href: "/list/sellers",
        visible: ["admin", "superadmin"],
      },
      {
        icon: "/student.png",
        label: "Product Management",
        href: "/list/product",
        visible: ["admin", "superadmin"],
      },
      {
        icon: "/parent.png",
        label: "Order & Delivery",
        href: "/list/order&delivery",
        visible: ["admin", "superadmin"],
      },
      {
        icon: "/subject.png",
        label: "Customer Management",
        href: "/list/customers",
        visible: ["admin", "superadmin"],
      },
      {
        icon: "/class.png",
        label: "Analitics",
        href: "/list/analitics",
        visible: ["admin", "superadmin"],
      },
      {
        icon: "/lesson.png", //only for superadmin
        label: "Admin Management",
        href: "/list/AdminManagement",
        visible: ["superadmin"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/list/shopSettings",
        visible: ["admin", "superadmin"],
      },
    ],
  },
];


const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map(i=>(
        <div className="flex flex-col gap-2 mx-4" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">{i.title}</span>
          {i.items.map(item=>{
            if(item.visible.includes(role)){
              return(
                (
                  <Link href={item.href} key={item.label} className="flex items-center justify-start lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-[#F4F1FF]"> 
                  <Image src={item.icon} alt="icon" width={20} height={20}></Image>
                  <span className="hidden lg:block">{item.label}</span>
                  </Link>
                )
              )
            }
          })}
        </div>
      ))}
    </div>
  )
}

export default Menu