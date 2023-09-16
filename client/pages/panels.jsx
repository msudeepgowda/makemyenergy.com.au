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

export default function Panels() {

    const [paneldata, setPanelData] = useState([]);
    const toast = useToast();

    useEffect(() => {
        axios.get(`/route/productBrandImg/panel`).then((response) => {
            setPanelData(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    const [specPanelData, setSpecPanelData] = useState([])
    const [info, setInfo] = useState(false);

    const specificPanelData = async (brandName) => {
        await axios.get(`/route/productByBrand/panel/${brandName}`).then((response) => {
            setSpecPanelData(response.data);
            setInfo(true);
        }).catch((error) => {
            console.log(error)
        })
    }

    const indexNo = 0;
    const priceNo = 0;

    const router = useRouter();

    const [modelIndexNo, setModelIndexNo] = useState(0);
    const settingIndexNo = (indexx) => { setModelIndexNo(indexx) }

    const [priceNumber, setPriceNumber] = useState(0);
    const settingPriceNumber = (sizeIndex) => { setPriceNumber(sizeIndex) }

    const [panelOrderData, setPanelOrderData] = useState();

    const postPanelOrderData = async (info) => {
        if (localStorage.getItem("makemyenergy_Email") == null) {
            localStorage.setItem("route", "/panels");
            alert("Please Sign In before submitting Order for Review")
            router.push("/signin")
        } else {
            setPanelOrderData(info);
            localStorage.removeItem("route")
            if (panelOrderData !== null) {
                await axios.post(`/route/submitOrder/${localStorage.getItem("makemyenergy_Email")}`, panelOrderData, {
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
            }
            else {
                alert("Kindly Check the product again and please submit the order for review")
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
                            <p className='text-4xl font-extrabold '>Panels</p>
                            <p className='py-[1vh]'>Products / <span className='text-orange-500'>Panels</span> </p>
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
                                {paneldata.map((data, index) => (
                                    <div className='inline-block m-2' key={index}>
                                        <img src={data._id.logo_image_url} className='w-[100px] sm:w-[120px] ' onClick={() => { specificPanelData(data._id.brand) }} alt={data._id.brand} />
                                    </div>
                                ))}
                            </div>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <div className=''>
                                {info && specPanelData[indexNo] ?
                                    <div className=''>
                                        <div className='bg-white p-4 mt-12 rounded-lg shadow-xl'>
                                            {
                                                specPanelData[modelIndexNo] ?
                                                    <img src={specPanelData[modelIndexNo].product_image_url} className='mx-auto' alt={specPanelData[modelIndexNo].brand} />
                                                    :
                                                    <img src={specPanelData[indexNo].product_image_url} className='mx-auto' alt={specPanelData[indexNo].brand} />
                                            }
                                            <hr className='border-1 border-gray-800 w-[90%] m-auto' />
                                            <br />
                                            {
                                                specPanelData[modelIndexNo] ?
                                                    <p className='font-bold'>{specPanelData[modelIndexNo].brand} {specPanelData[modelIndexNo].model}</p>
                                                    :
                                                    <p className='font-bold'>{specPanelData[indexNo].brand} {specPanelData[indexNo].model}</p>
                                            }
                                            {specPanelData[modelIndexNo] ?
                                                <span>
                                                    <p className='py-[0.5vh]'>{specPanelData[modelIndexNo].product_desc}</p>
                                                    <ul className='list-disc mt-[0.5vh] ml-[1vw]'>
                                                        <li>Product Warranty - {specPanelData[modelIndexNo].prod_warranty}</li>
                                                        <li>Efficiency Warranty - {specPanelData[modelIndexNo].efficiancy_warranty}</li>
                                                    </ul>
                                                </span>
                                                :
                                                <span>
                                                    <p className='py-[0.5vh]'>{specPanelData[indexNo].product_desc}</p>
                                                    <ul className='list-disc mt-[0.5vh] ml-[1vw]'>
                                                        <li>Product Warranty - {specPanelData[indexNo].prod_warranty}</li>
                                                        <li>Efficiency Warranty - {specPanelData[indexNo].efficiancy_warranty}</li>
                                                    </ul>
                                                </span>}
                                            <br />

                                            <hr className='border-1 border-gray-800 w-[100%] m-auto' />

                                            <div className='my-4'>
                                                {specPanelData.map((modelss, index) => (
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
                                                {specPanelData[modelIndexNo] ?
                                                    (<a href={specPanelData[modelIndexNo].product_image_url} className='flex flex-row space-x-1' target="__blank">
                                                        <FaFilePdf size={30} className="text-white" />
                                                        <MdDownload size={30} className="text-white" />
                                                    </a>
                                                    )
                                                    :
                                                    (<a href={specPanelData[indexNo].product_image_url} className='flex flex-row space-x-1' target="__blank">
                                                        <FaFilePdf size={30} className="text-white" />
                                                        <MdDownload size={30} className="text-white" />
                                                    </a>
                                                    )
                                                }
                                            </div>

                                            <hr className='border-1 border-gray-800 w-[100%] mx-auto my-4' />

                                            <div className="my-4">
                                                {specPanelData[modelIndexNo] ?
                                                    (specPanelData[modelIndexNo].size.map((sizes, indexs) =>
                                                        priceNumber == indexs ?
                                                            <span key={indexs} onClick={() => { settingPriceNumber(indexs) }} className="m-1 px-[10px] py-2 inline-block flex-auto rounded font-semibold text-base cursor-pointer text-white bg-[#21376C]">
                                                                {sizes}
                                                            </span> :
                                                            <span key={indexs} onClick={() => { settingPriceNumber(indexs) }} className="m-1 px-[10px] py-[5px] inline-block flex-auto rounded font-semibold cursor-pointer hover:bg-[#21376C] hover:text-white text-base text-[#21376C] bg-white border-2 border-[#21376C] ">
                                                                {sizes}
                                                            </span>)
                                                    )
                                                    : (specPanelData[indexNo].size.map((sizing, indexs) =>
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
                                                    {specPanelData[modelIndexNo] ?
                                                        (<p className='my-[1.5vh]'>${specPanelData[modelIndexNo].price[priceNumber]}</p>)
                                                        :
                                                        (<p className='my-[1.5vh]'>${specPanelData[indexNo].price[priceNo]}</p>)
                                                    }
                                                </div>
                                            </div>
                                            <button className='bg-[#21376C] rounded-md text-white py-[8px] text-lg mb-4 font-semibold w-[100%]' onClick={(e) => { postPanelOrderData({ panel_brand: specPanelData[modelIndexNo].brand, panel_model: specPanelData[modelIndexNo].model, panel_size: specPanelData[modelIndexNo].size[priceNumber], panel_number: specPanelData[modelIndexNo].no_of_panels[priceNumber], panel_price: specPanelData[modelIndexNo].price[priceNumber], total_price: specPanelData[modelIndexNo].price[priceNumber], orderType: "Panel", user_id: localStorage.getItem("makemyenergy_Email"), order_date_time: Date().toString() }) }}>Submit order for review -&gt;</button>
                                            <br />
                                            <p>Placeholder for Disclaimer </p>
                                        </div>
                                        <div className='mt-8 mx-auto'>
                                            <div className='w-[280px] sm:w-[320px] bg-pink-100 rounded-md'>
                                                <div className='flex'>
                                                    <p className='p-4 font-bold text-xl inline-block'>Residential &amp; Commercial Solar Systems</p>
                                                    <div className='w-[100%] mt-2 mr-2' ><Image src={Panel} alt="panels" /></div>
                                                </div>
                                                <Link href="/"><button className='bg-[#21376C] text-white ml-[8%] mb-4 p-2 rounded-md font-bold w-[84%]'> Design Now -&gt; </button></Link>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className='mt-[5vh] '>
                                        <div className='w-[280px] sm:w-[320px] bg-pink-100 rounded-md'>
                                            <div className='flex'>
                                                <p className='p-4 font-bold text-xl inline-block'>Residential &amp; Commercial Solar Systems</p>
                                                <div className='w-[100%] mt-2 mr-2' ><Image src={Panel} alt="panels" /></div>
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