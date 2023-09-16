import Head from 'next/head'
import Link from 'next/link';
import Dropdown from '../components/dropdown';
import Image from 'next/image';
import logo from "../assets/makemyenergylogo.png";
import { Box, GridItem } from '@chakra-ui/react';
import TopFooter from '../components/topfooter';

export default function ContactUs() {

    return (
        <div className='h-[100vh]'>
            <Head>
                <title>Make My Energy</title>
                <meta name="description" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
            </Head>
            <main className='h-[90vh]'>
                <div>
                    <div className='bg-gradient-to-r from-[#A6C1EE]/20 to-[#FBC2EB]/30 h-[30vh]'>
                        <div className='flex flex-row w-[97.5vw] md:min-w-[99.2vw] md:max-w-[99.2vw] pr-[10vw] md:pr-[0vw] justify-between items-center bg-gradient-to-r from-[#FBC2EB]/25 to-[#A6C1EE]/25'>
                            <div className='pl-[2vw] md:pl-[0vw] ml-[8vw] md:ml-[4vw] lg:pl-[-2vw] xl:pl-[2vw] 2xl:pl-[6vw]'>
                                <Link href="/"><Image src={logo} className='min-w-[30px] md:min-w-[150px] md:w-[150px] lg:w-[140px] xl:w-[160px] 2xl:w-[180px] h-[12.5vh]' alt='MakeMyEnergy_Logo'></Image></Link>
                            </div>
                            <Dropdown />
                            {/* Ending Nav Bar  */}
                        </div>
                        <div className='w-full items-center flex flex-col mt-[5vh]'>
                            <p className='text-4xl font-extrabold '>Contact Us</p>
                            <p className='py-[1vh]'>About Us / <span className='text-orange-500'>Associations</span> </p>
                        </div>
                    </div>
                    {/* Contact Us Content Start Here  */}
                    <div className='bg-white pl-[11vw] pr-[8vw] w-full items-center justify-center my-[10vh] flex flex-row space-x-[5vw] pt-[20px]'>
                        <GridItem>
                            <Box className='mt-6 m-auto w-[100%]'>
                                <ul className='mt-5 space-y-2 text-lg'>
                                    <li><bold className='font-medium'>Address 1:</bold> Suite 1, Level 1, 27-31 Myers Street, Geelong VIC 3220</li>
                                    <li><bold className='font-medium'>Address 2:</bold> Suit 503 Level 2161 King Street Newcastle, NSW 2300</li>
                                    <li><bold className='font-medium'>Mail At:</bold> hello@makemyenergy.com.au</li>
                                    <li>1300 377 777</li>
                                </ul>
                            </Box>
                        </GridItem>
                        <GridItem>
                            <Box className='mt-6 m-auto w-[90%]'>
                                <p className='text-xl font-bold'>Reach Us</p>
                                <textarea name="" className='bg-gray-300 mt-4 rounded-lg' cols="27" rows="6"></textarea>
                            </Box>
                        </GridItem>
                    </div>
                </div>
            </main>
            <footer className='h-[10vh]'>
                <TopFooter />
            </footer>
        </div>
    )
}