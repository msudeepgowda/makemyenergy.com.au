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
  Input,
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
} from "@chakra-ui/react";
import Head from "next/head";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineBell } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import AdminSidebar from "../../components/adminSidebar";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";

function InitialFocus({ ZipZoneDetails }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, formState } = useForm();
  const toast = useToast();

  const onSubmit = async (data) => {
    onClose();
    data.id = ZipZoneDetails._id
    try {
      console.log(data)
      const response = await axios.post(`/route/updateZipZone`, data,{
        withCredentials: true,
        headers: {
          'admin-email': localStorage.getItem("makemyenergy_Admin_Email")
        }
      });
      console.log(response.data);
      toast({
        title: "ZipZone Updated",
        description: "Your ZipZone has been updated",
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

  const initialRef = useRef(null);

  const router = useRouter();

  return (
    <>
      <MdEdit className="text-[#EC652E] text-xl" onClick={onOpen} />

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>

          <ModalHeader>Edit ZipZone</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <p>
              <div className="flex p-2"><p className="w-[200px] text-gray-500 text-lg font-semibold">From -</p><p>{ZipZoneDetails.from}</p></div>
              <div className="flex p-2 "><p className="w-[200px] text-gray-500 text-lg font-semibold">To -</p><p>{ZipZoneDetails.to}</p></div>
              </p>
              <FormControl>
                <FormLabel>Zone</FormLabel>
                <Input
                  ref={initialRef}
                  type="text"
                  id="state"
                  defaultValue={ZipZoneDetails.zone}
                  placeholder="Zone"
                  {...register('zone')}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Rating</FormLabel>
                <Input
                  type="text"
                  id="rating"
                  placeholder="Panel ZipZone"
                  defaultValue={ZipZoneDetails.rating}
                  {...register('rating')}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}


export default function ZipZone() {
  const toast = useToast();
  const [ZipZones, setZipZones] = useState([]);

  useEffect(() => {
    axios
      .get("/route/getZipZone")
      .then((res) => { 
        console.log(res.data)
        setZipZones(res.data);
      })
      .catch((err) => console.log("error"));
  }, []);

  return (
    <Box>
      <Head>
        <title>Make My Energy</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main>
        {/* Main Container Starts Here  */}
        <Box className="bg-white">
          <HStack>
            <AdminSidebar />

            <Box className="w-[78vw] bg-gray-100 px-8 pb-20">
              <Box className="mt-6 mx-6 flex justify-end">
                <BsFillPersonFill className="w-6 h-6" />
                <AiOutlineBell className="w-6 h-6 ml-4" />
              </Box>
              <Box className=" mt-8 flex font-semibold">
                <p className=" text-gray-500">Dashboard &gt; </p>
                <p className="text-[#EC652E] ml-2">ZipZones</p>
              </Box>

              <Box className="border-2 border-[#EC652E] rounded mt-8 bg-white">
                <Box className="ml-8 text-xl underline font-semibold mt-4">
                  ZipZone
                </Box>
                <Box className="mt-4 px-8">
                  <TableContainer>
                    <Table size="lg">
                      <Thead>
                        <Tr>
                          <Th className="w-50px">#</Th>
                          <Th>From</Th>
                          <Th>To</Th>
                          <Th>Zone</Th>
                          <Th>Rating</Th>
                          <Th>Edit</Th>
                          {/* <Th>Delete</Th> */}
                        </Tr>
                      </Thead>
                      <Tbody>
                        {ZipZones?.map((single, index) => (
                          <Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>{single.from}</Td>
                            <Td>{single.to}</Td>
                            <Td>{single.zone}</Td>
                            <Td>{single.rating}</Td>
                            <Td className="cursor-pointer">
                              <InitialFocus ZipZoneDetails={single} />
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Box>
          </HStack>
        </Box>
      </main>
    </Box>
  );
}
