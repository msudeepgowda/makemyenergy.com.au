import { Box, GridItem, SimpleGrid } from '@chakra-ui/react';
import Image from 'next/image';
import { TiSocialFacebookCircular, TiSocialInstagram } from 'react-icons/ti';
import logo from "../assets/makemyenergylogo.png";
import Link from 'next/link';

const TopFooter = () => {
  return (
    <div className='bg-gray-100'>
      <div className='flex flex-row space-x-[5vw] ml-auto'>
        <SimpleGrid columns={[null, 2, 4, 4]} spacing={4} maxW='6xl' className='mx-auto mt-10  ' >
          <GridItem>
            <Box className='m-auto w-[90%] mt-2 space-y-5'>
              <Image src={logo} className='w-[70%] h-[12.5vh]'></Image>
              <p className='text-lg'>We take pride in digitalizing the traditional approach of promoting solar energy and incresing tranparency throughout the process resulting in most cost-effective solution.</p>
              <div className='flex flex-row space-x-2'>
                <a href='https://www.facebook.com/Makemyenergy' target="_blank" rel="noreferrer"><TiSocialFacebookCircular size={32} /></a>
                <a href='https://www.instagram.com/makemyenergy/' target="_blank" rel="noreferrer"><TiSocialInstagram size={30} /></a>
              </div>
            </Box>
          </GridItem>
          <GridItem>
            <Box className='mt-6 m-auto w-[90%]'>
              <p className='text-xl font-bold'>Quick Links</p>
              <ul className='mt-4 space-y-1 text-lg'>
                <Link href="/"><li className='py-2 pt-4'>Home</li></Link>
                <Link href="/"><li className='py-2'>Solar PV System</li></Link>
                <Link href="/contact"><li className='py-2'>Contact Us</li></Link>
              </ul>
            </Box>
          </GridItem>
          <GridItem>
            <Box className='mt-6 m-auto w-[90%]'>
              <p className='text-xl font-bold'>Contact Us</p>
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
        </SimpleGrid>
      </div>
      <div>
      <footer className='bg-white p-2'>
            <p className='text-center text-lg'>@2023 Makemyenergy, All Rights Reserved</p>
        </footer>
      </div>
    </div>
  )
}

export default TopFooter;