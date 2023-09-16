import Head from 'next/head';
import Image from 'next/image';
import Panel from "../assets/solarpanel.png";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from "axios";
import { Grid, GridItem, useToast } from '@chakra-ui/react';
import { FaFilePdf } from "react-icons/fa"
import { MdDownload } from "react-icons/md"
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar';
import TopFooter from '../components/topfooter';

export default function Battery() {

    const [batteryData, setBatteryData] = useState([]);
    const toast = useToast();

    useEffect(() => {
        axios.get('/route/productBrandImg/battery').then((response) => {
            setBatteryData(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    const [specBatteryData, setSpecBatteryData] = useState([])
    const [info, setInfo] = useState(false);

    const specificBatteryData = async (brandName) => {
        await axios.get(`/route/productByBrand/battery/${brandName}`).then((response) => {
            setSpecBatteryData(response.data);
            setInfo(true);
        }).catch((error) => {
            console.log(error)
        })
    }

    const indexNo = 0;

    const router = useRouter();

    const [modelIndexNo, setModelIndexNo] = useState(0);
    const settingIndexNo = (indexx) => { setModelIndexNo(indexx) };

    // const [priceNumber, setPriceNumber] = useState("with_eps");
    // const settingPriceNumber = (sizeIndex) => { setPriceNumber(sizeIndex) }

    const [epsInfo, setEpsInfo] = useState("");

    const epsTrue = () => { setEpsInfo("with_eps") };
    const epsFalse = () => { setEpsInfo("without_eps") };

    const [batteryOrderData, setBatteryOrderData] = useState();

    const postBatteryOrderData = async (info) => {
        if (localStorage.getItem("makemyenergy_Email") === null) {
            localStorage.setItem("route", "/battery");
            alert("Please Sign In before submitting Order for Review")
            router.push("/signin")
        } else {
            setBatteryOrderData(info);
            localStorage.removeItem("route")
            if (batteryOrderData !== null) {
                await axios.post(`/route/submitOrder/${localStorage.getItem("makemyenergy_Email")}`, batteryOrderData, {
                    withCredentials: true
                }).then((response) => {
                    if (response.data === "Order added successfully" && response.status == 201) {
                        toast({
                            title: response.data,
                            description: "We will get back to you soon.",
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        })
                    }
                }).catch(async (error) => {
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
            } else {
                alert("Kindly Check the product again and submit the order for review ")
            }
        }
    };

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
                    <div className='bg-gradient-to-r from-[#A6C1EE]/20 to-[#FBC2EB]/30 h-[30vh]'>
                        {/* Navbar Starts Here  */}
                        <Navbar />
                        {/* Ending Nav Bar  */}
                        <div className='w-full items-center flex flex-col mt-[5vh]'>
                            <p className='text-4xl font-extrabold '>Battery</p>
                            <p className='py-[1vh]'>Products / <span className='text-orange-500'>Battery</span> </p>
                        </div>
                    </div>
                    {/* Logo Section Starts  */}
                    <Grid
                        templateColumns={{
                            sm: 'repeat(2,1fr)',
                            md: 'repeat(6,1fr)',
                            xl: 'repeat(6,1fr)'
                        }}
                        gap={4}
                        className='w-[70%] mx-auto bg-white'
                    >
                        <GridItem colSpan={4}  >
                            <div className=' mt-6'>
                                {batteryData.map((data, index) => (
                                    <div className='inline-block m-2' key={index}>
                                        <img src={data._id.logo_image_url} className='w-[100px] sm:w-[120px] ' onClick={() => { specificBatteryData(data._id.brand) }} alt={data._id.brand} />
                                    </div>
                                ))}
                            </div>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <div>
                                {info && specBatteryData[indexNo] ?
                                    <div className=''>
                                        <div className='bg-white p-4 mt-12 rounded-lg shadow-xl'>
                                            {
                                                specBatteryData[modelIndexNo] ?
                                                    <img src={specBatteryData[modelIndexNo].product_image_url} className='mx-auto' alt={specBatteryData[modelIndexNo].brand} />
                                                    :
                                                    <img src={specBatteryData[indexNo].product_image_url} className='mx-auto' alt={specBatteryData[indexNo].brand} />
                                            }
                                            <hr className='border-1 border-gray-800 w-[90%] m-auto' />
                                            <br />
                                            {
                                                specBatteryData[modelIndexNo] ?
                                                    <p className='font-bold'>{specBatteryData[modelIndexNo].brand} {specBatteryData[modelIndexNo].model}</p>
                                                    :
                                                    <p className='font-bold'>{specBatteryData[indexNo].brand} {specBatteryData[indexNo].model}</p>
                                            }
                                            {specBatteryData[modelIndexNo] ?
                                                <span>
                                                    <p className='py-[0.5vh]'>{specBatteryData[modelIndexNo].product_desc}</p>
                                                    <ul className='list-disc mt-[0.5vh] ml-[1vw]'>
                                                        <li>Product Warranty - {specBatteryData[modelIndexNo].prod_warranty}</li>
                                                        <li>Efficiency Warranty - {specBatteryData[modelIndexNo].efficiancy_warranty}</li>
                                                    </ul>
                                                </span>
                                                :
                                                <span>
                                                    <p className='py-[0.5vh]'>{specBatteryData[indexNo].product_desc}</p>
                                                    <ul className='list-disc mt-[0.5vh] ml-[1vw]'>
                                                        <li>Product Warranty - {specBatteryData[indexNo].prod_warranty}</li>
                                                        <li>Efficiency Warranty - {specBatteryData[indexNo].efficiancy_warranty}</li>
                                                    </ul>
                                                </span>}
                                            <br />

                                            <hr className='border-1 border-gray-800 w-[100%] m-auto' />

                                            <div className='my-4'>
                                                {specBatteryData.map((modelss, index) => (
                                                    modelIndexNo == index ?
                                                        <span key={index} onClick={() => { settingIndexNo(index) }} className="m-1 px-[24px] py-2 inline-block flex-auto rounded font-semibold text-base cursor-pointer text-white bg-[#21376C]">
                                                            {modelss.model}
                                                        </span> :
                                                        <span key={index} onClick={() => { settingIndexNo(index) }} className="m-1 px-[24px] py-[5px] inline-block flex-auto rounded font-semibold cursor-pointer hover:bg-[#21376C] hover:text-white text-base text-[#21376C] bg-white border-2 border-[#21376C]">
                                                            {modelss.model}
                                                        </span>
                                                ))}
                                            </div>

                                            <div className='bg-[#21376C] py-2 w-[100%] mb-2 m-auto flex flex-col items-center justify-center rounded-md'>
                                                {specBatteryData[modelIndexNo] ?
                                                    (<a href={specBatteryData[modelIndexNo].product_image_url} className='flex flex-row space-x-1' target="__blank">
                                                        <FaFilePdf size={30} className="text-white" />
                                                        <MdDownload size={30} className="text-white" />
                                                    </a>
                                                    )
                                                    :
                                                    (<a href={specBatteryData[indexNo].product_image_url} className='flex flex-row space-x-1' target="__blank">
                                                        <FaFilePdf size={30} className="text-white" />
                                                        <MdDownload size={30} className="text-white" />
                                                    </a>
                                                    )
                                                }
                                            </div>

                                            <hr className='border-1 border-gray-800 w-[100%] mx-auto my-4' />

                                            <div className="my-4">
                                                {
                                                    epsInfo == "with_eps" ?
                                                        <span>
                                                            <span onClick={() => { epsTrue() }} className="m-1 px-[10px] py-2 inline-block flex-auto rounded font-semibold text-base cursor-pointer text-white bg-[#21376C]">
                                                                With Eps
                                                            </span>
                                                            <span onClick={() => { epsFalse() }} className="m-1 px-[10px] py-[5px] inline-block flex-auto rounded font-semibold cursor-pointer hover:bg-[#21376C] hover:text-white text-base text-[#21376C] bg-white border-2 border-[#21376C] ">
                                                                Without Esp
                                                            </span>
                                                        </span>
                                                        : <span>
                                                            <span onClick={() => { epsTrue() }} className="m-1 px-[10px] py-[5px] inline-block flex-auto rounded font-semibold cursor-pointer hover:bg-[#21376C] hover:text-white text-base text-[#21376C] bg-white border-2 border-[#21376C] ">
                                                                With Esp
                                                            </span>
                                                            <span onClick={() => { epsFalse() }} className="m-1 px-[10px] py-2 inline-block flex-auto rounded font-semibold text-base cursor-pointer text-white bg-[#21376C]">
                                                                Without Eps
                                                            </span>
                                                        </span>
                                                }
                                            </div>

                                            <hr className='border-1 border-gray-800 w-[100%] mx-auto my-2' />
                                            <div className='flex justify-between px-4 text-[#21376C] font-bold'>
                                                <div><p className='my-[1.5vh]'>Estimated Price</p></div>
                                                <div>
                                                    {
                                                        epsInfo == "with_eps" ?
                                                            (<p className='my-[1.5vh]'>${specBatteryData[modelIndexNo].with_eps}</p>)
                                                            :
                                                            (<p className='my-[1.5vh]'>${specBatteryData[modelIndexNo].without_eps}</p>)
                                                    }
                                                </div>
                                            </div>
                                            <button className='bg-[#21376C] rounded-md text-white py-[8px] text-lg mb-4 font-semibold w-[100%]' onClick={(e) => { postBatteryOrderData({ battery_brand: specBatteryData[modelIndexNo].brand, battery_model: specBatteryData[modelIndexNo].model, battery_epsFlag: epsInfo, orderType: "Battery", user_id: localStorage.getItem("makemyenergy_Email"), order_date_time: Date().toString() }) }}>Submit order for review -&gt;</button>
                                            <br />
                                            <p>Placeholder for Disclaimer </p>
                                        </div>
                                        <div className='mt-8 mx-auto'>
                                            <div className='w-[280px] sm:w-[320px] bg-pink-100 rounded-md'>
                                                <div className='flex'>
                                                    <p className='p-4 font-bold text-xl inline-block'>Residential &amp; Commercial Solar Systems</p>
                                                    <div className='w-[100%] mt-2 mr-2' ><Image src={Panel} alt="" /></div>
                                                </div>
                                                <Link href="/"><button className='bg-[#21376C] text-white ml-[8%] mb-4 p-2 rounded-md font-bold w-[84%]'> Design Now -&gt; </button></Link>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className='mt-[5vh] mb-8'>
                                        <div className='w-[280px] sm:w-[320px] bg-pink-100 rounded-md'>
                                            <div className='flex'>
                                                <p className='p-4 font-bold text-xl inline-block'>Residential &amp; Commercial Solar Systems</p>
                                                <div className='w-[100%] mt-2 mr-2' ><Image src={Panel} alt="" /></div>
                                            </div>
                                            <Link href="/"><button className='bg-[#21376C] text-white ml-[8%] mb-4 p-2 rounded-md font-bold w-[84%]'> Design Now -&gt; </button></Link>
                                        </div>
                                    </div>
                                }
                            </div>
                        </GridItem>
                    </Grid>
                    {/* Logo Section Ends  */}
                    {/* Additional Footer Starts Here  */}
                    <TopFooter />
                    {/* Additional Footer Ends Here  */}
                </div>
            </main>
        </div>
    )
}