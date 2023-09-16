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

export default function EV_Charger() {

    const [evChargerData, setEvChargerData] = useState([]);
    const toast = useToast();

    useEffect(() => {
        axios.get('/route/productBrandImg/charger').then((response) => {
            setEvChargerData(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    const [specEvChargerData, setSpecEvChargerData] = useState([])
    const [info, setInfo] = useState(false);

    const specificEvChargerData = async (brandName) => {
        await axios.get(`/route/productByBrand/charger/${brandName}`).then((response) => {
            setSpecEvChargerData(response.data);
            setInfo(true);
        }).catch((error) => {
            console.log(error)
        })
    }

    const indexNo = 0;

    const [modelIndexNo, setModelIndexNo] = useState(0);
    const settingIndexNo = (indexx) => { setModelIndexNo(indexx) };

    const router = useRouter();

    const priceNo = 0;

    const [priceNumber, setPriceNumber] = useState(0);
    const settingPriceNumber = (sizeIndex) => { setPriceNumber(sizeIndex) }

    const [evChargerOrderData, setEvChargerOrderData] = useState();

    const postEvChargerOrderData = async (info) => {
        if (localStorage.getItem("makemyenergy_Email") == null) {
            localStorage.setItem("route", "/ev_charger");
            alert("Please Sign In before submitting Order for Review")
            router.push("/signin")
        } else {
            setEvChargerOrderData(info);
            localStorage.removeItem("route")
            if (evChargerOrderData != null) {
                await axios.post(`/route/submitOrder/${localStorage.getItem("makemyenergy_Email")}`, evChargerOrderData, {
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
                        <Navbar />
                        <div className='w-full items-center flex flex-col mt-[5vh]'>
                            <p className='text-4xl font-extrabold '>EV Charger</p>
                            <p className='py-[1vh]'>Products / <span className='text-orange-500'>EV Charger</span> </p>
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
                                {evChargerData.map((data, index) => (
                                    <div className='inline-block m-2' key={index}>
                                        <img src={data._id.logo_image_url} className='w-[100px] sm:w-[120px] ' onClick={() => { specificEvChargerData(data._id.brand) }} alt={data._id.brand} />
                                    </div>
                                ))}
                            </div>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <div className=''>
                                {info && specEvChargerData[indexNo] ?
                                    <div className=''>
                                        <div className='bg-white p-4 mt-12 rounded-lg shadow-xl'>
                                            {
                                                specEvChargerData[modelIndexNo] ?
                                                    <img src={specEvChargerData[modelIndexNo].product_image_url} className='mx-auto' alt={specEvChargerData[modelIndexNo].brand} />
                                                    :
                                                    <img src={specEvChargerData[indexNo].product_image_url} className='mx-auto' alt={specEvChargerData[indexNo].brand} />
                                            }
                                            <hr className='border-1 border-gray-800 w-[90%] m-auto' />
                                            <br />
                                            {
                                                specEvChargerData[modelIndexNo] ?
                                                    <p className='font-bold'>{specEvChargerData[modelIndexNo].brand} {specEvChargerData[modelIndexNo].model}</p>
                                                    :
                                                    <p className='font-bold'>{specEvChargerData[indexNo].brand} {specEvChargerData[indexNo].model}</p>
                                            }
                                            {specEvChargerData[modelIndexNo] ?
                                                <span>
                                                    <p className='py-[0.5vh]'>{specEvChargerData[modelIndexNo].product_desc}</p>
                                                    <ul className='list-disc mt-[0.5vh] ml-[1vw]'>
                                                        <li>Product Warranty - {specEvChargerData[modelIndexNo].prod_warranty}</li>
                                                        <li>Efficiency Warranty - {specEvChargerData[modelIndexNo].efficiancy_warranty}</li>
                                                    </ul>
                                                </span>
                                                :
                                                <span>
                                                    <p className='py-[0.5vh]'>{specEvChargerData[indexNo].product_desc}</p>
                                                    <ul className='list-disc mt-[0.5vh] ml-[1vw]'>
                                                        <li>Product Warranty - {specEvChargerData[indexNo].prod_warranty}</li>
                                                        <li>Efficiency Warranty - {specEvChargerData[indexNo].efficiancy_warranty}</li>
                                                    </ul>
                                                </span>}
                                            <br />

                                            <hr className='border-1 border-gray-800 w-[100%] m-auto' />

                                            <div className='my-4'>
                                                {specEvChargerData.map((modelss, index) => (
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
                                                {specEvChargerData[modelIndexNo] ?
                                                    (<a href={specEvChargerData[modelIndexNo].product_image_url} className='flex flex-row space-x-1' target="__blank">
                                                        <FaFilePdf size={30} className="text-white" />
                                                        <MdDownload size={30} className="text-white" />
                                                    </a>
                                                    )
                                                    :
                                                    (<a href={specEvChargerData[indexNo].product_image_url} className='flex flex-row space-x-1' target="__blank">
                                                        <FaFilePdf size={30} className="text-white" />
                                                        <MdDownload size={30} className="text-white" />
                                                    </a>
                                                    )
                                                }
                                            </div>

                                            <hr className='border-1 border-gray-800 w-[100%] mx-auto my-4' />

                                            <div className="my-4">
                                                {specEvChargerData[modelIndexNo] ?
                                                    (specEvChargerData[modelIndexNo].size.map((sizes, indexs) =>
                                                        priceNumber == indexs ?
                                                            <span key={indexs} onClick={() => { settingPriceNumber(indexs) }} className="m-1 px-[10px] py-2 inline-block flex-auto rounded font-semibold text-base cursor-pointer text-white bg-[#21376C]">
                                                                {sizes}
                                                            </span> :
                                                            <span key={indexs} onClick={() => { settingPriceNumber(indexs) }} className="m-1 px-[10px] py-[5px] inline-block flex-auto rounded font-semibold cursor-pointer hover:bg-[#21376C] hover:text-white text-base text-[#21376C] bg-white border-2 border-[#21376C] ">
                                                                {sizes}
                                                            </span>)
                                                    )
                                                    : (specEvChargerData[indexNo].size.map((sizing, indexs) =>
                                                        priceNumber == indexs ?
                                                            <span key={indexs} onClick={() => { settingPriceNumber(indexs) }} className="m-1 px-[10px] py-2 inline-block flex-auto rounded font-semibold text-base cursor-pointer text-white bg-[#21376C]">
                                                                {sizing}
                                                            </span> :
                                                            <span key={indexs} onClick={() => { settingPriceNumber(indexs) }} className="m-1 px-[10px] py-[5px] inline-block flex-auto rounded font-semibold cursor-pointer hover:bg-[#21376C] hover:text-white text-base text-[#21376C] bg-white border-2 border-[#21376C] ">
                                                                {sizing}
                                                            </span>))
                                                }
                                            </div>
                                            <hr className='border-1 border-gray-800 w-[100%] mx-auto my-2' />
                                            <div className='flex justify-between px-4 text-[#21376C] font-bold'>
                                                <div><p className='my-[1.5vh]'>Estimated Price</p></div>
                                                <div>
                                                    {specEvChargerData[modelIndexNo] ?
                                                        (<p className='my-[1.5vh]'>${specEvChargerData[modelIndexNo].price[priceNumber]}</p>)
                                                        :
                                                        (<p className='my-[1.5vh]'>${specEvChargerData[indexNo].price[priceNo]}</p>)
                                                    }
                                                </div>
                                            </div>
                                            <button className='bg-[#21376C] rounded-md text-white py-[8px] text-lg mb-4 font-semibold w-[100%]' onClick={(e) => { postEvChargerOrderData({ ev_charger_brand: specEvChargerData[modelIndexNo].brand, ev_charger_model: specEvChargerData[modelIndexNo].model, ev_charger_phase: specEvChargerData[modelIndexNo].phase, ev_charger_size: specEvChargerData[modelIndexNo].size[priceNumber], ev_charger_price: specEvChargerData[modelIndexNo].price[priceNumber], total_price: specEvChargerData[modelIndexNo].price[priceNumber], orderType: "EV Charger", user_id: localStorage.getItem("makemyenergy_Email"), order_date_time: Date().toString() }) }}>Submit order for review -&gt;</button>
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
                    <TopFooter />
                </div>
            </main>
        </div>
    )
}