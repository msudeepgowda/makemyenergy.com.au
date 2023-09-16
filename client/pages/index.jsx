import Head from 'next/head';
import Link from 'next/link';
import TopFooter from '../components/topfooter';
import Navbar from '../components/navbar';
import Image from 'next/image';
import { Container, HStack, VStack, SimpleGrid, Box, Grid, GridItem, Input, Text, Textarea, Button, useToast } from '@chakra-ui/react'
import img1 from "../assets/map/1westernAustralia.png";
import img2 from "../assets/map/2northern.png";
import img3 from "../assets/map/3south.png";
import img4 from "../assets/map/4queensland.png";
import img5 from "../assets/map/5newsouth.png";
import img6 from "../assets/map/6victoria.png";
import img7 from "../assets/map/7tasmania.png";
import marker from "../assets/map/marker.png"
import { useEffect, useState } from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import axios from 'axios'
import tick from "../assets/tick.png"
import weSaveEnergy from "../assets/weSaveEnergy.png"

export default function Home() {

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: null,
    message: ""
  })

  const toast = useToast();
  const updateData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const submitData = async (e) => {
    e.preventDefault();
    const queryData = {
      mailSubject: "Query",
      mailBody: userData.name + "\n" + userData.email + "\n" + userData.phone + "\n" + userData.message
    };

    await axios.post('/route/submitQuery', queryData).then((response) => {
      if (response.data && response.status == 200) {
        window.location.reload();
        toast({
          title: response.data,
          description: "We will get back to you soon",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
    }).catch(error => { console.log(error) })
  };

  const [mapName, setMapName] = useState(['Western Australia', 'Northen Territory', 'South Australia', 'Queensland', 'New South Wales', 'Australian Capital', 'Tasmania', 'Victoria'])
  const [selectedState, setSelectedState] = useState('Western Australia')
  const [markerPositions, SetMarkerPositions] = useState(
    ['absolute object-cover ml-[15%] mt-[21%] scale-[75%] sm:scale-100 sm:ml-[20%] sm:mt-[35%] object-right z-30',
      'absolute object-cover ml-[40%] mt-[10%] scale-[75%] sm:scale-100 sm:ml-[45%] sm:mt-[25%] object-right z-30',
      'absolute object-cover ml-[42%] mt-[35%] scale-[75%] sm:scale-100 sm:ml-[50%] sm:mt-[48%] object-right z-30',
      'absolute object-cover ml-[65%] mt-[20%] scale-[75%] sm:scale-100 sm:ml-[72%] sm:mt-[30%] object-right z-30',
      'absolute object-cover ml-[67%] mt-[43%] scale-[75%] sm:scale-100 sm:ml-[74%] sm:mt-[58%] object-right z-30',
      'absolute object-cover ml-[75%] mt-[52%] scale-[75%] sm:scale-100 sm:ml-[82%] sm:mt-[66%] object-right z-30',
      'absolute object-cover ml-[67%] mt-[73%] scale-[75%] sm:scale-100 sm:ml-[73%] sm:mt-[86%] object-right z-30',
      'absolute object-cover ml-[63%] mt-[55%] scale-[75%] sm:scale-100 sm:ml-[72%] sm:mt-[70%] object-right z-30'
    ])
  const [loading, setLoading] = useState(true);


  const [markerPosition, setMarkerPosition] = useState(markerPositions[0])

  function changeState(val) {
    setSelectedState(mapName[val]);
    setMarkerPosition(markerPositions[val]);
  }

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 4,
        spacing: 15,
      },
    },
    [
      (slider) => {
        let timeout
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

  const [associationImage, setAssociationImage] = useState([]);
  const [accreditationsPdf, setAccreditationsPdf] = useState([]);

  useEffect(() => {
    axios.get('/route/imageRepo').then((res) => { setAssociationImage(res.data), setLoading(false) }).catch((err) => console.log(err))
    axios.get("/route/certRepo").then((res) => { setAccreditationsPdf(res.data) }).catch((err) => console.log(err))
  }, []);

  return (
    <div>
      <Head>
        <title>Make My Energy</title>
        <meta name="description" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>
      <main >
        <div>
          <Navbar />
          {/* Main Div Container Starts  */}
          <div className=' items-center ' style={{ backgroundImage: 'url(/1.png)', backgroundSize: "cover" }}>
            <div className='py-6 px-4'>
              <p className='font-bold text-3xl max-w-fit m-auto'>Empower The Transition To Sustainable Future</p>
              <p className='py-6 max-w-fit m-auto'>Make My Energy is Australia&apos;s one-stop energy solution platform rooted in Victoria, assisting Australians nationwide. </p>
            </div>
            <Container maxW='6xl' borderRadius="5px" borderWidth="2px" borderColor="#ffffff" boxShadow='2xl' >
              <Container centerContent>
                <Link href={`/design?stateData=${selectedState}`}>
                  <div className='bg-[#21376C] text-lg h-[46px] font-bold rounded-b-md text-white w-[170px]'>
                    <p className='pl-[1.7vw] py-[0.6vh] '>Design Now</p>
                  </div>
                </Link>
              </Container><br /><br />
              <SimpleGrid columns={[null, null, 1, 2]} spacing='10px' className='-mt-8 mx-auto' id="my-id">
                <Box className='hidden sm:block max-w-fit m-auto'>
                  <div class="relative  z-30">
                    <Image src={marker} alt="BannerImage" class={markerPosition} />
                  </div>
                  <HStack className='-mt-20 m-auto w-[550px] hidden ' >
                    <Box className='-mr-2 z-10 scale-[105%] sm:scale-105'>
                      <Image
                        src={img1}
                        className="hover:scale-105 "
                      />
                    </Box>
                    <Box className='z-20'>
                      <Image
                        src={img2}
                        className="hover:scale-105 "
                      />
                      <Image
                        src={img3}
                        className="hover:scale-105 "
                      />
                    </Box>
                    <Box >
                      <Image
                        src={img4}
                        className="-ml-[23px] mt-[107px] sm:scale-[115%] hover:scale-[121%] "
                      />
                      <Image
                        src={img5}
                        className="scale-105 mt-[6px] -ml-2 sm:scale-100 hover:scale-110 "
                      />
                      <Image
                        src={img6}
                        className="-mt-[59px] -ml-[8px] hover:scale-105 "
                      />
                      <Image
                        src={img7}
                        className="mt-[25px] ml-[23px] hover:scale-105 "
                      />
                    </Box>
                  </HStack>
                </Box>
                <Box className='block sm:hidden pt-8 max-w-fit m-auto '>
                  <div class="relative">
                    <Image src={marker} alt="BannerImage" class={markerPosition} />
                  </div>
                  <HStack className='-mt-20 hidden m-auto' >
                    <Box className='-mr-2 z-10 sm:scale-105 '>
                      <Image
                        src={img1}
                        className="w-[110px] ml-[2px] hover:scale-105 "
                      />
                    </Box>
                    <Box className='' >
                      <Image
                        src={img2}
                        className="w-[70px] hover:scale-105 "
                      />
                      <Image
                        src={img3}
                        className="w-[87px] hover:scale-105 "
                      />
                    </Box>
                    <Box className="">
                      <Image
                        src={img4}
                        className="-ml-[23px] mt-[56px] w-[135px] sm:scale-[115%] hover:scale-[121%] "
                      />
                      <Image
                        src={img5}
                        className="-mt-[11px] -ml-[12px] w-[108px] scale-90 sm:scale-100 hover:scale-110 "
                      />
                      <Image
                        src={img6}
                        className="-mt-[37px] -ml-[7px] w-[62px] hover:scale-105 "
                      />
                      <Image
                        src={img7}
                        className="mt-[19px] ml-[10px] w-[30px] hover:scale-105 "
                      />
                    </Box>
                  </HStack>
                </Box>
                <Box className="ml-[0%] md:ml-[10%]" >
                  <Box className='rounded-md mt-[2vh]' >
                    <span className='mx-10'>
                      <p className='px-[1.5vw] text-lg font-bold text-blue-900'>Select Your State</p>
                    </span>
                    <SimpleGrid columns={[2, 2, 2, 1, 2]} spacing='2px' >
                      {mapName.map((stateName, index) => (
                        stateName == selectedState ?
                          (<span key={index}>
                            <GridItem className='w-[100%]'>
                              <div className='bg-[#21376C] text-white p-[0.4vw] ml-4 my-[1vh] h-[50px] flex rounded-md '>
                                <span className="bg-white rounded-full w-[16px] h-[16px] mt-1 ml-2 p-auto flex flex-shrink-0 justify-center items-center relative">
                                  <input aria-labelledby="label2" type="radio" name="radio" className="checkbox appearance-none border-[2px] rounded-full border-[#21376C] cursor-pointer w-[80%] h-[80%]" />
                                </span>
                                <span className='px-[1vw]'>  {stateName} </span>
                              </div>
                            </GridItem>
                          </span>) : (<span key={index} onClick={() => changeState(index)}>
                            <GridItem >
                              <HStack className='bg-white p-[0.4vw] ml-4 my-[1vh] h-[50px] rounded-md cursor-pointer' >
                                <span className='h-[100%] mt-4 ml-2' >
                                  <input aria-labelledby="label2" type="radio" name="radio" className=" border-2 rounded-full border-[#21376C] cursor-pointer w-[16px] h-[16px]" />
                                </span>
                                <span className='px-[1vw]'> {stateName}</span>
                              </HStack>
                            </GridItem>
                          </span>)
                      ))}
                    </SimpleGrid>
                    {/* href="/design" */}
                    <div><Link href={`/design?stateData=${selectedState}`}>
                      <div className='w-[50px] h-[50px] rounded-full ml-auto bg-[#21376C] my-4'>
                        <p className='pl-[16px] pt-[10px] text-xl font-bold text-white '>🡺</p>
                      </div></Link>
                    </div>
                  </Box>
                </Box>
              </SimpleGrid><br />
            </Container>
            <br /><br />
          </div><br /><br />
          {/* Main Div Container Ends*/}
          <div className=' bg-white ' style={{ backgroundImage: 'url(/secondBg.png)', backgroundSize: "cover" }}>
            <div className=' flex flex-row '>
              <SimpleGrid columns={[null, null, 1, 2]} spacing='10px' className='mb-20 '>
                <GridItem className='flex justify-center items-center ml-auto'>
                  <div className='w-12/12'>
                    <img src="./2content.png" alt="" className='w-[60vh] h-[60vh]' />
                  </div>
                </GridItem>
                <GridItem className='flex justify-center items-center m-auto w-[85%]'>
                  <div className='text-center w-5/6'>
                    <div className='text-3xl font-extrabold'>Our Vision is to provide a platform</div><br />
                    <p>Enabling you to design a solar system unique to your home and specific energy needs. We know that each customer&apos;s energy usage is different, which is why we are developing an interactive platform to let you determine a tailor-made solar system to suit your home and lifestyle.</p>
                    <br />
                  </div>
                </GridItem>
              </SimpleGrid>
            </div>
          </div>
          {/* One Stop Energy Section Starts  */}
          <div className='w-auto bg-pink-50 flex justify-center px-10' style={{ backgroundImage: 'url(/2.png)' }}>
            <SimpleGrid columns={[1]} spacing='10px' maxW='7xl' ><br />
              <GridItem className='text-center'>
                <p className='font-bold text-3xl'>Your One Stop Energy Solution</p>
              </GridItem><br />
              <GridItem className='text-center'>
                <p className='text-center text-lg '>Our energy solutions enable you to control your energy costs, as well as add value to your home. Installing Solar Panels decreases your reliance on the electricity sourced from the Local network provider, thereby shielding you from looming surge in electricity price. With Make my Energy, harness the power of sun to start saving exponentially</p>
              </GridItem>
              <SimpleGrid columns={[null, null, 1, 3]} spacing='10px' className='mt-2 mb-8'>
                <GridItem className='flex justify-center mt-8 items-center scale-110'>
                  <div className='bg-pink-100 rounded-xl  w-[80%] flex flex-col  space-y-[2vh] cursor-pointer items-center '>
                    <Link href="#my-id">
                      <div className='shadow-lg rounded-xl mt-[3vh] p-6 flex flex-col items-center'>
                        <img src="selectEnergy/first.png" alt="first" className='scale-[130%]' />
                      </div>
                      <p className='font-semibold  py-8'>Design The Solar System </p>
                    </Link>
                  </div>
                </GridItem>
                <GridItem className='flex justify-center items-center scale-105 mt-8 '>
                  <div className='bg-pink-100 rounded-xl  w-[80%] flex flex-col space-y-[2vh] items-center '>
                    <div className='shadow-lg rounded-xl mt-[3vh] p-6 flex flex-col items-center'>
                      <a href="https://makemyenergy.s3.us-west-2.amazonaws.com/energyplanpdf/Commercial+proposal+pack.pdf" target="__blank" rel="noreferrer"><img src="selectEnergy/second.png" alt="first" className='scale-[130%] cursor-pointer' /></a>
                    </div>
                    <p className='font-semibold py-8'><a href="https://makemyenergy.s3.us-west-2.amazonaws.com/energyplanpdf/Commercial+proposal+pack.pdf" target="__blank" rel="noreferrer">Make My Energy Efficient</a> </p>
                  </div>
                </GridItem>
                <GridItem className='flex justify-center items-center mt-8 scale-110'>
                  <div className='bg-pink-100 rounded-xl w-[80%] flex flex-col  space-y-[2vh] cursor-pointer items-center ' onClick={() => alert("Coming Soon")}>
                    <div className='shadow-lg rounded-xl mt-[3vh] p-6 flex flex-col items-center'>
                      <img src="selectEnergy/third.png" alt="first" className='scale-[130%]' />
                    </div>
                    <p className='font-semibold py-8'>Select The Energy Plan </p>
                  </div>
                </GridItem>
              </SimpleGrid>
              <br /><br />
            </SimpleGrid>
          </div>
          {/* One Stop Energy Section Ends  */}
          <div className='w-auto bg-gradient-to-r from-[#F5F7FA] to-[#C3CFE2] m-auto pb-8'>
            <SimpleGrid columns={[null, null, 1, 2]} spacing={6} className='mx-auto w-[100%] sm:w-[80%]' >
              <Box className='mx-[16%]'>
                <VStack>
                  <p className='font-extrabold text-3xl mt-10 -ml-16 '>We Save With<br /> Make My Energy ?</p>
                  <Box>
                    <div className='my-[1.5vh] flex flex-row'>
                      <div className='bg-white rounded-full w-[60px] h-[30px]'>
                        <Image src={tick} className='w-[60px] h-[40px] mt-[-0.5vh]' alt="Tick Mark Image"></Image>
                      </div>
                      <div className='ml-[1vw] mt-[0.2vh]'>
                        <p className='font-bold text-lg'>Power of choice - It&apos;s all about you</p>
                        <p className='py-2'>Make my Energy empowers you to design your own solution with the assistance of highly experienced and skilled team.</p>
                      </div>
                    </div>
                  </Box>
                  <Box>
                    <div className='my-[1.5vh] flex flex-row'>
                      <div className='bg-white rounded-full w-[60px] h-[30px]'>
                        <Image src={tick} className='w-[30px] h-[40px] mt-[-0.5vh]' alt="Tick Mark Image"></Image>
                      </div>
                      <div className='ml-[1vw] mt-[0.2vh]'>
                        <p className='font-bold text-lg'>Finest &amp; Cutting-edge Technologies</p>
                        <p className='py-2'>We provide best technology available today. We offer the most diversified product range to cater each and every requirement of home or business.</p>
                      </div>
                    </div>
                  </Box>
                  <Box>
                    <div className='my-[1.5vh] flex flex-row'>
                      <div className='bg-white rounded-full w-[60px] h-[30px]'>
                        <Image src={tick} className='w-[30px] h-[40px] mt-[-0.5vh]' alt="Tick Mark Image"></Image>
                      </div>
                      <div className='ml-[1vw] mt-[0.2vh]'>
                        <p className='font-bold text-lg'>Unrivalled Service</p>
                        <p className='py-2'> Make my Energy is customer-oriented company, and your satisfaction is of supreme prominence. We are highly regulated and certified from government.</p>
                      </div>
                    </div>
                  </Box>
                </VStack>
              </Box>
              <Box className='m-auto'>
                <Grid gap={0} >
                  {/* <GridItem className='bg-white w-[40vw] sm:w-[210px] flex justify-center p-4'> */}
                  <Image src={weSaveEnergy} alt="" />
                  {/* </GridItem> */}
                </Grid>
              </Box>
            </SimpleGrid>
          </div>
          {/* Associations Section Starts  */}
          <div className='bg-white mb-10 '>
            <Link href="/associations">
              <div className=' mt-[3vh] mb-16y items-center flex flex-col'>
                <p className='text-4xl mt-4 font-bold'>Associations</p>
                {loading ? null :
                  <div ref={sliderRef} className="keen-slider flex jsutify-center mt-10">
                    <div className=" keen-slider__slide number-slide1">
                      <img src={associationImage[0].logo_image_url} className='' alt={associationImage[0].brand} />
                    </div>
                    <div className=" keen-slider__slide number-slide2">
                      <img src={associationImage[1].logo_image_url} className='' alt={associationImage[1].brand} />
                    </div>
                    <div className=" keen-slider__slide number-slide3">
                      <img src={associationImage[2].logo_image_url} className='' alt={associationImage[2].brand} />
                    </div>
                    <div className=" keen-slider__slide number-slide4">
                      <img src={associationImage[3].logo_image_url} className='' alt={associationImage[3].brand} />
                    </div>
                    <div className=" keen-slider__slide number-slide5">
                      <img src={associationImage[4].logo_image_url} className='' alt={associationImage[4].brand} />
                    </div>
                    <div className=" keen-slider__slide number-slide6">
                      <img src={associationImage[5].logo_image_url} className='' alt={associationImage[5].brand} />
                    </div>
                    <div className=" keen-slider__slide number-slide7">
                      <img src={associationImage[6].logo_image_url} className='' alt={associationImage[6].brand} />
                    </div>
                    <div className=" keen-slider__slide number-slide8">
                      <img src={associationImage[7].logo_image_url} className='' alt={associationImage[7].brand} />
                    </div>
                  </div>
                }
              </div>
            </Link>
          </div>
          {/* Associations Section Ends  */}
          <div className='bg-blue-200' style={{ backgroundImage: 'url(/3.png)' }}>
            <SimpleGrid columns={[null, null, 1, 2]} spacing={10} maxW='6xl' className='mx-auto mt-10  ' >
              <Box className='mt-10 flex justify-center lg:justify-end'>
                <div className='m-4'>
                  <p>Improving The Performance of Solar Energy</p>
                  <p className='font-extrabold text-3xl mt-2 '>Residential <span>&#38;</span> Commercial <br /> Solar Systems</p>
                  <div className='my-[1vh] flex flex-row' >
                    <div className='bg-white rounded-full w-[30px] h-[30px] mt-[1vh]'>
                      <Image src={tick} className='w-[30px] h-[40px] mt-[-0.5vh]' alt="Tick Mark Image"></Image>
                    </div>
                    <p className='w-56 py-2 pl-4'> Receive an accurate quote within 3-5 days by filling out this form or calling us at <span className='text-3xl text-blue-900 font-bold'>1300377777</span></p>
                  </div>
                </div>
              </Box>
              <Box>
                <div className='shadow-xl mt-4 mb-16 rounded-md border-2 border-white bg-transparent mx-1 sm:mx-10'>
                  <form onSubmit={(e) => submitData(e)} className='px-[1.8vw] ' >
                    <p className='text-blue-900 font-bold text-lg pt-5 py-[0.5vh] '>Request A Quote</p>
                    <VStack >
                      <Box className='ml-0  w-full mt-4'>
                        <Text mb='8px' className='font-semibold'>Name</Text>
                        <Input
                          placeholder='Name'
                          size='md'
                          background="white"
                          border="none"
                          type="text"
                          onChange={updateData}
                          name='name'
                          value={userData.name}
                        />
                      </Box>
                      <Box className='ml-0 w-full mt-4 '>
                        <HStack spacing={2} className="mt-2 ">
                          <Box className="w-full">
                            <Text mb='8px' className='font-semibold'>Email</Text>
                            <Input
                              placeholder='abcxyz@gmail.com'
                              size='md'
                              background="white"
                              border="none"
                              type="email"
                              onChange={updateData}
                              name='email'
                              value={userData.email}
                            />
                          </Box>
                          <Box className='w-full'>
                            <Text mb='8px' className='font-semibold'>Number</Text>
                            <Input
                              placeholder='+60 3653653650'
                              size='md'
                              background="white"
                              border="none"
                              type="number"
                              onChange={updateData}
                              name='phone'
                              value={userData.phone}
                            />
                          </Box>
                        </HStack>
                      </Box>
                      <Box className='ml-0  w-full mt-4'>
                        <Text mb='8px' className='font-semibold'>Message</Text>
                        <Textarea
                          placeholder='Please Enter Your Message'
                          size='md'
                          background="white"
                          border="none"
                          type="text"
                          onChange={updateData}
                          name='message'
                          value={userData.message}
                        />
                      </Box>
                      <Box className='mt-8 w-full'>
                        <Button colorScheme='facebook' type='submit' className='w-full mt-4 mb-4'>Submit</Button>
                      </Box>
                    </VStack>
                  </form>
                </div><br /><br /><br /><br />
              </Box>
            </SimpleGrid>
          </div>
          {/* Form  */}
          {/* Accreditations Section Starts  */}
          <div className='flex flex-col absolute mt-[-14vh] items-center w-[95vw] h-[32vh] md:w-[60vw] md:ml-[20vw] ml-[2.5vw] bg-white rounded-md shadow-2xl'>
            <p className='text-3xl pt-[5vh] pb-[2.5vh] font-extrabold'>Accreditations</p>
            <span className='flex flex-row'>
              {
                accreditationsPdf[0] != null ?
                  <a href={accreditationsPdf[0].cert_url} className='flex flex-row' target="__blank">
                    <img src="data:image/png;base64,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" className='w-[45%] h-[13vh] mt-[2vh]' alt="logo" />
                    <img src="data:image/png;base64,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" className='w-[45%] ml-[5%] h-[18vh]' alt="logo" />
                  </a>
                  :
                  <span className='flex flex-row '>
                    <img src="data:image/png;base64,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" className='w-[45%] h-[13vh] mt-[2vh]' alt="logo" />
                    <img src="data:image/png;base64,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" className='w-[45%] ml-[5%] h-[18vh]' alt="logo" />
                  </span>
              }
            </span>
          </div>
          {/* Accreditations Section Ends  */}
          <div className='pt-[180px] bg-gray-100'>
            <TopFooter />
          </div>
        </div>
      </main>
    </div>
  )
}