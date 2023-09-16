import Head from 'next/head';
import Link from 'next/link';
import axios from "axios";
import logo from "../../../assets/makemyenergylogo.png";
import Image from 'next/image';
import TopFooter from "../../../components/topfooter";
import { useSearchParams } from 'next/navigation';
import { useToast } from '@chakra-ui/react';

const ResetPassword = () => {

    const params = useSearchParams();
    const toast = useToast();

    const userData = {
        email: params.get("email"),
        token: params.get("token")
    };

    const verifyUserData = async () => {
        if (userData.email !== null && userData.token !== null) {
            try {
                const response = await axios.post(`/route/resetpassword`, userData);
                toast({
                    title: response.data,
                    duration: 4000,
                    isClosable: true,
                    position: "top position",
                })
            } catch (error) {
                toast({
                    title: error.response.data,
                    duration: 4000,
                    isClosable: true,
                    position: "top position",
                })
            }
        }
    }

    verifyUserData()


    // const submitResetData = (e) => {
    //     setResetData({ email: e.target.value })
    // }

    // const postResetData = async (e) => {
    //     e.preventDefault();
    //     const submitUserData = {
    //         email: resetData.email,
    //         user_type: "user"
    //     };
    //     await axios.post('http://localhost:3050/route/forgotPassword', submitUserData).then((response) => {
    //         if (response.status !== null && response.data !== null) {
    //             alert(response.data)
    //         }
    //     }).catch(error => {
    //         alert("Error While Sending Mail, PLease Try again");
    //     })
    // };

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
                        <div className='min-w-[360px]  w-[360px] m-auto my-[2vh]'>
                            {/* <div class="w-full max-w-full flex flex-col items-center justify-center pt-[5vh]">
                                <p className='text-black font-bold text-3xl'>Reset Password</p>
                                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={e => postResetData(e)}>
                                    <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="username"> Email * </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required name='email' value={resetData.email} onChange={submitResetData} type="email" placeholder="abc123@gmail.com" />
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"> Submit </button>
                                    </div>
                                </form>
                            </div> */}
                        </div>
                    </div>
                </div>
                <TopFooter />
            </main >
        </div >
    )
}

export default ResetPassword