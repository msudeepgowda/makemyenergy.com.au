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
  InputGroup,
  Input,
  InputRightAddon,
  useDisclosure,
  FormControl,
  FormLabel,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import Head from 'next/head'
import { BsFillPersonFill, BsSearch } from 'react-icons/bs'
import { AiOutlineBell } from 'react-icons/ai'
import { MdRefresh, MdEdit } from 'react-icons/md'
import AdminSidebar from '../../components/adminSidebar'
import { useRef, useState, useEffect } from 'react';
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/router'

function InitialFocus() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)

  const [proposalData, setProposalData] = useState({
    email: "",
    proposalLink: ""
  });

  const updateProposal = (e) => {
    setProposalData({ ...proposalData, [e.target.name]: e.target.value })
  }

  const postProposalData = async (e) => {
    e.preventDefault();
    const submitProposalData = {
      id: proposalData.email,
      progress_url: proposalData.proposalLink,
    };
    await axios.post('/route/updateUserProgressUrl', submitProposalData).then((response) => {
      if (response.status === 201 && response.data === "Proposal Url Added Successfully") {
        window. location. reload()
      }
    }).catch(error => {
      alert("Error While Updating Details");
      console.log(error);
    })
  };


  return (
    <>
      <MdEdit className='text-[#EC652E] text-xl' onClick={onOpen} />

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Proposal Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={e => postProposalData(e)}>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2"> User Email Id* </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required name='email' value={proposalData.email} onChange={updateProposal} type="text" placeholder="abc123@gmail.com" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Proposal Link *</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required name='proposalLink' value={proposalData.proposalLink} onChange={updateProposal} type="text" placeholder="https://www.google.com/" />
              </div>
              <div class="flex items-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"> Save </button>
                <ModalFooter>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </div>
            </form>
            {/* <FormControl>
              <FormLabel></FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default function Users() {

  // const [currentPage, setCurrentPage] = useState(1);
  const [usersData, setUsersData] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  // const totalPages = 5;
  const toast = useToast()

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

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
        .then((res) => {
          console.log(res.data)
          setUsersData(res.data)
        })
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
        .then((res) => {
          setUsersData(res.data)
        })
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
  }, [buttonClicked]);

  function handleClick() {
    // Update the state variable when the button is clicked
    setUsersData([])
    setButtonClicked(!buttonClicked);
  }
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

            <Box className='w-[78vw] min-h-screen bg-gray-100 px-8  pb-8'>
              <Box className='mt-6 mx-6 flex justify-end'>
                <BsFillPersonFill className='w-6 h-6' />
                <AiOutlineBell className='w-6 h-6 ml-4' />
              </Box>
              <Box className=' mt-8 flex font-semibold'>
                <p className=' text-gray-500'>Dashboard &gt; </p>
                <p className='text-[#EC652E] ml-2'>Users</p>
              </Box>
              <Box className='border-2 border-[#EC652E] rounded mt-8 bg-white'>
                <Box>
                  <Box className='flex justify-between'>
                    <Box className='p-4 flex'>
                      <Button colorScheme='orange' onClick={handleClick}><MdRefresh className='font-bold mr-3 text-2xl' />Refresh</Button>
                    </Box>

                    <Box className='mt-4 mr-4'>
                      <InputGroup className="rounded-full bg-gray-200 ">
                        <Input
                          type="text"
                          placeholder="User Id or Name"
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
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th>State</Th>
                            <Th>Orders</Th>
                            <Th>Edit</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {
                            usersData?.map((singleUser, index) => (
                              <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Link href={`/admin/${singleUser.email}`} ><Td className='cursor-pointer'>{singleUser.email}</Td></Link>
                                <Td>{singleUser.phone}</Td>
                                <Td>{singleUser.state}</Td>
                                <Td>{singleUser.orders.length}</Td>
                                <Td className='cursor-pointer'><InitialFocus /></Td>
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