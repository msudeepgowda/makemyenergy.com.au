import {
  Box,
  HStack,
  TableContainer,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  Thead,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/adminSidebar";
import Link from 'next/link';
import {AiFillFilePdf} from 'react-icons/ai';

export default function DynamicPage({ data }) {
  const router = useRouter();
  const [userData, setuserData] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [singleData, setSingleData] = useState(null);
  const { adminUserID } = router.query;

  useEffect(() => {
    if (localStorage.getItem("makemyenergy_Admin_Email") === null) {
      router.push("/admin/signin")
    } else {
      axios.get(`/route/getOrdersById/${adminUserID}`, {
        withCredentials: true,
        headers: {
          'admin-email': localStorage.getItem("makemyenergy_Admin_Email")
        }
      })
        .then((res) => {
          console.log(res.data);
          setUserOrder(res.data);
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

      axios.get(`/route/getUser/${adminUserID}`, {
        withCredentials: true,
        headers: {
          'admin-email': localStorage.getItem("makemyenergy_Admin_Email")
        }
      })
        .then((res) => {
          console.log(res.data[0]);
          setuserData(res.data[0]);
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

  function ShowContent() {
    if (singleData.orderType == "Panel") {
      return (
        <Box className="text-lg">
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Order Type :
            </span>{" "}
            {singleData?.orderType}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">User Id :</span>{" "}
            {singleData?.user_id}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Panel Brand :
            </span>{" "}
            {singleData?.panel_brand}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Panel Model :
            </span>{" "}
            {singleData?.panel_model}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Panel Size :
            </span>{" "}
            {singleData?.panel_size}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Number Of Panels :
            </span>{" "}
            {singleData?.panel_number}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Total Prize :
            </span>{" "}
            {singleData?.total_price}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Time/Date :
            </span>{" "}
            {Date(singleData.order_date_time)?.toLocaleString("en-US", {
              timeZone: "Australia/Sydney",
            })}
          </p>
        </Box>
      );
    } else if (singleData.orderType == "Battery") {
      return (
        <Box className="text-lg">
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Order Type :
            </span>{" "}
            {singleData?.orderType}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">User Id :</span>{" "}
            {singleData?.user_id}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Battery Brand :
            </span>{" "}
            {singleData?.battery_brand}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Battery Model :
            </span>{" "}
            {singleData?.battery_model}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Battery Size :
            </span>{" "}
            {singleData?.battery_epsFlag}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Total Prize :
            </span>{" "}
            {singleData?.total_price}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Time/Date :
            </span>{" "}
            {Date(singleData.order_date_time).toLocaleString("en-US", {
              timeZone: "Australia/Sydney",
            })}
          </p>
        </Box>
      );
    } else if (singleData.orderType == "Inverter") {
      return (
        <Box className="text-lg">
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Order Type :
            </span>{" "}
            {singleData?.orderType}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">User Id :</span>{" "}
            {singleData?.user_id}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Inverter Brand :
            </span>{" "}
            {singleData?.inverter_brand}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Inverter Model :
            </span>{" "}
            {singleData?.inverter_model}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Inverter Size :
            </span>{" "}
            {singleData?.inverter_size}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Total Prize :
            </span>{" "}
            {singleData?.total_price}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Time/Date :
            </span>{" "}
            {Date(singleData.order_date_time).toLocaleString("en-US", {
              timeZone: "Australia/Sydney",
            })}
          </p>
        </Box>
      );
    } else if (singleData.orderType == "Optimizer") {
      return (
        <Box className="text-lg">
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Order Type :
            </span>{" "}
            {singleData?.orderType}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">User Id :</span>{" "}
            {singleData?.user_id}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Optimizer Brand :
            </span>{" "}
            {singleData?.optimizer_brand}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Optimizer Model :
            </span>{" "}
            {singleData?.optimizer_model}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Total Prize :
            </span>{" "}
            {singleData?.total_price}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Time/Date :
            </span>{" "}
            {Date(singleData.order_date_time).toLocaleString("en-US", {
              timeZone: "Australia/Sydney",
            })}
          </p>
        </Box>
      );
    } else if (singleData.orderType == "EV Charger") {
      return (
        <Box className="text-lg">
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Order Type :
            </span>{" "}
            {singleData?.orderType}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">User Id :</span>{" "}
            {singleData?.user_id}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Charger Brand :
            </span>{" "}
            {singleData?.ev_charger_brand}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Charger Model :
            </span>{" "}
            {singleData?.ev_charger_model}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Charger Phase :
            </span>{" "}
            {singleData?.ev_charger_phase}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Total Prize :
            </span>{" "}
            {singleData?.total_price}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Time/Date :
            </span>{" "}
            {Date(singleData.order_date_time).toLocaleString("en-US", {
              timeZone: "Australia/Sydney",
            })}
          </p>
        </Box>
      );
    } else if (singleData.orderType == "systemDesign") {
      return (
        <Box className="text-lg">
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Order Type :
            </span>{" "}
            {singleData?.orderType}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">User Id :</span>{" "}
            {singleData?.user_id}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">State :</span>{" "}
            {singleData?.state}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Electricity Bill :
            </span>{" "}
            {singleData?.bill}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Property Type :
            </span>{" "}
            {singleData?.property_type}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Floor Type :
            </span>{" "}
            {singleData?.floor_type}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Roof Type :
            </span>{" "}
            {singleData?.roof_type}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Meter Type :
            </span>{" "}
            {singleData?.meter_type}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Existing Panels :
            </span>{" "}
            {singleData?.panel_existance_status}
          </p>
          <br />
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Panel Brand :
            </span>{" "}
            {singleData?.panel_brand}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Panel Model :
            </span>{" "}
            {singleData?.panel_model}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Panel Size :
            </span>{" "}
            {singleData?.panel_size}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Number Of Panels :
            </span>{" "}
            {singleData?.panel_number}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Panel Prize :
            </span>{" "}
            {singleData?.panel_price}
          </p>
          <br />
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Inverter Brand :
            </span>{" "}
            {singleData?.inverter_brand}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Inverter Model :
            </span>{" "}
            {singleData?.inverter_model}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Inverter Model :
            </span>{" "}
            {singleData?.inverter_size}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Inverter Prize :
            </span>{" "}
            {singleData?.inverter_price}
          </p>
          <br />
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Battery Brand :
            </span>{" "}
            {singleData?.battery_brand}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Battery Model :
            </span>{" "}
            {singleData?.battery_model}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Battery Esp Status :
            </span>{" "}
            {singleData?.battery_epsFlag}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Battery Prize :
            </span>{" "}
            {singleData?.battery_price}
          </p>
          <br />
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              EV Charger Phase :
            </span>{" "}
            {singleData?.ev_charger_phase}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Optimizer Phase :
            </span>{" "}
            {singleData?.optimizer_brand}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">STC :</span>{" "}
            {singleData?.stc}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">Rebate :</span>{" "}
            {singleData?.rebate}
          </p>
          <p>
            <span className="text-gray-800 font-semibold mr-2 ">
              Total Prize :
            </span>{" "}
            {singleData?.total_price}
          </p>
        </Box>
      );
    }
  }

  function handleClick(sQuotation) {
    // Set the data you want to pass to the modal
    setSingleData(sQuotation);
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

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

            <Box className="w-[78vw] bg-gray-100 pb-8 px-8">
              <Box className=" mt-8 flex font-semibold">
                <p className=" text-gray-500">Dashboard &gt; </p>
                <Link href={`/admin/users`}><p className=" text-gray-500">Users &gt; </p></Link>
                <p className="text-[#EC652E] ml-2">{adminUserID}</p>
              </Box>

              <Modal
                isOpen={isOpen}
                size="xl"
                onClose={handleClose}
                scrollBehavior="inside"
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Order Details</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <ShowContent />
                  </ModalBody>
                </ModalContent>
              </Modal>

              <Box className="border-2 border-[#EC652E] rounded mt-8 bg-white">
                <Box className="px-8">
                  <p className="text-2xl text-center my-4 font-semibold text-gray-600">User Info</p>
                  <TableContainer>
                    <Table size="lg">
                      <Tbody>
                        <Tr>
                          <Td>Email :</Td>
                          <Td>{userData?.email}</Td>
                        </Tr>
                        <Tr>
                          <Td>First Name :</Td>
                          <Td>{userData?.first_name}</Td>
                        </Tr>
                        <Tr>
                          <Td>Last Name :</Td>
                          <Td>{userData?.last_name}</Td>
                        </Tr>
                        <Tr>
                          <Td>Phone Number :</Td>
                          <Td>{userData?.phone}</Td>
                        </Tr>
                        <Tr>
                          <Td>Email :</Td>
                          <Td>{userData?.email}</Td>
                        </Tr>
                        <Tr>
                          <Td>Address :</Td>
                          <Td>{userData?.address}</Td>
                        </Tr>
                        <Tr>
                          <Td>State :</Td>
                          <Td>{userData?.state}</Td>
                        </Tr>
                        <Tr>
                          <Td>Pincode :</Td>
                          <Td>{userData?.zip}</Td>
                        </Tr>
                        <Tr>
                          <Td>Inverter Position :</Td>
                          <Td>{userData?.inverter_standing_pos}</Td>
                        </Tr>
                        <Tr>
                          <Td>Meter Position :</Td>
                          <Td>
                          {userData?.meter_standing_pos}
                            </Td>
                        </Tr>
                        <Tr>
                          <Td>Electricity Bill :</Td>
                          <Td>
                          <a href={userData?.electricity_bill_url} target='_blank' rel="noreferrer">
                          <AiFillFilePdf className="text-[40px] text-orange-500" />
                            </a>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>MeterBoard :</Td>
                          <Td>
                          <a href={userData?.meterboard_url} target='_blank' rel="noreferrer">
                            <Image
                              src={userData?.meterboard_url}
                              alt="meterboard"
                              className="w-[100px]"
                            />
                            </a>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Inverter :</Td>
                          <Td>
                          <a href={userData?.inverter_url} target='_blank' rel="noreferrer">
                            <Image
                              src={userData?.inverter_url}
                              alt="inverter"
                              className="w-[100px]"
                            />
                            </a>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Roof :</Td>
                          <Td>
                          <a href={userData?.inverter_url} target='_blank' rel="noreferrer">
                            <Image
                              src={userData?.roof_url}
                              alt="roofImage"
                              className="w-[100px]"
                            />
                            </a>
                          </Td>
                        </Tr>

                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>

              <Box className="border-2 border-[#EC652E] rounded mt-8 bg-white">
                <Box className="mt-8 px-8">
                  <p className="text-2xl text-center my-4 font-semibold text-gray-600">User Orders</p>
                  <TableContainer>
                    <Table size="lg">
                      <Thead>
                        <Tr>
                          <Th className="w-50px">#</Th>
                          <Th>Type</Th>
                          <Th>User Id</Th>
                          <Th>Amount ($)</Th>
                          <Th>Date/Time</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {userOrder?.map((singleOrder, index) => (
                          <Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td
                              className="cursor-pointer"
                              onClick={() => handleClick(singleOrder)}
                            >
                              {singleOrder.orderType}
                            </Td>
                            <Td>{singleOrder.user_id}</Td>
                            <Td>{singleOrder.total_price}</Td>
                            <Td>{Date(singleOrder.order_date_time)?.toLocaleString("en-US", {
                              timeZone: "Australia/Sydney",
                            })}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                  {userOrder.length == 0 ? (
                    <Box className="my-10 text-center text-2xl font-semibold text-[#EC713D]">
                      <p>No Quotation Here</p>
                      <p className="text-lg">
                        As soon as someone will request, you will get detail
                        here
                      </p>
                    </Box>
                  ) : null}
                </Box>
              </Box>
            </Box>
          </HStack>
        </Box>
      </main>
    </Box>
  );
}
