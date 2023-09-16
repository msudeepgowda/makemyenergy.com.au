import {
  HStack,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tr,
  Th,
  Tbody,
  Td,
  Thead,
  InputGroup,
  InputRightAddon,
  useDisclosure,
  useToast,
  SimpleGrid,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Select,
  TableContainer
} from "@chakra-ui/react";
import Head from "next/head";
import { BsFillPersonFill, BsSearch, BsPlusLg } from "react-icons/bs";
import { AiOutlineBell, AiFillFilePdf } from "react-icons/ai";
import { MdRefresh, MdEdit, MdDeleteForever } from "react-icons/md";
import AdminSidebar from "../../components/adminSidebar";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import AddProduct from "../../components/product/addPanel";
import AddPanel from "../../components/product/addPanel";
import AddInverter from "../../components/product/addInverter";
import AddBattery from "../../components/product/addBattery";
import AddCharger from "../../components/product/addCharger";
import AddOptimizer from "../../components/product/addOptimizer";
import EditPanel from "../../components/product/editPanel";
import EditInverter from "../../components/product/editInverter";
import EditBattery from "../../components/product/editBattery";
import EditOptimizer from "../../components/product/editOptimizer";
import EditCharger from "../../components/product/editcharger";

function ShowPanel({ singleProduct,type }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <p onClick={onOpen}>{singleProduct.brand}</p>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{singleProduct.brand}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ul className="list-disc">
              <li className="flex p-2">
                <p className="w-[200px] text-gray-500 text-lg font-semibold">
                  Brand Name -
                </p>
                <p>{singleProduct.brand}</p>
              </li>
              <li className="flex p-2 ">
                <p className="w-[200px] text-gray-500 text-lg font-semibold">
                  Model-
                </p>
                <p>{singleProduct.model}</p>
              </li>
              <li className="flex p-2 ">
                <p className="w-[200px] text-gray-500 text-lg font-semibold">
                  Efficienct Warranty-
                </p>
                <p>{singleProduct.efficiancy_warranty}</p>
              </li>
              <li className="flex p-2">
                <p className="w-[200px] text-gray-500 text-lg font-semibold">
                  Product Warranty-
                </p>
                <p>{singleProduct.prod_warranty}</p>
              </li>
              <li className="flex p-2 ">
                <p className="w-[200px] text-gray-500 text-lg font-semibold">
                  Product Description-
                </p>
                <p>{singleProduct.product_desc}</p>
              </li>

              <li className="flex p-2">
                <p className="w-[200px] text-gray-500 text-lg font-semibold">
                  Status-
                </p>
                <p>{singleProduct.status}</p>
              </li>

              { type=="charger"?
                <Box>
                  <li className="flex p-2">
                <p className="w-[200px] text-gray-500 text-lg font-semibold">
                  Price-
                </p>
                <p>{singleProduct.price}</p>
              </li>
              <li className="flex p-2">
                <p className="w-[200px] text-gray-500 text-lg font-semibold">
                  Size-
                </p>
                <p>{singleProduct.size}</p>
              </li>
              <li className="flex p-2">
                <p className="w-[200px] text-gray-500 text-lg font-semibold">
                  Phase-
                </p>
                <p>{singleProduct.phase}</p>
              </li>
                </Box>:null
              }

              {
                type=="optimizer"?
                <li className="flex p-2">
                <p className="w-[200px] text-gray-500 text-lg font-semibold">
                  Price-
                </p>
                <p>{singleProduct.price}</p>
              </li>:null
              }
              
              <li className="flex p-2 my-4 ">
                <p className="w-[200px] text-gray-500 text-lg font-semibold">
                  Brand Logo-
                </p>
                <p>
                  <img
                    src={singleProduct.logo_image_url}
                    alt="logo"
                    className="w-[100px] h-[50px]"
                  />
                </p>
              </li>
              <li className="flex p-2 my-4">
                <p className="w-[200px] text-gray-500 text-lg font-semibold mt-8">
                  Image-
                </p>
                <p>
                  <img
                    src={singleProduct.product_image_url}
                    alt="logo"
                    className="w-[130px] h-[100px]"
                  />
                </p>
              </li>
              <li className="flex p-2 ">
                <p className="w-[200px] text-gray-500 text-lg font-semibold">
                  PDF-
                </p>
                <p>
                  {
                    singleProduct.pdf_url!=""?
                    <a
                    href={singleProduct?.pdf_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AiFillFilePdf className="text-[40px] text-orange-500" />
                  </a>:
                  <p>Please upload PDF</p>
                  }
                  
                </p>
              </li>

              { type=="battery"?
                <Box>
                  <li className="flex p-2 ">
                    <p className="w-[200px] text-gray-500 text-lg font-semibold">
                      Maximum-
                    </p>
                    <p>{singleProduct.max}</p>
                  </li>
                  <li className="flex p-2">
                    <p className="w-[200px] text-gray-500 text-lg font-semibold">
                      Minimum-
                    </p>
                    <p>{singleProduct.max}</p>
                  </li>
                  <li className="flex p-2 ">
                <p className="w-[200px] text-gray-500 text-lg font-semibold">
                  With Esp-
                </p>
                <p>{singleProduct.with_eps}</p>
                  </li>
                  <li className="flex p-2">
                    <p className="w-[200px] text-gray-500 text-lg font-semibold">
                      Without Esp-
                    </p>
                    <p>{singleProduct.without_eps}</p>
                  </li>
                </Box>:null
              }
            </ul>
            
              { type=="panel"||type=="inverter"?
                <Box><p className="mt-4 p-2 text-gray-500 text-lg font-semibold">
              Types-
            </p>
            <TableContainer>
              <Table variant="simple" className="rounded-xl">
                <Thead>
                  <Tr className="bg-gray-800">
                    <Th>
                      <p className="text-lg text-white font-normal">#</p>
                    </Th>
                    <Th>
                      <p className="text-lg text-white font-normal">Size</p>
                    </Th>
                    <Th>
                      <p className="text-lg text-white font-normal">Price </p>
                    </Th>
                    {type=="panel"?
                    <Th>
                      <p className="text-lg text-white font-normal">
                        Number Of Panels
                      </p>
                    </Th>:null}
                  </Tr>
                </Thead>
                <Tbody>
                  {singleProduct.price.map((row, index) => (
                    <Tr
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className={index % 2 == 0 ? "bg-gray-300" : "bg-gray-100"}
                    >
                      <Td component="th" scope="row">
                        {index + 1}
                      </Td>
                      <Td align="right">{singleProduct.size[index]}</Td>
                      <Td align="right">{row}</Td>
                      {type=="panel"?
                      <Td align="right">{singleProduct.no_of_panels[index]}</Td>:null}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            </Box>:null}
            
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default function Product() {
  const [panel, setPanel] = useState([]);
  const [inverter, setInverter] = useState([]);
  const [battery, setBattery] = useState([]);
  const [optimizer, setOptimizer] = useState([]);
  const [charger, setCharger] = useState([]);
  


  useEffect(() => {

    axios
      .get("/route/getproducts/panel")
      .then((res) => {
        console.log(res.data)
        setPanel(res.data);
      })
      .catch((err) => console.log("error"));

    axios
      .get("/route/getproducts/inverter")
      .then((res) => {
        setInverter(res.data);
      })
      .catch((err) => console.log("error"));

    axios
      .get("/route/getproducts/battery")
      .then((res) => {
        setBattery(res.data);
      })
      .catch((err) => console.log("error"));

    axios
      .get("/route/getproducts/optimizer")
      .then((res) => {
        setOptimizer(res.data);
      })
      .catch((err) => console.log("error"));

    axios
      .get("/route/getproducts/charger")
      .then((res) => {
        setCharger(res.data);
      })
      .catch((err) => console.log("error"));

  }, []);

  //to add products
  

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

            <Box className="w-[78vw] bg-gray-100 h-[100vh] px-8">

              <Box className="mt-6 mx-6 flex justify-end">
                <BsFillPersonFill className="w-6 h-6" />
                <AiOutlineBell className="w-6 h-6 ml-4" />
              </Box>

                <Box className=" mt-8 flex font-semibold">
                  <p className=" text-gray-500">Dashboard &gt; </p>
                  <p className="text-[#EC652E] ml-2"> Products</p>
                </Box>
              

              <Box className="border-2 border-[#EC652E] rounded mt-8 bg-white">
                <Tabs isFitted variant="enclosed">
                  <TabList mb="1em" className="bg-[#EC652E] text-white">
                    <Tab _selected={{ color: "black", bg: "white" }}>
                      Panels
                    </Tab>
                    <Tab _selected={{ color: "black", bg: "white" }}>
                      Inverters
                    </Tab>
                    <Tab _selected={{ color: "black", bg: "white" }}>
                      Battery
                    </Tab>
                    <Tab _selected={{ color: "black", bg: "white" }}>
                      Optimizers
                    </Tab>
                    <Tab _selected={{ color: "black", bg: "white" }}>
                      Charger
                    </Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Box>
                        <Box className="flex justify-between">
                          <Box>
                          <AddPanel/>
                            <Button colorScheme="orange" className="ml-4">
                              <MdRefresh className="font-bold mr-3 text-2xl" />
                              Refresh
                            </Button>
                          </Box>
                          <Box></Box>
                          <Box></Box>
                        </Box>
                        <Box className="mt-8 px-8">
                          <TableContainer>
                            <Table size="lg">
                              <Thead>
                                <Tr>
                                  <Th className="w-50px">#</Th>
                                  <Th>Company Name</Th>
                                  <Th>Logo</Th>
                                  <Th>Size</Th>
                                  <Th>Price</Th>
                                  <Th>Panels</Th>
                                  <Th>Edit</Th>
                                  <Th>Delete</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {panel.map((singlePanel, index) => (
                                  <Tr key={singlePanel._id}>
                                    <Td>{index + 1}</Td>
                                    <Td className="cursor-pointer">
                                      <ShowPanel singleProduct={singlePanel} type="panel" />
                                    </Td>
                                    <Td>
                                    <a href={singlePanel.logo_image_url} target='_blank' rel="noreferrer">
                                      <Image
                                        src={singlePanel.logo_image_url}
                                        alt={singlePanel.brand}
                                        className="w-[100px]"
                                      />
                                      </a>
                                    </Td>
                                    <Td>
                                      {singlePanel.size.map(
                                        (singlePrice, ind) => (
                                          <span key={ind}>
                                            {singlePrice}
                                            <br />
                                          </span>
                                        )
                                      )}
                                    </Td>
                                    <Td>
                                      {singlePanel.price.map(
                                        (singlePrice, ind) => (
                                          <span key={ind}>
                                            {singlePrice} ₹<br />
                                          </span>
                                        )
                                      )}
                                    </Td>
                                    <Td>
                                      {singlePanel.no_of_panels.map(
                                        (singlePrice, ind) => (
                                          <span key={ind}>
                                            {singlePrice}
                                            <br />
                                          </span>
                                        )
                                      )}
                                    </Td>
                                    <Td>
                                      <EditPanel singlePanel={singlePanel} />
                                     
                                    </Td>
                                    <Td>
                                      <MdDeleteForever className="text-[#EC652E] text-3xl" />
                                    </Td>
                                  </Tr>
                                ))}
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box>
                        <Box className="flex">
                          <Box>
                          <AddInverter/>
                            <Button colorScheme="orange" className="ml-4">
                              <MdRefresh className="font-bold mr-3 text-2xl" />
                              Refresh
                            </Button>
                          </Box>
                          <Box className="ml-[500px]">
                            <InputGroup className="rounded-full bg-white ">
                              <Input
                                type="text"
                                placeholder="Inverter Id or Name"
                                className="text-white bg-[#EC652E] rounded-full px-3 py-2"
                              />
                              <InputRightAddon className="bg-[#EC652E]">
                                <BsSearch className="text-[#EC652E]" />
                              </InputRightAddon>
                            </InputGroup>
                          </Box>
                        </Box>
                        <Box className="mt-8 px-8">
                          <TableContainer>
                            <Table size="lg">
                              <Thead>
                                <Tr>
                                  <Th className="w-50px">#</Th>
                                  <Th>Company Name</Th>
                                  <Th>Logo</Th>
                                  <Th>Model</Th>
                                  <Th>Edit</Th>
                                  <Th>Delete</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {inverter.map((singleInverter, index) => (
                                  <Tr key={singleInverter._id}>
                                    <Td>{index + 1}</Td>
                                    <Td className="cursor-pointer"><ShowPanel singleProduct={singleInverter} type="inverter"/></Td>
                                    <Td>
                                    <a href={singleInverter.logo_image_url} target='_blank' rel="noreferrer">
                                      <Image
                                        src={singleInverter.logo_image_url}
                                        alt={singleInverter.brand}
                                        className="w-[100px]"
                                      />
                                      </a>
                                    </Td>
                                    <Td>{singleInverter.model}</Td>
                                    <Td>
                                    <EditInverter singleInverter={singleInverter} />                                    </Td>
                                    <Td>
                                      <MdDeleteForever className="text-[#EC652E] text-3xl" />
                                    </Td>
                                  </Tr>
                                ))}
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box>
                        <Box className="flex">
                          <Box>
                          <AddBattery/>
                            <Button colorScheme="orange" className="ml-4">
                              <MdRefresh className="font-bold mr-3 text-2xl" />
                              Refresh
                            </Button>
                          </Box>
                          <Box className="ml-[520px]">
                            <InputGroup className="rounded-full bg-white ">
                              <Input
                                type="text"
                                placeholder="Product Id or Name"
                                className="text-white bg-[#EC652E] rounded-full px-3 py-2"
                              />
                              <InputRightAddon className="bg-[#EC652E]">
                                <BsSearch className="text-[#EC652E]" />
                              </InputRightAddon>
                            </InputGroup>
                          </Box>
                        </Box>
                        <Box className="mt-8 px-8">
                          <TableContainer>
                            <Table size="lg">
                              <Thead>
                                <Tr>
                                  <Th className="w-50px">#</Th>
                                  <Th>Company Name</Th>
                                  <Th>Logo</Th>
                                  <Th>Model</Th>
                                  <Th>Edit</Th>
                                  <Th>Delete</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {battery.map((singleBattery, index) => (
                                  <Tr key={singleBattery._id}>
                                    <Td>{index + 1}</Td>
                                    <Td className="cursor-pointer"><ShowPanel singleProduct={singleBattery} type="battery"/></Td>
                                    <Td>
                                    <a href={singleBattery.logo_image_url} target='_blank' rel="noreferrer">
                                      <Image
                                        src={singleBattery.logo_image_url}
                                        alt={singleBattery.brand}
                                        className="w-[100px]"
                                      />
                                      </a>
                                    </Td>
                                    <Td>{singleBattery.model}</Td>
                                    <Td>
                                      <EditBattery singleBattery={singleBattery}/>
                                    </Td>
                                    <Td>
                                      <MdDeleteForever className="text-[#EC652E] text-3xl" />
                                    </Td>
                                  </Tr>
                                ))}
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box>
                        <Box className="flex">
                          <AddOptimizer />
                            <Button colorScheme="orange" className="ml-4">
                              <MdRefresh className="font-bold mr-3 text-2xl" />
                              Refresh
                            </Button>
                        </Box>
                        <Box className="mt-8 px-8">
                          <TableContainer>
                            <Table size="lg">
                              <Thead>
                                <Tr>
                                  <Th className="w-50px">#</Th>
                                  <Th>Company Name</Th>
                                  <Th>Logo</Th>
                                  <Th>Status</Th>
                                  <Th>Edit</Th>
                                  <Th>Delete</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {optimizer.map((singleOptimizer, index) => (
                                  <Tr key={singleOptimizer._id}>
                                    <Td>{index + 1}</Td>
                                    <Td className="cursor-pointer"><ShowPanel singleProduct={singleOptimizer} type="optimizer"/></Td>
                                    <Td>
                                    <a href={singleOptimizer.logo_image_url} target='_blank' rel="noreferrer">
                                      <Image
                                        src={singleOptimizer.logo_image_url}
                                        alt={singleOptimizer.brand}
                                        className="w-[100px]"
                                      />
                                      </a>
                                    </Td>
                                    <Td>{singleOptimizer.status}</Td>
                                    <Td>
                                      <EditOptimizer singleOptimizer={singleOptimizer} />
                                    </Td>
                                    <Td>
                                      <MdDeleteForever className="text-[#EC652E] text-3xl" />
                                    </Td>
                                  </Tr>
                                ))}
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box>
                        <Box>
                          <AddCharger />
                            <Button colorScheme="orange" className="ml-4">
                              <MdRefresh className="font-bold mr-3 text-2xl" />
                              Refresh
                            </Button>
                          
                        </Box>
                        <Box className="mt-8 px-8">
                          <TableContainer>
                            <Table size="lg">
                              <Thead>
                                <Tr>
                                  <Th className="w-50px">#</Th>
                                  <Th>Company Name</Th>
                                  <Th>Logo</Th>
                                  <Th>Model</Th>
                                  <Th>Edit</Th>
                                  <Th>Delete</Th>
                                </Tr>
                              </Thead>
                              {charger.map((singleCharger, index) => (
                                <Tr key={singleCharger._id}>
                                  <Td>{index + 1}</Td>
                                  <Td className="cursor-pointer"><ShowPanel singleProduct={singleCharger} type="charger"/></Td>
                                  <Td>
                                  <a href={singleCharger.logo_image_url} target='_blank' rel="noreferrer">
                                    <Image
                                      src={singleCharger.logo_image_url}
                                      alt={singleCharger.brand}
                                      className="w-[100px]"
                                    />
                                    </a>
                                  </Td>
                                  <Td>{singleCharger.model}</Td>
                                  <Td>
                                    <EditCharger singlecharger={singleCharger}/>
                                  </Td>
                                  <Td>
                                    <MdDeleteForever className="text-[#EC652E] text-3xl" />
                                  </Td>
                                </Tr>
                              ))}
                            </Table>
                          </TableContainer>
                        </Box>
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>
          </HStack>
        </Box>
      </main>
    </Box>
  );
}
