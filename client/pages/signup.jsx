import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import logo from "../assets/makemyenergylogo.png";
import Image from 'next/image';
import TopFooter from '../components/topfooter';
import { GridItem, SimpleGrid, useToast } from '@chakra-ui/react';
import { TiTickOutline } from 'react-icons/ti';

export default function SignUp() {
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        phone: null,
        email: "",
        streetaddress: "",
        suburb: "",
        state: "",
        zipcode: "",
        password: ""
    })

    const toast = useToast();
    const updateData = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const router = useRouter();

    const submitData = async (e) => {
        e.preventDefault();
        if (userData.state == "") {
            alert("Please Select a Valid State")
            return
        }
        const profileData = {
            _id: userData.email,
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            phone: userData.phone,
            address: userData.streetaddress,
            suburb: userData.suburb,
            state: userData.state,
            zip: userData.zipcode,
            password: userData.password,
            user_type: "user"
        };
        await axios.post('/route/signup', profileData).then((response) => {
            if (response.data === "User Account Created successfully" && response.status === 201) {
                toast({
                    title: response.data,
                    description: "Thank You for Creating your Account",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                router.push('/signin')
            }
        }).catch(error => { console.log(error) })
    };

    return (
        <div >
            <Head>
                <title>Make My Energy</title>
                <meta name="description" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className='bg-gradient-to-r from-[#FBC2EB]/20 to-[#A6C1EE]/30 '>
                    {/* SignIn Navbar Starts Here  */}
                    <div className='flex flex-row w-[90vw] justify-between items-center '>
                        <div className='pl-[6vw] ml-[8vw]'>
                            <Link href="/"><Image src={logo} className='min-w-[30px] md:min-w-[150px] md:w-[150px] lg:w-[140px] xl:w-[160px] 2xl:w-[180px] h-[15vh]' alt='MakeMyEnergy_Logo'></Image></Link>
                        </div>
                        <div className='bg-blue-900 mr-[4vw] rounded-md items-center justify-center flex flex-row h-[40px] w-[150px]'>
                            <p className='text-white font-bold text-base rounded'>Call Now</p>
                        </div>
                    </div>
                    {/* SignIn Navbar Ends Here  */}
                    {/* Main Container Starts Here  */}
                    <div className='w-[100vw] bg-white'>
                        <SimpleGrid columns={[null, 1, 2]} spacing={4} maxW='6xl' className='mx-auto mt-10' >
                            <GridItem className='mt-10 px-10'>
                                <p className='text-black font-bold text-3xl'>Sign Up</p>
                                <p className='font-normal my-[2vh]'>We offer products, solutions, and services across the entire energy value chain. We support our customers on their way to a more sustainable future – no matter how far along the journey to energize society with affordable energy systems.</p>
                                <div className='py-[1vh] ml-[0.2vw]'>
                                    <ul className=" marker:text-blue-900 font-semibold">
                                        <li> <TiTickOutline className='inline rounded-full text-white bg-[#21376C] mr-[0.4vw]' /> Reliability performance</li>
                                        <li> <TiTickOutline className='inline rounded-full text-white bg-[#21376C] mr-[0.4vw]' /> 50% more energy output </li>
                                        <li> <TiTickOutline className='inline rounded-full text-white bg-[#21376C] mr-[0.4vw]' /> Solar material financing</li>
                                        <li> <TiTickOutline className='inline rounded-full text-white bg-[#21376C] mr-[0.4vw]' /> Built using ntype mono</li>
                                        <li> <TiTickOutline className='inline rounded-full text-white bg-[#21376C] mr-[0.4vw]' /> In-time manufacturing</li>
                                    </ul>
                                </div>
                            </GridItem>
                            {/* Login Section Starts Here  */}
                            <GridItem className='m-auto'>
                                <div className='px-4 my-[6vh]'>
                                    <form onSubmit={(e) => submitData(e)} className="p-auto">
                                        <div className="flex flex-row items-center mb-4 w-full">
                                            <div className=' px-[0.5vw]'>
                                                <input className="bg-[#F2F2F2] appearance-none border-2 border-gray-200 rounded w-[170px] sm:w-[200px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" onChange={updateData} required name='first_name' value={userData.first_name} placeholder="First Name *" />
                                            </div>
                                            <div className=' px-[0.5vw]'>
                                                <input className="bg-[#F2F2F2] appearance-none border-2 border-gray-200 rounded w-[170px] sm:w-[200px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" onChange={updateData} required name='last_name' value={userData.last_name} placeholder="Last Name *" />
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center mb-4">
                                            <div className=' px-[0.5vw]'>
                                                <input className="bg-[#F2F2F2] appearance-none border-2 border-gray-200 rounded w-[170px] sm:w-[200px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="number" onChange={updateData} required name='phone' value={userData.phone} placeholder="Phone *" />
                                            </div>
                                            <div className=' px-[0.5vw]'>
                                                <input className="bg-[#F2F2F2] appearance-none border-2 border-gray-200 rounded w-[170px] sm:w-[200px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="email" onChange={updateData} required name='email' value={userData.email} placeholder="Email *" />
                                            </div>
                                        </div>

                                        <div className=" px-[0.5vw] mb-4">
                                            <input className="bg-[#F2F2F2] appearance-none border-2 border-gray-200 rounded w-[340px] sm:w-[420px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" onChange={updateData} required name='streetaddress' value={userData.streetaddress} placeholder="Street address *" />
                                        </div>

                                        <div className="flex flex-row items-center mb-4">
                                            <div className=' px-[0.5vw]'>
                                                <input className="bg-[#F2F2F2] appearance-none border-2 border-gray-200 rounded w-[170px] sm:w-[200px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" onChange={updateData} required name='suburb' value={userData.suburb} placeholder="Suburb *" />
                                            </div>
                                            <div className='px-[0.5vw]'>
                                                <form className="bg-[#F2F2F2] appearance-none border-2 border-gray-200 rounded w-[170px] sm:w-[200px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                                    <select id="state" name="state" onChange={updateData} required className="bg-[#F2F2F2] text-gray-700 sm:w-[168px] leading-tight focus:outline-none focus:border-purple-500" value={userData.state}  >
                                                        <option value="" disabled>Select Your State *</option>
                                                        <option value="Western Australia">Western Australia</option>
                                                        <option value="Northen Territory">Northen Territory</option>
                                                        <option value="South Australia">South Australia</option>
                                                        <option value="Queensland">Queensland</option>
                                                        <option value="New South Wales">New South Wales</option>
                                                        <option value="Australian Capital">Australian Capital</option>
                                                        <option value="Tasmania">Tasmania</option>
                                                        <option value="Victoria">Victoria</option>
                                                    </select>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center mb-4">
                                            <div className=' px-[0.5vw]'>
                                                <input className="bg-[#F2F2F2] appearance-none border-2 border-gray-200 rounded w-[170px] sm:w-[200px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="number" onChange={updateData} required name='zipcode' value={userData.zipcode} placeholder="Zipcode *" />
                                            </div>
                                            <div className=' px-[0.5vw]'>
                                                <input className="bg-[#F2F2F2] appearance-none border-2 border-gray-200 rounded w-[170px] sm:w-[200px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="password" onChange={updateData} required name='password' value={userData.password} placeholder="Password *" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <button className="shadow bg-blue-900 w-[330px] sm:w-[400px] hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 mt-[1vh] px-4 rounded" type="submit">
                                                Sign Up
                                            </button>
                                            <p>Already registered before ? <Link href="/signin" className='text-blue-800'>Sign in</Link></p>
                                        </div>
                                    </form>
                                </div>
                            </GridItem>
                        </SimpleGrid>
                    </div>
                </div>
                <TopFooter />
            </main >
        </div >
    )
}
