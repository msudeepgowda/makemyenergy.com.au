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

function InitialFocus({ rebateDetails }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, formState } = useForm();
  const toast = useToast();

  const onSubmit = async (data) => {
    onClose();
    data.id = rebateDetails._id
    try {
      console.log(data)
      const response = await axios.post(`/route/updateRebate`, data);
      console.log(response.data);
      toast({
        title: "Rebate Updated",
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

  const initialRef = useRef(null);

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
    }
  }, [])

  return (
    <>
      <MdEdit className="text-[#EC652E] text-xl" onClick={onOpen} />

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>

          <ModalHeader>Edit Rebate</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>States</FormLabel>
                <Input
                  ref={initialRef}
                  type="text"
                  id="state"
                  defaultValue={rebateDetails.states}
                  placeholder="States"
                  {...register('states')}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>State Short Name</FormLabel>
                <Input type="text" id="short_name" placeholder="Short Name" defaultValue={rebateDetails.state_cd} {...register('state_cd')} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Panel Rebate</FormLabel>
                <Input
                  type="text"
                  id="panel_rebate"
                  placeholder="Panel Rebate"
                  defaultValue={rebateDetails.panel_rebate}
                  {...register('panel_rebate')}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Battery Rebate</FormLabel>
                <Input
                  type="text"
                  id="battery_rebate"
                  placeholder="Battery Reabte"
                  defaultValue={rebateDetails.battery_rebate}
                  {...register('battery_rebate')}
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

function ChangeStc({ stcDetails }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, formState } = useForm();
  const toast = useToast();

  const onSubmit = async (data) => {
    onClose();
    data.id = stcDetails._id
    try {
      console.log(data)
      const response = await axios.post(`/route/updateStcPrice`, data);
      console.log(response.data);
      toast({
        title: "Rebate Updated",
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

  const initialRef = useRef(null);

  return (
    <>
      <MdEdit className="text-[#EC652E] text-xl" onClick={onOpen} />

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>

          <ModalHeader>Edit Stc</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>States</FormLabel>
                <Input
                  ref={initialRef}
                  type="text"
                  id="state"
                  defaultValue={stcDetails.price}
                  placeholder="Price"
                  {...register('price')}
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
// function AddAssociationComponent() {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const initialRef = useRef(null);

//   return (
//     <>
//       <Button colorScheme="orange" onClick={onOpen}>
//         <BsPlusLg className="font-bold mr-3" /> Add
//       </Button>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Add Association</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <FormControl>
//               <FormLabel>States</FormLabel>
//               <Input ref={initialRef} placeholder="States" />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>State Short Name</FormLabel>
//               <Input placeholder="Short Name" />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>Panel Rebate</FormLabel>
//               <Input placeholder="Panel Rebate" />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>Battery Rebate</FormLabel>
//               <Input placeholder="Battery Reabte" />
//             </FormControl>
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={onClose}>
//               Save
//             </Button>
//             <Button onClick={onClose}>Cancel</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

export default function Rebate() {
  const toast = useToast();
  const [rebates, setRebates] = useState([]);
  const [stc, setStc] = useState([]);

  useEffect(() => {
    axios
      .get("/route/getRebates")
      .then((res) => {
        setRebates(res.data);
      })
      .catch((err) => console.log("error"));

    axios
      .get("/route/getStcPrice")
      .then((res) => {
        setStc(res.data[0]);
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
                <p className="text-[#EC652E] ml-2">Rebates & Stc</p>
              </Box>

              <Box className="border-2 border-[#EC652E] rounded mt-8 bg-white">
                <Box className="ml-8 text-xl underline font-semibold mt-4">
                  Stc
                </Box>
                <Box className="px-8">
                  <TableContainer>
                    <Table size="lg">
                      <Tbody>
                        <Tr>
                          <Td>Stc</Td>
                          <Td>{stc.price}</Td>
                          <Td className="cursor-pointer">
                            <ChangeStc stcDetails={stc} />
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>

              <Box className="border-2 border-[#EC652E] rounded mt-8 bg-white">
                <Box className="ml-8 text-xl underline font-semibold mt-4">
                  Rebate
                </Box>
                <Box className="mt-4 px-8">
                  <TableContainer>
                    <Table size="lg">
                      <Thead>
                        <Tr>
                          <Th className="w-50px">#</Th>
                          <Th>States</Th>
                          <Th>Code</Th>
                          <Th>Panel Rebate</Th>
                          <Th>Battery Rebate</Th>
                          <Th>Edit</Th>
                          {/* <Th>Delete</Th> */}
                        </Tr>
                      </Thead>
                      <Tbody>
                        {rebates?.map((singleReabte, index) => (
                          <Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>{singleReabte.states}</Td>
                            <Td>{singleReabte.state_cd}</Td>
                            <Td>{singleReabte.panel_rebate}</Td>
                            <Td>{singleReabte.battery_rebate}</Td>
                            <Td className="cursor-pointer">
                              <InitialFocus rebateDetails={singleReabte} />
                            </Td>
                            {/* <Td>
                                <MdDeleteForever
                                  className="text-[#EC652E] text-3xl cursor-pointer"
                                  onClick={() =>
                                    toast({
                                      title: "User Deleted",
                                      description: "The User has been deleted",
                                      status: "warning",
                                      duration: 1000,
                                      isClosable: true,
                                      position: "top position",
                                    })
                                  }
                                />
                              </Td> */}
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
