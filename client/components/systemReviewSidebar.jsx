import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, HStack, Image, Spacer } from '@chakra-ui/react'
import Link from 'next/link'
import axios from "axios";

export default function SystemReviewSidebar() {

    const [progressUrl, setProgressUrl] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("makemyenergy_Email") === null) {
            router.push("/signin");
        } else {
            axios.get(`/route/getUser/${localStorage.getItem("makemyenergy_Email")}`, { withCredentials: true })
                .then((res) => setProgressUrl(res.data[0].progress_url))
                .catch(async (error) => {
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
        <div className='border-r-gray-300 border-r-2 pr-4 fixed w-[16vw] h-[100vh] -mt-8 bg-white z-40 pl-2 '>
            <Flex flexDirection="column" className='h-[70vh] '>
                <Box><p className='text-sm font-medium'>Design Review</p></Box>
                <Box className='mt-6'>
                    <HStack>
                        <Box>
                            <Image
                                src='../Frame430.png'
                            />
                        </Box>
                        <Box>
                            <p className='text-sm font-medium'>INSIDE</p>
                        </Box>
                    </HStack>
                    <Link href="/customerPanel/electricityBill"> <HStack className='w-[100%] mt-2'>
                        <Box>
                            <p className='text-sm font-medium text-gray-600'>Electricity bill</p>
                        </Box>
                        <Spacer />
                        <Box >
                            <Image
                                src='../arrow-right-circle.png'
                            />
                        </Box>
                    </HStack>
                    </Link>
                </Box>
                <Box className='mt-6'>
                    <HStack>
                        <Box>
                            <Image
                                src='../Frame430.png'
                            />
                        </Box>
                        <Box>
                            <p className='text-sm font-medium'>OUTSIDE</p>
                        </Box>
                    </HStack>

                    <Link href="/customerPanel/meterBoard"> <HStack className='w-[100%] mt-2'>
                        <Box>
                            <p className='text-sm font-medium text-gray-600'>Meter Board</p>
                        </Box>
                        <Spacer />
                        <Box >
                            <Image
                                src='../arrow-right-circle.png'
                            />
                        </Box>
                    </HStack> </Link>
                    <Link href="/customerPanel/inverter">  <HStack className='w-[100%] mt-2'>
                        <Box>
                            <p className='text-sm font-medium text-gray-600'>Inverter Location</p>
                        </Box>
                        <Spacer />
                        <Box >
                            <Image
                                src='../arrow-right-circle.png'
                            />
                        </Box>
                    </HStack> </Link>
                    <Link href="/customerPanel/roof"> <HStack className='w-[100%] mt-2'>
                        <Box>
                            <p className='text-sm font-medium text-gray-600'>Roof</p>
                        </Box>
                        <Spacer />
                        <Box >
                            <Image
                                src='../arrow-right-circle.png'
                            />
                        </Box>
                    </HStack>     </Link>
                </Box>
                <Box>
                    {(progressUrl !== null && progressUrl !== undefined) ?
                        <Link href={progressUrl} className='flex flex-row' target="__blank">
                            <Button w="75%" mx="12%" mt="20px" p="10px" colorScheme='gray' ><p className='p-4'>View Proposal</p></Button>
                        </Link>
                        :
                        <Button w="75%" mx="12%" mt="20px" p="10px" colorScheme='gray' isDisabled><p className='p-4'>View Proposal</p></Button>
                    }
                </Box>
                <Spacer />
                <Box>
                    <Box>
                        <HStack className='mb-4'>
                            <Box className='-mt-10'>
                                <Image
                                    src='../idea.png'
                                />
                            </Box>
                            <Box className='w-[80%] text-xs'>
                                Upload items in any order - we need all items to complete the engineering review. <span className='font-bold'>Are you getting confused, Call now.</span>
                            </Box>
                        </HStack>
                        <Box>
                            <Button colorScheme='orange' variant='outline' w="75%" mx="12.5%">
                                Call Now
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </div>
    )
}
