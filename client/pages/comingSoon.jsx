import Head from 'next/head'
import Navbar from '../components/navbar';
import TopFooter from '../components/topfooter';

export default function ComingSoon() {

    return (
        <div>
            <Head>
                <title>Make My Energy</title>
                <meta name="description" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
            </Head>
            <main>
                <div>
                    <div className='bg-gradient-to-r from-[#A6C1EE]/20 to-[#FBC2EB]/30 h-[30vh]'>
                        <Navbar />
                    </div>
                    <div className='flex flex-row justify-center h-[30vh] items-center'>
                        <p className='text-5xl font-bold'>Coming Soon</p>
                    </div>
                    {/* Additional Footer Starts Here  */}
                    <TopFooter />
                    {/* Additional Footer Ends Here  */}
                </div>
            </main>
            {/* Footer Starts */}
        </div>
    )
}