import Head from 'next/head'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Grid, GridItem } from '@chakra-ui/react';
import accrediation_1 from '../assets/Accrediation1.png';
import accrediation_2 from '../assets/Accrediation2.png';
import Navbar from '../components/navbar';
import TopFooter from '../components/topfooter';

export default function Associations() {

    const [associationImage, setAssociationImage] = useState([]);
    const [accreditationsPdf, setAccreditationsPdf] = useState([]);

    useEffect(() => {
        axios.get('/route/imageRepo').then((res) => setAssociationImage(res.data)).catch((err) => console.log(err))
        axios.get("/route/certRepo").then((res) => { setAccreditationsPdf(res.data) }).catch((err) => console.log(err))
    }, []);

    return (
        <div>
            <Head>
                <title>Make My Energy</title>
                <meta name="description" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
            </Head>
            <main>
                <div>
                    <div className='bg-gradient-to-r from-[#A6C1EE]/20 to-[#FBC2EB]/30 h-[30vh]'>
                    <Navbar />
                        <div className='w-full items-center flex flex-col mt-[5vh]'>
                            <p className='text-4xl font-extrabold '>Associations</p>
                            <p className='py-[1vh]'>About Us / <span className='text-orange-500'>Associations</span> </p>
                        </div>
                    </div>
                    {/* Logo Section Starts  */}
                    <div className='bg-white pl-[11vw] pr-[8vw] w-full items-center justify-center my-[5vh]'>
                        <Grid
                            templateColumns={{
                                sm: 'repeat(2,1fr)',
                                md: 'repeat(4,1fr)',
                                xl: 'repeat(4,1fr)'
                            }}
                            gap={4}
                            className=' mx-auto'
                        >
                            <GridItem colSpan={4}  >
                                <div className='mt-6'>
                                    {associationImage.map((association) => (
                                        <div key={association._id} className='inline-block m-2'>
                                            <img src={association.logo_image_url} className='w-[150px] sm:w-[150px] ' alt={association.brand} />
                                        </div>
                                    ))}
                                </div>
                            </GridItem>
                        </Grid>
                    </div>
                    {/* Logo Section Ends  */}
                    {/* Accreditations Section Starts  */}
                    <div className='flex flex-col items-center bg-gradient-to-r from-[#FFD1FF]/40 to-[#FAD0C4]/30 rounded-md pb-16'>
                        <p className='text-3xl pt-[5vh] pb-[2.5vh] font-extrabold'>Accreditations</p>
                        <span className='flex flex-row'>
                            {
                                accreditationsPdf[0] != null ?
                                    <a href={accreditationsPdf[0].cert_url} className='flex flex-row' target="__blank">
                                        <Image src={accrediation_1} className='w-[45%] h-[13vh] mt-[2vh]' alt="logo" />
                                        <Image src={accrediation_2} className='w-[45%] ml-[5%] h-[18vh]' alt="logo" />
                                    </a>
                                    :
                                    <span className='flex flex-row '>
                                        <Image src={accrediation_1} className='w-[45%] h-[13vh] mt-[2vh]' alt="logo" />
                                        <Image src={accrediation_2} className='w-[45%] ml-[5%] h-[18vh]' alt="logo" />
                                    </span>
                            }
                        </span>
                    </div>
                    {/* Accreditations Section Ends  */}
                    {/* Additional Footer Starts Here  */}
                    <TopFooter />
                    {/* Additional Footer Ends Here  */}
                </div>
            </main>
        </div>
    )
}