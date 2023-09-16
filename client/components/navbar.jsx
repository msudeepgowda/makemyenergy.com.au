import Link from "next/link"
import Dropdown from "./dropdown"
import Image from "next/image"
import logo from "../assets/makemyenergylogo.png"

const Navbar = () => {
  return (
    <div className='flex flex-row w-[97.5vw] md:min-w-[99.2vw] md:max-w-[99.2vw] pr-[10vw] md:pr-[0vw] justify-between items-center bg-gradient-to-r from-[#FBC2EB]/25 to-[#A6C1EE]/25'>
      <div className='pl-[2vw] md:pl-[0vw] ml-[8vw] md:ml-[4vw] lg:pl-[-2vw] xl:pl-[2vw] 2xl:pl-[6vw]'>
        <Link href="/"><Image src={logo} className='min-w-[30px] md:min-w-[150px] md:w-[150px] lg:w-[140px] xl:w-[160px] 2xl:w-[180px] h-[15vh]' alt='MakeMyEnergy_Logo'></Image></Link>
      </div>
      <Dropdown />
    </div>
  )
}

export default Navbar