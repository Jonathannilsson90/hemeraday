import Link from "next/link";

const Header = () => {

  return (
    <div className="h-[5vh] flex items-center justify-center h-[60px] bg-gray-300 z-[10]">
      <nav className="flex flex-row items-center justify-between h-[80px]">
        <button type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-600 hover:bg-gradient-to-br  focus:outline-none focus:ring-lime-300  shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-7 py-2.5 text-center me-5  min-w-[150px] h-[50px]"><Link href="/" className="">Home</Link></button>
        <button type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-600 hover:bg-gradient-to-br  focus:outline-none focus:ring-lime-300  shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-7 py-2.5 text-center me-5  min-w-[150px] h-[50px]"><Link href="/jonpage">Jonpage</Link></button>
        <button type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-600 hover:bg-gradient-to-br  focus:outline-none focus:ring-lime-300  shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-7 py-2.5 text-center   min-w-[150px] h-[50px]"><Link href="/yuliapage">Yuliapage</Link></button>
      </nav>
    </div>
  )

}
export default Header;