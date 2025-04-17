const Pagination = () => {
  return (
    <div className='p-2 flex items-center justify-between text-gray-500'>
        <button disabled className="py-2 px-4 rounded-md bg-[#F5F2FF] text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-gray-500 border-1 border-gray-400 ">Prev</button>
        <div className="flex items-center gap-2 text-sm">
            <button className="px-2 rounded-sm bg-[#F5F2FF]">1</button>
            <button className="px-2 rounded-sm ">2</button>
            <button className="px-2 rounded-sm ">3</button>
            .......
            <button className="px-2 rounded-sm ">10</button>
        </div>
        <button  className="py-2 px-4 rounded-md bg-[#F5F2FF] text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-gray-500 border-1 border-gray-400 ">Next</button>
    </div>
  )
}

export default Pagination