import { Box, Container, Grid, GridItem, HStack, Spacer } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import SystemReviewSidebar from '../../components/systemReviewSidebar'
import logo from "../../assets/makemyenergylogo.png"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Dropdownms from '../../components/dropdownms'
import Image from 'next/image'
import panelImg from "../../public/compare/panel.png"
import batteryImg from "../../public/compare/battery.png"
import inverterImg from "../../public/compare/inverter.png"
import SystemReviewSidebarTwo from '../../components/systemReviewSidebarTwo'
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import { AiFillCloseCircle } from 'react-icons/ai'

export default function Inverter() {

    const router = useRouter();
    const [openPanel, setOpenPanel] = useState(false);
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("makemyenergy_Email") === null) {
            router.push("/signin")
        } else {
            axios.get(`/route/getOrder/${localStorage.getItem("makemyenergy_Email")}/systemDesign`, { withCredentials: true })
                .then((res) => { 
                    if(res.data[0]._id !== null){ 
                        setOrderData(res.data) 
                    }})
                .catch(async (error) => {
                    console.log(error)
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
            <main >
                <div>
                    {/* Navbar Starts Here  */}
                    <div className='flex flex-row w-[100vw] justify-between items-center bg-gradient-to-r from-[#FBC2EB]/25 to-[#A6C1EE]/25'>
                        <div className='pl-[2vw] md:pl-[6vw] ml-[8vw] md:ml-[4vw] lg:pl-[0vw] xl:pl-[2vw] 2xl:pl-[6vw]'>
                            <Link href="/"><Image src={logo} className='min-w-[30px] md:min-w-[150px] md:w-[180px] lg:w-[180px] xl:w-[180px] 2xl:w-[180px] h-[12.5vh]' alt='MakeMyEnergy_Logo'></Image></Link>
                        </div>
                        <Dropdownms />
                    </div>
                    {/* Navbar Ends Here  */}
                    {/* Main Container Starts Here  */}
                    <div className='bg-white'>
                        <Container maxW='5xl' className='mt-12' >
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
                                    <HStack>
                                        <Box className='mt-2 font-bold text-3xl'>
                                            My solar system
                                        </Box>
                                        <Spacer />
                                        <Box>
                                            <div className='bg-blue-900 rounded-md items-center justify-center flex flex-row h-[40px] w-[160px]'>
                                                <Link href="/"><p className='text-white font-semibold text-sm'>Design New System</p></Link>
                                            </div>
                                        </Box>
                                    </HStack>
                                    <Box><p className='mt-2 mr-8 text-gray-600'>This is your solar system product and design overview.</p></Box>
                                    <Box>
                                        <HStack className='my-6'>
                                            <Box>
                                                <Image src={panelImg} />
                                            </Box>
                                            <Box>
                                                <Box className='mt-2 font-bold text-2xl'>
                                                    Solar panels
                                                </Box>
                                                <Box className='mt-2 text-base'>
                                                    {orderData !== null ? (orderData[0].panel_brand !== null ? <p>{orderData[0].panel_brand + "  " + orderData[0].panel_model + "  " + orderData[0].panel_size + "  " + " $" + orderData[0].panel_price}</p> : <p></p>) : <p></p>}
                                                </Box>
                                            </Box>
                                        </HStack>
                                        <hr />
                                        <HStack className='my-6'>
                                            <Box>
                                                <Image src={batteryImg} />
                                            </Box>
                                            <Box>
                                                <Box className='mt-2 font-bold text-2xl'>
                                                    Solar battery
                                                </Box>
                                                <Box className='mt-2 text-base'>
                                                    {orderData !== null ? (orderData[0].battery_brand !== null ? <p>{orderData[0].battery_brand + "  " + orderData[0].battery_model + "  " + orderData[0].battery_epsFlag + "  " + " $" + orderData[0].battery_price}</p> : <p></p>) : <p></p>}
                                                </Box>
                                            </Box>
                                        </HStack>
                                        <hr />
                                        <HStack className='my-6'>
                                            <Box>
                                                <Image src={inverterImg} />
                                            </Box>
                                            <Box>
                                                <Box className='mt-2 font-bold text-2xl'>
                                                    Inverter
                                                </Box>
                                                <Box className='mt-2 text-base'>
                                                    {orderData !== null ? (orderData[0].inverter_brand !== null ? <p>{orderData[0].inverter_brand + "  " + orderData[0].inverter_model + "  " + orderData[0].inverter_size + "  " + " $" + orderData[0].inverter_price}</p> : <p></p>) : <p></p>}
                                                </Box>
                                            </Box>
                                        </HStack>
                                        <hr />
                                    </Box>
                                    <Box className='mt-4'>
                                        <p className='font-bold'>System Design Preview</p>
                                        <Box className='text-blue-900 text-3xl font-bold text-center mt-4'>Compare your quotes</Box>
                                    </Box>
                                    <Box className='mt-12 mb-4'>
                                        <Grid
                                            templateColumns={{
                                                sm: 'repeat(3,1fr)',
                                                xl: 'repeat(3,1fr)'
                                            }}
                                            gap={3}
                                        >
                                            <GridItem className='border-2 border-gray-200 rounded-lg shadow-xl'>
                                                <Box className='h-[65px] text-center'>
                                                    <p className='mt-6 font-semibold'> System Size</p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[55px] text-center'>
                                                    <p className='mt-6 font-semibold'> Upfront Price</p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[75px] text-center'>
                                                    <p className='mt-6 font-semibold'> Energy Savings</p>
                                                    <p className='text-xs'>Estimated first year bill reduction</p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[75px] text-center'>
                                                    <p className='mt-6 font-semibold'> STCs</p>
                                                    <p className='text-xs'>Included in price</p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[75px] text-center'> </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[200px] text-center'>
                                                    <p className='mt-20 font-semibold'> System Design</p>
                                                    <p className='text-xs'>Included in price</p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[80px] text-center'>
                                                    <p className='mt-12 font-semibold'> Solar Module</p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[100px] text-center'>
                                                    <p className='mt-16 font-semibold'> Inverter</p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[75px] text-center'>
                                                    <p className='mt-6 font-semibold'>Overall Savings</p>
                                                    <p className='text-xs'>Net present value over 20 years</p>
                                                </Box>
                                            </GridItem>
                                            <GridItem className='border-2 border-gray-200 rounded-lg shadow-xl'>
                                                <Box className='h-[65px] text-center'>
                                                    <p className='mt-6 font-semibold text-3xl'> 6.6 kw</p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[55px] text-center'>
                                                    <p className='mt-6 font-semibold text-[#06A73D]'>$4,750.00</p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[68px] text-center'>
                                                    <p className='mt-8 font-semibold text-[#06A73D]'>$1,560.64</p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[75px] text-center'>
                                                    <p className='mt-6 font-semibold'> -$3,034.00</p>
                                                    <p className='text-xs text-[#335CC0] font-semibold'>82 STCs x $37.00</p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[75px] text-center'> </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[200px] text-center'>
                                                    <p className='mt-20 font-semibold'> </p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[80px] text-center'>
                                                    <p className='mt-12 font-semibold'></p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[100px] text-center'>
                                                    <p className='mt-16 font-semibold'> </p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[75px] text-center'>
                                                    <p className='mt-8 font-semibold'>$32,213.11</p>
                                                </Box>
                                            </GridItem>
                                            <GridItem className='border-2 border-gray-200 rounded-lg shadow-xl'>
                                                <Box className='h-[65px] text-center'>
                                                    <p className='mt-6 font-semibold text-3xl'> 9.68 kw</p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[55px] text-center'>
                                                    <p className='mt-6 font-semibold text-[#06A73D]'>$8,900.00</p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[68px] text-center'>
                                                    <p className='mt-8 font-semibold text-[#06A73D]'>$1,902.23</p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[75px] text-center'>
                                                    <p className='mt-6 font-semibold'>-$4,440.00</p>
                                                    <p className='text-xs text-[#335CC0] font-semibold'>120 STCs x $37.00</p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[75px] text-center'> </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[200px] text-center'>
                                                    <p className='mt-20 font-semibold'> </p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[80px] text-center'>
                                                    <p className='mt-12 font-semibold'></p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[100px] text-center'>
                                                    <p className='mt-16 font-semibold'> </p>
                                                </Box>
                                                <hr className='w-[90%] m-auto border-1 border-gray-500' />
                                                <Box className='h-[75px] text-center'>
                                                    <p className='mt-8 font-semibold'>$35,389.49</p>
                                                </Box>
                                            </GridItem>
                                        </Grid>
                                    </Box>

                                    <Box className='my-8 text-xs text-gray-500'>
                                        <p>
                                            Energy Output is calculated based on historical solar irradiance at the given location. A typical meteorological year is selected using statistical methods.
                                            Factors including panel tilt, orientation (azimuth), and system efficiency are taken into account.
                                        </p><br />
                                        <p>
                                            System efficiency is estimated to account for losses caused by a variety of factors. These factors include intermittent shading, cable losses, dirt, scheduled downtime,
                                            manufacturer tolerances, inverter efficiency for DC to AC (this does not affect off-grid DC only systems), battery round trip efficiency, and other factors.
                                        </p><br />
                                        <p>Utility electricity price inflation is adjusted based on the given location.</p><br />
                                        <p>Australian Small-scale Technology Certificates (STCs) are an incentive provided under the Renewable Energy Target.
                                            One certificate is equal to one megawatt hour of eligible renewable electricity either generated or displaced by the installed system.
                                            Read more at: http://www.cleanenergyregulator.gov.au/RET/Scheme-participants-and-industry/Agents-and-installers/Small-scale-technology-certificates.
                                        </p><br />
                                        <p>
                                            The system design may change based on a detailed site audit.
                                            Estimated savings are based on past electrical usage and utility rates provided by the customer where applicable.
                                            Actual system production and savings will vary based on final system design, configuration, utility rates, applicable subsidies and your energy usage post-solar installation.
                                            Utility rates, charges and fee structures imposed by your utility are not affected by this proposal and are subject to change in the future at the discretion of your utility.
                                            The production calculations in this report are based on historical climate data for the site location and represent typical estimates of future solar production.
                                        </p><br />
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