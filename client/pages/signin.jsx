import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import logo from "../assets/makemyenergylogo.png";
import Image from 'next/image';
import TopFooter from '../components/topfooter';
import { GridItem, SimpleGrid } from '@chakra-ui/react';
import { TiTickOutline } from 'react-icons/ti';

export default function SignIn() {

    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("makemyenergy_Email") != null) {
            router.push("/customerPanel/designReview")
        }
    })

    const [signinData, setSigninData] = useState({
        email: "",
        password: ""
    });

    const submitSignin = (e) => {
        setSigninData({ ...signinData, [e.target.name]: e.target.value })
    }

    const postSigninData = async (e) => {
        e.preventDefault();
        const submitSigninData = {
            email: signinData.email,
            password: signinData.password,
            user_type: "user"
        };
        await axios.post('/route/signin', submitSigninData).then((response) => {
            if (response.status === 200 && response.data === "Authentication Successful") {
                localStorage.setItem("makemyenergy_Email", signinData.email)
                if (localStorage.getItem("route") !== null) {
                    router.push(localStorage.getItem("route"))
                }
                else {
                    router.push('/customerPanel/designReview')
                }
            }
        }).catch(error => {
            alert("Please Enter Valid Credentials");
            console.log(error)
        })
    };

    return (
        <div>
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
                                <p className='text-black font-bold text-3xl'>Sign in</p>
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
                            <GridItem>
                                <div className='min-w-[360px] w-[360px] m-auto my-[9vh]'>
                                    <div class="w-full max-w-full">
                                        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={e => postSigninData(e)}>
                                            <div class="mb-4">
                                                <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="username"> Email * </label>
                                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required name='email' value={signinData.email} onChange={submitSignin} type="email" placeholder="abc123@gmail.com" />
                                            </div>
                                            <div class="mb-4">
                                                <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password *</label>
                                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required name='password' value={signinData.password} onChange={submitSignin} type="password" placeholder="******************" />
                                            </div>
                                            <div class="flex items-center justify-between">
                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"> Sign In </button>
                                                <Link href="/resetpassword" class="inline-block align-baseline font-bold text-base text-blue-500 hover:text-blue-800" >
                                                    Forgot Password?
                                                </Link>
                                            </div>
                                            <div className='mt-[2vh]'>
                                                <p>Not yet registered? <Link href="/signup" className='text-blue-500 font-semibold'>Register Now</Link></p>
                                            </div>
                                        </form>
                                    </div>
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