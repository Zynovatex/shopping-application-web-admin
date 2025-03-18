import Image from "next/image"

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4 bg-white'>
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="search icon" width={14} height={14}/>
        <input type="text" placeholder="Search" className="w-[200px] p-2 bg-transparent outline-none"/>
      </div>
      {/* ICONS AND USERS*/}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex justify-center items-center cursor-pointer">
          <Image src="/message.png" alt="message" width={20} height={20}/>
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex justify-center items-center cursor-pointer relative">
          <Image src="/announcement.png" alt="message" width={20} height={20}/>
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center rounded-full bg-purple-500 text-white text-xs">1</div>
        </div>
        <div className="flex flex-col p-1">
          <span className="text-xs leading-3 font-medium">Lingaraj</span>
          <span className="text-[10px] text-gray-500 text-right">Super admin</span>
        </div>
        <Image src="/avatar.png" alt="avatar" width={36} height={36} className="rounded-full cursor-pointer"/>
      </div>
    </div>
  )
}

export default Navbar
