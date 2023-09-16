import { Box, HStack, TableContainer, Table, Tr, Th, Tbody, Td, Thead, InputGroup, Input, InputRightAddon, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import Head from 'next/head'
import { BsFillPersonFill, BsSearch } from 'react-icons/bs'
import { AiOutlineBell } from 'react-icons/ai'
import AdminSidebar from '../../components/adminSidebar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import Link from 'next/link'

export default function Quotation() {

    const [orders, setOrders] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(null);

    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("makemyenergy_Admin_Email") === null) {
            router.push("/admin/signin")
        } else {
            axios.get(`/route/getAllUser`, {
                withCredentials: true,
                headers: {
                    'admin-email': localStorage.getItem("makemyenergy_Admin_Email")
                }
            })
                .then((res) => { })
                .catch(async (error) => {
                    if (error.response.status === 401 && (error.response.data === "Access denied, No Token provided" || error.response.data === "Invalid token")) {
                        await axios.get(`/route/adminLogout`).then((response) => {
                            if (response.data === "Logout Successful" && response.status === 200) {
                                localStorage.removeItem("makemyenergy_Admin_Email")
                                router.push("/admin/signin")
                            }
                        }).catch(error => { console.log(error) })
                    }
                })
            axios.get(`/route/getAllOrders`, {
                withCredentials: true,
                headers: {
                    'admin-email': localStorage.getItem("makemyenergy_Admin_Email")
                }
            })
                .then((res) => { setOrders(res.data) })
                .catch(async (error) => {
                    if (error.response.status === 401 && (error.response.data === "Access denied, No Token provided" || error.response.data === "Invalid token")) {
                        await axios.get(`/route/adminLogout`).then((response) => {
                            if (response.data === "Logout Successful" && response.status === 200) {
                                localStorage.removeItem("makemyenergy_Admin_Email")
                                router.push("/admin/signin")
                            }
                        }).catch(error => { console.log(error) })
                    }
                })
        }
    }, [])

    function ShowContent() {

        if (data.orderType == "Panel") {
            return (
                <Box className='text-lg'>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Order Type :</span> {data?.orderType}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>User Id :</span> {data?.user_id}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Panel Brand :</span> {data?.panel_brand}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Panel Model :</span> {data?.panel_model}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Panel Size :</span> {data?.panel_size}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Number Of Panels :</span> {data?.panel_number}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Total Prize :</span> {data?.total_price}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Time/Date :</span> {Date(data.order_date_time).toLocaleString("en-US", { timeZone: "Australia/Sydney" })}</p>
                </Box>
            )
        } else if (data.orderType == "Battery") {
            return (
                <Box className='text-lg'>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Order Type :</span> {data?.orderType}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>User Id :</span> {data?.user_id}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Battery Brand :</span> {data?.battery_brand}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Battery Model :</span> {data?.battery_model}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Battery Size :</span> {data?.battery_epsFlag}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Total Prize :</span> {data?.total_price}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Time/Date :</span> {Date(data.order_date_time).toLocaleString("en-US", { timeZone: "Australia/Sydney" })}</p>
                </Box>
            )
        } else if (data.orderType == "Inverter") {
            return (
                <Box className='text-lg'>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Order Type :</span> {data?.orderType}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>User Id :</span> {data?.user_id}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Inverter Brand :</span> {data?.inverter_brand}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Inverter Model :</span> {data?.inverter_model}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Inverter Size :</span> {data?.inverter_size}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Total Prize :</span> {data?.total_price}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Time/Date :</span> {Date(data.order_date_time).toLocaleString("en-US", { timeZone: "Australia/Sydney" })}</p>
                </Box>
            )
        } else if (data.orderType == "Optimizer") {
            return (
                <Box className='text-lg'>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Order Type :</span> {data?.orderType}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>User Id :</span> {data?.user_id}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Optimizer Brand :</span> {data?.optimizer_brand}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Optimizer Model :</span> {data?.optimizer_model}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Total Prize :</span> {data?.total_price}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Time/Date :</span> {Date(data.order_date_time).toLocaleString("en-US", { timeZone: "Australia/Sydney" })}</p>
                </Box>
            )
        } else if (data.orderType == "EV Charger") {
            return (
                <Box className='text-lg'>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Order Type :</span> {data?.orderType}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>User Id :</span> {data?.user_id}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Charger Brand :</span> {data?.ev_charger_brand}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Charger Model :</span> {data?.ev_charger_model}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Charger Phase :</span> {data?.ev_charger_phase}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Total Prize :</span> {data?.total_price}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Time/Date :</span> {Date(data.order_date_time).toLocaleString("en-US", { timeZone: "Australia/Sydney" })}</p>
                </Box>
            )
        } else if (data.orderType == "systemDesign") {
            return (
                <Box className='text-lg'>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Order Type :</span> {data?.orderType}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>User Id :</span> {data?.user_id}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>State :</span> {data?.state}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Electricity Bill :</span> {data?.bill}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Property Type :</span> {data?.property_type}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Floor Type :</span> {data?.floor_type}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Roof Type :</span> {data?.roof_type}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Meter Type :</span> {data?.meter_type}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Existing Panels :</span> {data?.panel_existance_status}</p>
                    <br />
                    <p><span className='text-gray-800 font-semibold mr-2 '>Panel Brand :</span> {data?.panel_brand}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Panel Model :</span> {data?.panel_model}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Panel Size :</span> {data?.panel_size}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Number Of Panels :</span> {data?.panel_number}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Panel Prize :</span> {data?.panel_price}</p>
                    <br />
                    <p><span className='text-gray-800 font-semibold mr-2 '>Inverter Brand :</span> {data?.inverter_brand}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Inverter Model :</span> {data?.inverter_model}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Inverter Model :</span> {data?.inverter_size}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Inverter Prize :</span> {data?.inverter_price}</p>
                    <br />
                    <p><span className='text-gray-800 font-semibold mr-2 '>Battery Brand :</span> {data?.battery_brand}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Battery Model :</span> {data?.battery_model}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Battery Esp Status :</span> {data?.battery_epsFlag}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Battery Prize :</span> {data?.battery_price}</p>
                    <br />
                    <p><span className='text-gray-800 font-semibold mr-2 '>EV Charger Phase :</span> {data?.ev_charger_phase}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Optimizer Phase :</span> {data?.optimizer_brand}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>STC :</span> {data?.stc}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Rebate :</span> {data?.rebate}</p>
                    <p><span className='text-gray-800 font-semibold mr-2 '>Total Prize :</span> {data?.total_price}</p>
                </Box>
            )
        }
    }

    function handleClick(sQuotation) {
        // Set the data you want to pass to the modal
        setData(sQuotation);
        setIsOpen(true);
    }

    function handleClose() {
        setIsOpen(false);
    }

    async function handleChange(event) {
        const selectedValue = event.target.value;

        if (selectedValue == "All") {
            try {
                const response = await axios.get(`/route/getAllOrders`);
                setOrders(response.data)
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await axios.get(`/route/getOrdersByType/${selectedValue}`);
                setOrders(response.data)
            } catch (error) {
                console.error(error);
            }
        }

    }

    // const [currentPage, setCurrentPage] = useState(1);
    // const totalPages = 5;

    // const handlePageChange = (page) => {
    //   setCurrentPage(page);
    // };

    // const getPageItems = () => {
    //   const pageItems = [];
    //   for (let i = 1; i <= totalPages; i++) {
    //     pageItems.push(
    //       <Box
    //         key={i}
    //         isCurrent={currentPage === i}
    //         onClick={() => handlePageChange(i)}
    //         className="ml-4"
    //       >
    //         {
    //             currentPage==i?
    //             <Button colorScheme='orange'>
    //           {i}
    //         </Button>:<Button>{i}</Button>
    //         }

    //       </Box>
    //     );
    //   }
    //   return pageItems;
    // };

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
                                <p className='text-[#EC652E] ml-2'>Quotations</p>
                            </Box>

                            <Modal isOpen={isOpen} size="xl" onClose={handleClose} scrollBehavior="inside">
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Order Details</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <ShowContent />
                                    </ModalBody>
                                </ModalContent>
                            </Modal>

                            <Box className='border-2 border-[#EC652E] rounded mt-8 bg-white'>
                                <Box>
                                    <Box className='flex justify-between'>
                                        <Box className='p-4 flex'>
                                            <Box className='ml-4'>
                                                <Select
                                                    bg='#EC652E'
                                                    borderColor='#EC652E'
                                                    color='white'
                                                    onChange={handleChange}
                                                >
                                                    <option value='All' className='text-black'>All</option>
                                                    <option value='systemDesign' className='text-black'>System Design</option>
                                                    <option value='Panel' className='text-black'>Panels</option>
                                                    <option value='Inverter' className='text-black'>Inverters</option>
                                                    <option value='Battery' className='text-black'>Batteries</option>
                                                    <option value='Optimizer' className='text-black'>Optimizers</option>
                                                    <option value='EV Charger' className='text-black'>EV Charger</option>
                                                </Select>
                                            </Box>

                                        </Box>

                                        <Box className='mt-4 mr-4'>
                                            <InputGroup className="rounded-full bg-gray-200 ">
                                                <Input
                                                    type="text"
                                                    placeholder="Product Id or Name"
                                                    className="text-black bg-[#EC652E] rounded-full"
                                                />
                                                <InputRightAddon className="bg-[#EC652E]">
                                                    <BsSearch className="text-[#EC652E]" />
                                                </InputRightAddon>
                                            </InputGroup>
                                        </Box>
                                    </Box>
                                    <Box className='mt-8 px-8'>
                                        <TableContainer>
                                            <Table size='lg'>
                                                <Thead>
                                                    <Tr>
                                                        <Th className='w-50px'>#</Th>
                                                        <Th>Type</Th>
                                                        <Th>User Id</Th>
                                                        <Th>Amount ($)</Th>
                                                        {/* <Th>Date/Time</Th> */}
                                                        <Th>Date/Time</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {
                                                        orders?.map((singleOrder, index) => (
                                                            <Tr key={index}>
                                                                <Td>{index + 1}</Td>
                                                                <Td className='cursor-pointer' onClick={() => handleClick(singleOrder)}>{singleOrder.orderType}</Td>
                                                                <Link href={`/admin/${singleOrder.user_id}`} ><Td>{singleOrder.user_id}</Td></Link>
                                                                <Td>{singleOrder.total_price}</Td>
                                                                {/* <Td>{singleOrder.order_date_time}</Td> */}
                                                                <Td>{Date(singleOrder.order_date_time).toLocaleString("en-US", { timeZone: "Australia/Sydney" })}</Td>
                                                            </Tr>
                                                        ))
                                                    }

                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                        {/* <ButtonGroup size='sm' isAttached variant='solid' className='m-4'>
                                            <Button isDisabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                                            Previous
                                            </Button>
                                            {getPageItems()}
                                            <Button isDisabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="ml-4">
                                            Next
                                            </Button>
                                        </ButtonGroup> */}
                                        {
                                            orders.length == 0 ? <Box className='my-10 text-center text-2xl font-semibold text-[#EC713D]'>
                                                <p>No Quotation Here</p>
                                                <p className='text-lg'>As soon as someone will request, you will get detail here</p>
                                            </Box>
                                                : null
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </HStack>
                </Box>
            </main >
        </Box >
    )
}