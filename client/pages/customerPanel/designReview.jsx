import { Box, Container, Grid, GridItem, HStack, Spacer, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import SystemReviewSidebar from '../../components/systemReviewSidebar'
import logo from "../../assets/makemyenergylogo.png"
import Image from 'next/image';
import frame from "../../public/Frame430.png"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Dropdownds from '../../components/dropdownds';
import SystemReviewSidebarTwo from '../../components/systemReviewSidebarTwo'
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import { AiFillCloseCircle } from 'react-icons/ai'
import axios from 'axios'

export default function DesignReview() {

    const router = useRouter();
    const [openPanel, setOpenPanel] = useState(false);
    const [firstName, setFirstName] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("makemyenergy_Email") === null) {
            router.push("/signin")
        } else {
            axios.get(`/route/getUser/${localStorage.getItem("makemyenergy_Email")}`, {
                withCredentials: true
            }).then((res) => setFirstName(res.data[0].first_name)
            ).catch(async (error) => {
                if (error.response.status === 401 && (error.response.data === "Access denied, No Token provided" || error.response.data === "Invalid token")) {
                    await axios.get(`/route/logout`).then((response) => {
                        if (response.data === "Logout Successful" && response.status === 200) {
                            localStorage.removeItem("makemyenergy_Email")
                            alert("Please Sign In before submitting Order for Review")
                            router.push("/signin")
                        }
                    }).catch(error => { console.log(error) })
                }
            })
        }
    }, [])

    return (
        <div>
            <Head>
                <title>Make My Energy</title>
                <meta name="description" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <main>
                <div>
                    {/* Navbar Starts Here  */}
                    <div className='flex flex-row w-[100vw] justify-between items-center bg-gradient-to-r from-[#FBC2EB]/25 to-[#A6C1EE]/25'>
                        <div className='pl-[2vw] md:pl-[6vw] ml-[8vw] md:ml-[4vw] lg:pl-[0vw] xl:pl-[2vw] 2xl:pl-[6vw]'>
                            <Link href="/"><Image src={logo} className='min-w-[30px] md:min-w-[150px] md:w-[180px] lg:w-[180px] xl:w-[180px] 2xl:w-[180px] h-[12.5vh]' alt='MakeMyEnergy_Logo'></Image></Link>
                        </div>
                        <Dropdownds />
                    </div>
                    {/* Navbar Ends Here  */}
                    {/* Main Container Starts Here  */}
                    <div className='bg-white mt-[2vh] xl:mt-[10vh]'>
                        <Container maxW='5xl' >
                            <Grid
                                templateColumns={{
                                    sm: 'repeat(2,1fr)',
                                    xl: 'repeat(4,1fr)'
                                }}
                                gap={1}
                            >
                                <GridItem colspan={1} className="hidden xl:block">
                                    <div>
                                        <SystemReviewSidebar />
                                    </div>
                                </GridItem>

                                <GridItem colSpan={3} className="ml-8">
                                    <div className='w-[50px] h-[50px] rounded-full bg-[#21376C] mb-4 xl:hidden'>
                                        <div>
                                            <SlidingPanel
                                                type={'left'}
                                                isOpen={openPanel}
                                            >
                                                <div className="absolute z-10 ml-2 mt-2 text-xl font-bold text-red-600">
                                                    <button onClick={() => setOpenPanel(false)} ><AiFillCloseCircle /></button>
                                                </div>
                                                <SystemReviewSidebarTwo className="mt-4" />

                                            </SlidingPanel>
                                        </div>
                                        <p className='pl-[16px] pt-[10px] text-xl font-bold text-white cursor-pointer' onClick={() => setOpenPanel(true)}>🡺</p>
                                    </div>
                                    <Box>{(firstName !== null) ?
                                        <p className='text-2xl font-bold'>Welcome to the make my energy family, {firstName}!</p> :
                                        <p className='text-2xl font-bold'>Welcome to the make my energy family,</p>
                                    }</Box>
                                    <Box><p className='mt-4 mr-8 text-gray-600'>To complete your solar design system review, our engineering team needs you take a few photos and upload your electricity bills.</p></Box>
                                    <Box className='mt-6'>
                                        <HStack className='align-top'>
                                            <VStack spacing="0">
                                                <Box className='w-14'>
                                                    <Image
                                                        src={frame}
                                                        alt="frame"
                                                    />
                                                </Box>
                                                <Box>
                                                    <p className='text-gray-900 text-md'>2 min</p>
                                                </Box>
                                            </VStack>
                                            <Box className='w-[50%] pl-2'>
                                                <Box><p className='text-2xl font-semibold'>Indoor task</p></Box>
                                                <Box><p className='text-sm text-gray-600'>Gather your electricity bill and financial application as soon as you can.</p></Box>
                                            </Box>
                                            <Spacer />
                                            <Box>
                                                <div className='bg-blue-900 ml-[4vw] rounded-md items-center justify-center flex flex-row h-[40px] w-[150px]'>
                                                    <Link href="/customerPanel/electricityBill"><p className='text-white font-semibold text-sm cursor-pointer'>Start Indoor Task</p></Link>
                                                </div>
                                            </Box>
                                        </HStack>
                                    </Box>
                                    <hr className='mt-8 border-1 border-gray-400' />
                                    <Box className='mt-6'>
                                        <HStack className='align-top'>
                                            <VStack spacing="0">
                                                <Box className='w-14'>
                                                    <Image
                                                        src={frame}
                                                        alt="frame"
                                                    />
                                                </Box>
                                                <Box>
                                                    <p className='text-gray-900 text-md'>7 min</p>
                                                </Box>
                                            </VStack>
                                            <Box className='w-[50%] pl-2'>
                                                <Box><p className='text-2xl font-semibold'>Outdoor task</p></Box>
                                                <Box><p className='text-sm text-gray-600'>Head outside and take a few photos straight from this dashboard on your mobile.</p></Box>
                                            </Box>
                                            <Spacer />
                                            <Box>
                                                <div className='bg-blue-900 ml-[4vw] rounded-md items-center justify-center flex flex-row h-[40px] w-[150px]'>
                                                    <Link href="/customerPanel/meterBoard"><p className='text-white font-semibold text-sm cursor-pointer'>Start Outdoor Task</p></Link>
                                                </div>
                                            </Box>
                                        </HStack>
                                    </Box>
                                    <Box className='mt-8'>
                                        <p className='font-semibold'>Watch the video guide</p>
                                        <Box className='mt-2'>
                                            <iframe className='rounded' width="230" height="120" src="https://www.youtube.com/embed/xKxrkht7CpY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
                                        </Box>
                                    </Box>
                                </GridItem>
                            </Grid>
                        </Container>
                    </div>
                </div>
            </main >
        </div >
    )
}