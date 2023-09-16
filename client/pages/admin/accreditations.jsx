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
  ModalCloseButton
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


function InitialFocus({acc_id}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast();
  const initialRef = useRef(null)


  const onSubmit = async (data) => {
    const form = new FormData();
    form.append("id", acc_id);
    form.append("pdf", data.file[0]);
    try {
      console.log(data)
      const response = await axios.post(`/route/updateCertRepo`,form,{
        withCredentials: true,
        headers: {
          'admin-email': localStorage.getItem("makemyenergy_Admin_Email")
        }
      });
      console.log(response.data);
      toast({
        title: "Accrediation Updated",
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
      <MdEdit className='text-[#EC652E] text-xl' onClick={onOpen} />

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Edit Certifiacate</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Certificate</FormLabel>
                <Input
                  type="file"
                  id="file"
                  accept="application/pdf"
                  {...register("file", {
                    required: true,
                    validate: {
                      fileSize: (value) => !value[0] || value[0].size <= 5000000,
                      fileType: (value) =>
                        !value[0] || ["application/pdf"].includes(value[0].type),
                    },
                  })}
                />
                {errors.file && (
                  <FormErrorMessage>
                    {errors.file.type === "required" && "PDF file is required"}
                    {errors.file.type === "fileSize" &&
                      "PDF file must be no larger than 5MB"}
                    {errors.file.type === "fileType" &&
                      "PDF file must be a PDF document"}
                  </FormErrorMessage>
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

export default function Accrediations() {

  const [accrediations, setAccrediations] = useState([]);
  const toast = useToast()

  useEffect(() => {
    axios.get('/route/certRepo')
      .then((res) => {
        console.log(res.data)
        setAccrediations(res.data)
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

            <Box className='w-[78vw] bg-gray-100 h-[100vh] px-8'>
              <Box className='mt-6 mx-6 flex justify-end'>
                <BsFillPersonFill className='w-6 h-6' />
                <AiOutlineBell className='w-6 h-6 ml-4' />
              </Box>
              <Box className=' mt-8 flex font-semibold'>
                <p className=' text-gray-500'>Dashboard &gt; </p>
                <p className='text-[#EC652E] ml-2'>Accreditations</p>
              </Box>
              <Box className='border-2 border-[#EC652E] rounded mt-8 bg-white'>
                <Box>
                  <Box className='mt-8 px-8'>
                    <TableContainer>
                      <Table size='lg'>
                        <Thead>
                          <Tr>
                            <Th className='w-50px'>#</Th>
                            <Th>Accreditation Name</Th>
                            <Th>Certificate</Th>
                            <Th>Edit</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {
                            accrediations?.map((singleAccre, index) => (
                              <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{singleAccre.brand}</Td>
                                <Td>
                                  <a href={singleAccre.cert_url} target='_blank' rel="noreferrer"><AiFillFilePdf className='text-[#EC652E] text-3xl cursor-pointer' /></a>
                                </Td>
                                <Td><InitialFocus acc_id={singleAccre._id}/></Td>
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