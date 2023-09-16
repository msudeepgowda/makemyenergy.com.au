import {
    Box,
    Button,
    HStack,
    TableContainer,
    Table,
    Tr,
    Th,
    Tbody,
    Td,
    Thead,
    useDisclosure,
    useToast,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    InputGroup,
    InputRightElement
  } from '@chakra-ui/react'
  import Head from 'next/head'
  import { BsFillPersonFill } from 'react-icons/bs'
  import { AiOutlineBell, AiFillFilePdf } from 'react-icons/ai'
  import AdminSidebar from '../../components/adminSidebar'
  import { useRef, useState, useEffect } from 'react';
  import axios from 'axios'
  import { useForm } from "react-hook-form";
  import { MdEdit } from 'react-icons/md'
  import { useRouter } from 'next/router'
  
  
  export default function Accrediations() {
  
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const toast = useToast()

  
  
    return (
      <Box>
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
          {/* Main Container Starts Here  */}
          <Box className='bg-white'>
            <HStack>
              <AdminSidebar />
  
              <Box className='w-[78vw] bg-gray-100 h-[100vh] px-8'>
                <Box className='mt-6 mx-6 flex justify-end'>
                  <BsFillPersonFill className='w-6 h-6' />
                  <AiOutlineBell className='w-6 h-6 ml-4' />
                </Box>
                <Box className=' mt-8 flex font-semibold'>
                  <p className=' text-gray-500'>Dashboard &gt; </p>
                  <p className='text-[#EC652E] ml-2'>Change Passwords</p>
                </Box>
                <Box className='border-2 border-[#EC652E] rounded mt-8 mx-[20%] bg-white'>
                    <Box className='mt-8 px-8'>
                        <p className='text-center text-[35px] text-orange-700'>Change Password</p>
                    <InputGroup size='md' className='border-orange-700 my-8'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter Current password'
                        className='text-orange-600'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                    </InputGroup>

                    <InputGroup size='md' className='border-orange-700 my-8'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter New password'
                        className='text-orange-600'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                    </InputGroup>

                    <InputGroup size='md' className='border-orange-700 my-8'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Confirm New Password'
                        className='text-orange-600'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                    </Box>
                </Box>
              </Box>
            </HStack>
          </Box>
        </main >
      </Box >
    )
  }