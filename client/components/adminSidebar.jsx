import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import { AiOutlineLineChart } from 'react-icons/ai'
import { GrUserAdmin, GrCertificate } from 'react-icons/gr'
import { FaShieldAlt, FaSolarPanel, FaAddressCard, FaRegAddressCard } from 'react-icons/fa'
import { HiOutlineLogout } from 'react-icons/hi'
import { BiUser } from 'react-icons/bi'
import { TbDiscount2 } from 'react-icons/tb'
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios'

export default function AdminSidebar() {

    const router = useRouter();

    const logOut = async () => {
        await axios.get(`http://localhost:3050/route/adminLogout`).then((response) => {
            if (response.data === "Logout Successful" && response.status === 200) {
                localStorage.removeItem("makemyenergy_Admin_Email")
                router.push("/")
            }
        }).catch(error => { console.log(error) })
    }

    const isActive = (pathname) => {
        return router.pathname === pathname;
    };

    return (
        <Box className='w-[22vw] align-top h-[100vh]'>
            <Box>
                <Image src='/logo.png' className='m-auto mt-2' />

                <Box className='mx-8'>
                    <p className=' text-[#EC652E] font-semibold'>Main</p>
                    <Box className='mx-8'>
                        <Link href="/admin/users" style={{ textDecoration: "none" }}>
                            {isActive("/admin/users") || isActive("/admin/[adminUserID]") ?
                                <Box className='mt-4 flex'>
                                    <BiUser className='w-6 h-6 text-[#EC652E]' />
                                    <p className='font-bold text-[#EC652E] ml-4'>Users</p>
                                </Box> :
                                <Box className='mt-4 flex'>
                                    <BiUser className='w-6 h-6' />
                                    <p className='font-bold text-gray-700 ml-4'>Users</p>
                                </Box>
                            }
                        </Link>
                        <Link href="/admin/brands" style={{ textDecoration: "none" }}>
                            {isActive("/admin/brands") ?
                                <Box className='mt-4 flex'>
                                    <FaSolarPanel className='w-6 h-6 text-[#EC652E]' />
                                    <p className='font-bold text-[#EC652E] ml-4'>Brands</p>
                                </Box> :
                                <Box className='mt-4 flex'>
                                    <FaSolarPanel className='w-6 h-6' />
                                    <p className='font-bold text-gray-700 ml-4'>Brands</p>
                                </Box>
                            }
                        </Link>
                        <Link href="/admin/quotation" style={{ textDecoration: "none" }}>
                            {isActive("/admin/quotation") ?
                                <Box className='mt-4 flex'>
                                    <FaRegAddressCard className='w-6 h-6 text-[#EC652E]' />
                                    <p className='font-bold text-[#EC652E] ml-4'>Quotation</p>
                                </Box> :
                                <Box className='mt-4 flex'>
                                    <FaRegAddressCard className='w-6 h-6' />
                                    <p className='font-bold text-gray-700 ml-4'>Quotation</p>
                                </Box>
                            }
                        </Link>
                        <Link href="/admin/products" style={{ textDecoration: "none" }}>
                            {isActive("/admin/products") ?
                                <Box className='mt-4 flex'>
                                    <AiOutlineLineChart className='w-6 h-6 text-[#EC652E]' />
                                    <p className='font-bold text-[#EC652E] ml-4'>Products</p>
                                </Box> :
                                <Box className='mt-4 flex'>
                                    <AiOutlineLineChart className='w-6 h-6' />
                                    <p className='font-bold text-gray-700 ml-4'>Products</p>
                                </Box>
                            }
                        </Link>
                        <Link href="/admin/rebates" style={{ textDecoration: "none" }}>
                            {isActive("/admin/rebates") ?
                                <Box className='mt-4 flex'>
                                    <TbDiscount2 className='w-6 h-6 text-[#EC652E]' />
                                    <p className='font-bold text-[#EC652E] ml-4'>Rebates & Stc</p>
                                </Box> :
                                <Box className='mt-4 flex'>
                                    <TbDiscount2 className='w-6 h-6' />
                                    <p className='font-bold text-gray-700 ml-4'>Rebates & Stc</p>
                                </Box>
                            }
                        </Link>
                        <Link href="/admin/pincodes" style={{ textDecoration: "none" }}>
                            {isActive("/admin/pincodes") ?
                                <Box className='mt-4 flex'>
                                    <FaAddressCard className='w-6 h-6 text-[#EC652E]' />
                                    <p className='font-bold text-[#EC652E] ml-4'>Pincodes</p>
                                </Box> :
                                <Box className='mt-4 flex'>
                                    <FaAddressCard className='w-6 h-6' />
                                    <p className='font-bold text-gray-700 ml-4'>Pincodes</p>
                                </Box>
                            }
                        </Link>
                        <Link href="/admin/accreditations" style={{ textDecoration: "none" }}>
                            {isActive("/admin/accreditations") ?
                                <Box className='mt-4 flex'>
                                    <GrCertificate className='w-6 h-6 text-[#EC652E]' />
                                    <p className='font-bold text-[#EC652E] ml-4'>Accreditations</p>
                                </Box> :
                                <Box className='mt-4 flex'>
                                    <GrCertificate className='w-6 h-6' />
                                    <p className='font-bold text-gray-700 ml-4'>Accreditations</p>
                                </Box>
                            }
                        </Link>
                    </Box>
                </Box>

                <Box className='mx-8 mt-8'>
                    <p className=' text-[#EC652E] font-semibold'>Settings</p>
                    <Box className='mx-8'>
                        <Link href="/admin/password" style={{ textDecoration: "none" }}>
                            {isActive("/admin/password") ?
                                <Box className='mt-4 flex'>
                                    <FaShieldAlt className='w-6 h-6 text-[#EC652E]' />
                                    <p className='font-bold text-[#EC652E] ml-4'>Change Password</p>
                                </Box> :
                                <Box className='mt-4 flex'>
                                    <FaShieldAlt className='w-6 h-6' />
                                    <p className='font-bold text-gray-700 ml-4'>Change Password</p>
                                </Box>
                            }
                        </Link>
                        <span onClick={() => { logOut() }} className="cursor-pointer">
                            <Box className='mt-4 flex'>
                                <HiOutlineLogout className='w-6 h-6' />
                                <p className='font-bold text-gray-700 ml-4'>Logout</p>
                            </Box>
                        </span>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
