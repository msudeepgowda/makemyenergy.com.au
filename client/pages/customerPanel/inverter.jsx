import { Box, Button, Container, Grid, GridItem, HStack } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import SystemReviewSidebar from "../../components/systemReviewSidebar";
import UploadImage from "../../components/uploadImage";
import logo from "../../assets/makemyenergylogo.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import bill1 from "../../public/inverter/do.png";
import bill2 from "../../public/inverter/donot.png";
import Dropdownds from "../../components/dropdownds";
import SystemReviewSidebarTwo from "../../components/systemReviewSidebarTwo";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";

export default function Inverter() {

  const router = useRouter();
  const [inverterUrl, setInverterUrl] = useState(null)
  const [openPanel, setOpenPanel] = useState(false);
  const [wallLocation, setWallLocation] = useState(null)

  useEffect(() => {
    if (localStorage.getItem("makemyenergy_Email") === null) {
      router.push("/signin");
    } else {
      axios.get(`/route/getUser/${localStorage.getItem("makemyenergy_Email")}`, { withCredentials: true })
        .then((res) => setInverterUrl(res.data[0].inverter_url))
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

      axios.get(`/route/getUser/${localStorage.getItem("makemyenergy_Email")}`, { withCredentials: true })
        .then((res) => setWallLocation(res.data[0].inverter_standing_pos))
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
  }, []);

  const postWallLocation = async (location) => {
    if (location === null || localStorage.getItem("makemyenergy_Email") === null) {
      alert("Please Select Your Wall Location")
    } else {
      await axios.post(`/route/wallPosition/inverter/${location}/${localStorage.getItem("makemyenergy_Email")}`, { withCredentials: true }).then((response) => {
        if (response.data && response.status == 201) {
          router.push("/customerPanel/roof")
        }
      }).catch(async (error) => {
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
  }

  return (
    <div>
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
        <div>
          {/* Navbar Starts Here  */}
          <div className="flex flex-row w-[100vw] justify-between items-center bg-gradient-to-r from-[#FBC2EB]/25 to-[#A6C1EE]/25">
            <div className="pl-[2vw] md:pl-[6vw] ml-[8vw] md:ml-[4vw] lg:pl-[0vw] xl:pl-[2vw] 2xl:pl-[6vw]">
              <Link href="/">
                <Image
                  src={logo}
                  className="min-w-[30px] md:min-w-[150px] md:w-[180px] lg:w-[180px] xl:w-[180px] 2xl:w-[180px] h-[12.5vh]"
                  alt="MakeMyEnergy_Logo"
                ></Image>
              </Link>
            </div>
            <Dropdownds />
          </div>
          {/* Navbar Ends Here  */}
          {/* Main Container Starts Here  */}
          <div className="bg-white">
            <Container maxW="5xl" className="mt-12">
              <Grid
                templateColumns={{
                  sm: "repeat(2,1fr)",
                  xl: "repeat(4,1fr)",
                }}
                gap={1}
              >
                <GridItem colspan={1} className="hidden xl:block">
                  <div>
                    <SystemReviewSidebar />
                  </div>
                </GridItem>

                <GridItem colSpan={3} className="ml-8">
                  <div className="w-[50px] h-[50px] rounded-full bg-[#21376C] mb-4 xl:hidden">
                    <div>
                      <SlidingPanel type={"left"} isOpen={openPanel}>
                        <div className="absolute z-10 ml-2 mt-2 text-xl font-bold text-red-600">
                          <button onClick={() => setOpenPanel(false)}>
                            <AiFillCloseCircle />
                          </button>
                        </div>
                        <SystemReviewSidebarTwo className="mt-4" />
                      </SlidingPanel>
                    </div>
                    <p
                      className="pl-[16px] pt-[10px] text-xl font-bold text-white cursor-pointer"
                      onClick={() => setOpenPanel(true)}
                    >
                      🡺
                    </p>
                  </div>
                  <Box>
                    <p className="text-2xl font-bold">
                      Upload photos of your inverter
                    </p>
                  </Box>
                  <Box>
                    <p className="mt-4 mr-8 text-gray-600">
                      Pick a place you’d like your inverter to be installed and
                      send us some photos. This location must be under cover or
                      not exposed to too much sun or rain.
                    </p>
                  </Box>
                  <Box className="mt-4">
                    <Grid
                      templateColumns={{
                        sm: "repeat(2,1fr)",
                        md: "repeat(4,1fr)",
                      }}
                      gap={1}
                    >
                      <GridItem
                        colspan={2}
                        className="w-[320] sm:w-[340px] pr-2"
                      >
                        <HStack className="flex">
                          <Box className="w-[75%]">
                            <Box className="rounded border-2 border-[#21376C] -pr-20">
                              <Image src={bill1} />
                            </Box>
                            <Box className="w-[110%] grid justify-items-end -mt-6">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-10 h-10 bg-white rounded-full text-[#21376C]"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </Box>
                          </Box>
                          <Box className="self-start">
                            <h4 className="font-semibold -mt-1">Do</h4>
                            <HStack className="mt-2">
                              <Box>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5 text-[#21376C]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                  />
                                </svg>
                              </Box>
                              <Box className="text-xs text-gray-500">
                                Choose a cool, shaded spot
                              </Box>
                            </HStack>
                            <HStack className="mt-2">
                              <Box>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5 text-[#21376C]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                  />
                                </svg>
                              </Box>
                              <Box className="text-xs text-gray-500">
                                Pick an area close to the meter if possible
                              </Box>
                            </HStack>
                            <HStack className="mt-2">
                              <Box>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5 text-[#21376C]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                  />
                                </svg>
                              </Box>
                              <Box className="text-xs text-gray-500">
                                Try to find an indoor location like a garage
                              </Box>
                            </HStack>
                          </Box>
                        </HStack>
                      </GridItem>

                      <GridItem colspan={2} className="w-[280px] pr-2">
                        <HStack className="flex">
                          <Box className="w-[120%]">
                            <Box className="rounded border-2 border-[#F1643F] -pr-20">
                              <Image src={bill2} />
                            </Box>
                            <Box className="w-[110%] grid justify-items-end -mt-6">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-10 h-10 bg-white rounded-full text-[#F1643F]"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round" 
                                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </Box>
                          </Box>
                          <Box className="self-start">
                            <h4 className="font-semibold -mt-1">Don&apos;t</h4>
                            <HStack className="mt-2">
                              <Box>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5 text-[#F1643F]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </Box>
                              <Box className="text-xs text-gray-500">
                                Choose a spot far from the meter
                              </Box>
                            </HStack>
                            <HStack className="mt-2">
                              <Box>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5 text-[#F1643F]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </Box>
                              <Box className="text-xs text-gray-500">
                                Pick a location with direct sunlight
                              </Box>
                            </HStack>
                            <HStack className="mt-2">
                              <Box>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5 text-[#F1643F]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </Box>
                              <Box className="text-xs text-gray-500">
                                Send poor quality or confusing pictures
                              </Box>
                            </HStack>
                          </Box>
                        </HStack>
                      </GridItem>
                    </Grid>
                  </Box>
                  <Box className="m-1">
                    <Box>
                      <p className="text-xl font-semibold">Upload Photos</p>
                    </Box>
                    <div className="flex w-[40vw] flex-row">
                      <Box className=" w-[300px] -ml-4">
                        <UploadImage route={"inverter_url"} />
                      </Box>
                      <div className='w-[40vw] m-4'>
                        {(inverterUrl !== null) ? <img src={inverterUrl} alt="uploaded image" className='h-[25vh]' /> : <p></p>}
                      </div>
                    </div>
                  </Box>
                  <Box className='w-[55vw]'>
                    <Box className='font-bold text-[#323640]'>
                      If you’re standing outside, facing your front door - where is this wall located?
                    </Box>
                    <div className='flex flex-row'>
                      <Box className='mt-4 w-[40vw]'>
                        <Grid
                          templateColumns={{
                            sm: 'repeat(1,1fr)',
                            md: 'repeat(2,1fr)',
                            xl: 'repeat(2,1fr)'
                          }}
                          gap={8}
                          className="mb-8"
                        >
                          <GridItem>
                            {
                              wallLocation === "Left_Side_of_the_House" ?
                                <Button colorScheme="facebook" variant="solid" color="white" w="100%">Left side of house</Button> :
                                <Button colorScheme='gray' variant='outline' w="100%" _hover={{ bg: "#385898", color: " white" }} className="text-left" onClick={() => { setWallLocation("Left_Side_of_the_House") }} >Left side of house</Button>
                            }
                          </GridItem>
                          <GridItem>
                            {
                              wallLocation === "Right_Side_of_the_House" ?
                                <Button colorScheme="facebook" variant="solid" color="white" w="100%">Right side of house</Button> :
                                <Button colorScheme='gray' variant='outline' w="100%" _hover={{ bg: "#385898", color: " white" }} className="text-left" onClick={() => { setWallLocation("Right_Side_of_the_House") }} >Right side of house</Button>
                            }
                          </GridItem>
                          <GridItem>
                            {
                              wallLocation === "Back_of_the_House" ?
                                <Button colorScheme="facebook" variant="solid" color="white" w="100%">Back of house</Button> :
                                <Button colorScheme='gray' variant='outline' w="100%" _hover={{ bg: "#385898", color: " white" }} className="text-left" onClick={() => { setWallLocation("Back_of_the_House") }} >Back of house</Button>
                            }
                          </GridItem>
                          <GridItem>
                            {
                              wallLocation === "Front_of_the_House" ?
                                <Button colorScheme="facebook" variant="solid" color="white" w="100%">Front of house</Button> :
                                <Button colorScheme='gray' variant='outline' w="100%" _hover={{ bg: "#385898", color: " white" }} className="text-left" onClick={() => { setWallLocation("Front_of_the_House") }} >Front of house</Button>
                            }
                          </GridItem>
                        </Grid>
                      </Box>
                      <div className='ml-[5vw] mt-8'>
                        <div className='w-[50px] h-[50px] rounded-full ml-auto bg-[#21376C] my-4 cursor-pointer'>
                          <p className='pl-[16px] pt-[10px] text-xl font-bold text-white' onClick={() => postWallLocation(wallLocation)}>🡺</p>
                        </div>
                      </div>
                    </div>
                  </Box>
                </GridItem>
              </Grid>
            </Container>
          </div>
        </div>
      </main>
    </div>
  );
}
