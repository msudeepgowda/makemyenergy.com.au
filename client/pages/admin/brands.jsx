import {
  Box,
  Button,
  HStack,
  Image,
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
  FormControl,
  FormLabel,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import Head from 'next/head'
import { BsFillPersonFill, BsSearch, BsPlusLg } from 'react-icons/bs'
import { AiOutlineBell } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'
import AdminSidebar from '../../components/adminSidebar'
import { useRef, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useRouter } from 'next/router'


function InitialFocus({ singleBrand }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast();

  const onSubmit = async (data) => {

    // send formData using your preferred method (e.g. fetch or axios)
    const form = new FormData();
    form.append("id", singleBrand._id);
    form.append("logo_image_url", data.logo_image_url[0]);
    try {
      const response = await axios.post(`http://localhost:3050/route/updateImageRepo`, form,{
        withCredentials: true,
        headers: {
          'admin-email': localStorage.getItem("makemyenergy_Admin_Email")
        }
      });
      console.log(response.data);
      if(response.data.acknowledged)
      {toast({
        title: "Brand Updated",
        description: "Your brand has been updated",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top position",
      })}
      else{
        toast({
          title: "Error",
          description: "Some Error occured, please try later",
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top position",
        })
      }
      // window.location.reload();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Some Error occured, please try later",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top position",
      })
    }
  };

  const initialRef = useRef(null)

  const router = useRouter();



  return (
    <>
      <MdEdit className='text-[#EC652E] text-xl' onClick={onOpen} />

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Edit Brand </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Brand name</FormLabel>
                <Input ref={initialRef} defaultValue={singleBrand.brand} placeholder='First name' {...register("brand", { required: true })} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Brand Logo</FormLabel>
                <Input type="file"
                  {...register("logo_image_url", {
                    required: true,
                    validate: {
                      fileSize: (value) => !value[0] || value[0].size <= 5000000,
                      fileType: (value) =>
                        !value[0] || ["image/jpeg", "image/png", "image/gif"].includes(value[0].type),
                    },
                  })}
                />
                {errors.file?.type && (
                  <p className='text-red-400'>File must be a jpeg, png or gif image</p>
                )}
                {errors.file?.size && (
                  <p className='text-red-400'>File must be no larger than 5MB</p>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}

function AddBrandComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast();

  const initialRef = useRef(null)

  const onSubmit = async (data) => {

    // send formData using your preferred method (e.g. fetch or axios)
    const form = new FormData();
    form.append('image', data.file[0]);
    form.append('brand', data.text);

    try {
      console.log(data)
      const response = await axios.post(`/route/addBrand/abcd@gmail.com`, form);
      toast({
        title: "Brand Added",
        description: "Your rebate has been updated",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top position",
      })
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Some Error occured, please try later",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top position",
      })
    }

  };

  return (
    <>
      <Button colorScheme='orange' onClick={onOpen}><BsPlusLg className='font-bold mr-3' /> Add</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Add Brand</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Brand name</FormLabel>
                <Input ref={initialRef} placeholder='First name' {...register("text", { required: true })} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Brand Logo</FormLabel>
                <Input type="file"
                  {...register("file", {
                    required: true,
                    validate: {
                      fileSize: (value) => !value[0] || value[0].size <= 5000000,
                      fileType: (value) =>
                        !value[0] || ["image/jpeg", "image/png", "image/gif"].includes(value[0].type),
                    },
                  })}
                />
                {errors.file?.type && (
                  <p className='text-red-400'>File must be a jpeg, png or gif image</p>
                )}
                {errors.file?.size && (
                  <p className='text-red-400'>File must be no larger than 5MB</p>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}

export default function Brands() {

  const [brands, setBrands] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});

  const handleOpen = (data) => {
    setData(data);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const toast = useToast()

  useEffect(() => {
    axios.get('/route/imageRepo')
      .then((res) => {
        console.log(res.data)
        setBrands(res.data)
      })
      .catch(err => console.log("error"))

  }, []);


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

            <Box className='w-[78vw] min-h-screen bg-gray-100 pb-16 px-8'>
              <Box className='mt-6 mx-6 flex justify-end'>
                <BsFillPersonFill className='w-6 h-6' />
                <AiOutlineBell className='w-6 h-6 ml-4' />
              </Box>
              <Box className=' mt-8 flex font-semibold'>
                <p className=' text-gray-500'>Dashboard &gt; </p>
                <p className='text-[#EC652E] ml-2'>Brands</p>
              </Box>

              <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Brand Info</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Box>
                      <Box className='flex m-4'><p className='text-black font-semibold mx-2'>Brand Name</p> - <p className='mx-2'>{data.brand}</p></Box>
                      <Box className='flex m-4'><p className='text-black font-semibold mx-2'>Brand Id</p> - <p className='mx-2'>{data._id}</p></Box>
                      <Box className='flex m-4'>
                        <p className='text-black font-semibold mx-2 my-auto'>Brand logo - </p>
                        <Box className='border-2 border-gray-300 rounded-lg'>
                          <Image
                            src={data.logo_image_url}
                            alt={data.brand}
                            className="w-[100px] p-2 border-gray-700 border-2 rounded-lg"
                          />
                        </Box>
                      </Box>
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={handleClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Box className='border-2 border-[#EC652E] rounded mt-8 bg-white'>
                <Box>
                  <Box className='flex justify-between'>
                    <Box className='p-4 flex'>
                      <AddBrandComponent />
                    </Box>

                    <Box className='mt-4 mr-4'>
                      <InputGroup className="rounded-full bg-gray-200 ">
                        <Input
                          type="text"
                          placeholder="Brand Id or Name"
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
                            <Th>Brand Name</Th>
                            <Th>Total Enquiries</Th>
                            <Th>Edit</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {
                            brands?.map((singleBrand, index) => (
                              <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td className='cursor-pointer' onClick={() => handleOpen(singleBrand)}>{singleBrand.brand}</Td>
                                <Td>
                                <a href={singleBrand.logo_image_url} target='_blank' rel="noreferrer">
                                  <Image
                                    src={singleBrand.logo_image_url}
                                    alt={singleBrand.brand}
                                    className="w-[100px]"
                                  />
                                  </a>
                                </Td>
                                <Td className='cursor-pointer'><InitialFocus singleBrand={singleBrand} /></Td>
                              </Tr>
                            ))
                          }
                        </Tbody>
                      </Table>
                    </TableContainer>
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