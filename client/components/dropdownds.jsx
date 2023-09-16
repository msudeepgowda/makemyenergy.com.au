import Link from 'next/link';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { GiHamburgerMenu } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router';
import axios from "axios";

const Dropdownds = () => {

    const [email, setEmail] = useState(null);

    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("makemyenergy_Email") != null) {
            setEmail(localStorage.getItem("makemyenergy_Email"));
        }
    }, [])

    const logOut = async () => {
        await axios.get(`/route/logout`).then((response) => {
            if (response.data === "Logout Successful" && response.status == 200) {
                localStorage.removeItem("makemyenergy_Email")
                router.push("/")
                window.location.reload()
            }
        }).catch(error => { console.log(error) })
    }

    const [dropDown, setDropDown] = useState(false);

    return (
        <div className='w-[70vw]  z-60'>

            <div className='flex lg:hidden ml-[40vw] sm:ml-[55vw] md:ml-[60vw] lg:ml-[60vw]'>
                {dropDown == true ?
                    <span className='z-60'>
                        <GiHamburgerMenu size={32} onClick={() => { setDropDown(false) }} className="cursor-pointer" />
                        <div className='absolute top-[12.5vh] items-center space-y-[2vh] py-7 left-0 bg-gradient-to-r from-[#FBC2EB]/100 to-[#A6C1EE]/100 w-[100vw] flex flex-col'>
                            <ul className='flex flex-col w-[40vw] space-y-[2vh] mt-[0.5vh] justify-between items-center'>
                                <Link href="/customerPanel/designReview"><li className='text-orange-500 font-medium'>Design Review</li></Link>
                                <Link href="/customerPanel/designReview"><li className='font-medium'>View Your Progress</li></Link>
                                <Link href="/customerPanel/mySystem"><li className='font-medium'>My System</li></Link>
                                <Link href="/customerPanel/designReview"><li className='font-medium'>Monitor</li></Link>
                            </ul>
                            <Menu>
                                <div className=' items-center justify-center flex flex-row mt-[1.3vh] h-[40px] w-[260px]'>
                                    <Link href="/customerPanel/designReview" className='px-[1vw] py-[1vw] flex flex-ro' > <CgProfile size={40} /> <p className=' pl-2 pt-2 font-bold '>{email}</p></Link>
                                    <MenuButton> <RiArrowDropDownLine size={35} /> </MenuButton>
                                    <MenuList className='mr-[1.2vw]'>
                                        <span onClick={() => { logOut() }}><MenuItem>Log Out</MenuItem></span>
                                    </MenuList>
                                </div>
                            </Menu>
                        </div>
                    </span>
                    :
                    <GiHamburgerMenu size={32} onClick={() => { setDropDown(true) }} className="cursor-pointer" />
                }
            </div>

            <div className='hidden lg:flex lg:flex-row lg:pl-[0vw] xl:pl-[10vw] 2xl:pl-[15vw] space-x-[2vw] xl:pr-[0vw] '>
                <ul className='flex flex-row lg:w-[43vw] xl:w-[38vw] 2xl:w-[33vw] max-w-[43vw] justify-between items-center'>
                    <Link href="/customerPanel/designReview"><li className='text-orange-500 font-medium'>Design Review</li></Link>
                    <Link href="/customerPanel/designReview"><li className='font-medium'>View Your Progress</li></Link>
                    <Link href="/customerPanel/mySystem"><li className='font-medium'>My System</li></Link>
                    <Link href="/customerPanel/designReview"><li className='font-medium'>Monitor</li></Link>
                </ul>
                <Menu>
                    <div className=' items-center justify-center flex flex-row lg:pl-[11vw] xl:pl-[9vw] h-[40px] w-[10vw] xl:pr-[2vw]'>
                        <Link href="/customerPanel/designReview" className='px-[1vw] py-[1vw] flex flex-row' > <CgProfile size={40} /> <p className=' pl-2 pt-2 font-bold '>{email}</p></Link>
                        <MenuButton> <RiArrowDropDownLine size={35} /> </MenuButton>
                        <MenuList className='mr-[1.2vw]'>
                            <span onClick={() => { logOut() }}><MenuItem>Log Out</MenuItem></span>
                        </MenuList>
                    </div>
                </Menu>
            </div>
        </div>
    )
}

export default Dropdownds;