import Link from 'next/link';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";
import { GiHamburgerMenu } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router';
import axios from 'axios';

const Dropdown = () => {

  const [email, setEmail] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("makemyenergy_Email") != null) {
      setEmail(localStorage.getItem("makemyenergy_Email"));
    }
  }, [])

  const logOut = async () => {
    await axios.get(`/route/logout`).then((response) => {
      if (response.data === "Logout Successful" && response.status == 200) {
        localStorage.removeItem("makemyenergy_Email")
        router.push("/")
        window.location.reload()
      }
    }).catch(error => { console.log(error) })
  }

  const [dropDown, setDropDown] = useState(false);

  return (
    <div>
      <div className='flex md:hidden'>
        {dropDown == true ?
          <span className='z-20'>
            <GiHamburgerMenu size={32} onClick={() => { setDropDown(false) }} className="cursor-pointer" />
            <div className='absolute top-[11vh] items-center space-y-2 py-4 left-0 bg-gradient-to-r from-[#FBC2EB]/100 to-[#A6C1EE]/100 w-full flex flex-col'>
              <Menu>
                <MenuButton className='px-[1vw] py-[1vw]'> About Us <RiArrowDropDownLine className='inline' size={30} /> </MenuButton>
                <MenuList className='ml-[5vw] w-[88vw] mr-[5vw] flex flex-col items-center justify-center'>
                  <Link href="/associations"><p>Accreditations</p></Link>
                  <MenuDivider />
                  <Link href="/associations"><p>Associations</p></Link>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton className='px-[1vw] py-[1vw]'> Services <RiArrowDropDownLine className='inline' size={30} /> </MenuButton>
                <MenuList className='ml-[5vw] w-[88vw] mr-[5vw] flex flex-col items-center justify-center'>
                  <Link href="/comingSoon"><MenuItem>Solar Installation - Regional</MenuItem></Link>
                  <MenuDivider />
                  <Link href="/comingSoon"><MenuItem>Solar Installation - Metro</MenuItem></Link>
                  <MenuDivider />
                  <Link href="/comingSoon"><MenuItem>Solar Installation - Residential</MenuItem></Link>
                  <MenuDivider />
                  <Link href="/comingSoon"><MenuItem>Solar Installation - Commercial</MenuItem></Link>
                  <MenuDivider />
                  <Link href="/comingSoon"><MenuItem>Energy Efficiency Programmes</MenuItem></Link>
                  <MenuDivider />
                  <Link href="/comingSoon"><MenuItem>Energy Monitoring</MenuItem></Link>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton className='px-[1vw] py-[1vw]'> Products <RiArrowDropDownLine className='inline' size={30} /> </MenuButton>
                <MenuList className='ml-[5vw] w-[88vw] mr-[5vw] flex flex-col items-center justify-center'>
                  <Link href="/panels"><p>Panels</p></Link>
                  <MenuDivider />
                  <Link href="/inverter"><p>Inverter</p></Link>
                  <MenuDivider />
                  <Link href="/battery"><p>Battery</p></Link>
                  <MenuDivider />
                  <Link href="/ev_charger"><p>EV Charger</p></Link>
                  <MenuDivider />
                  <Link href="/optimizer"><p>Optimizer</p></Link>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton className='px-[1vw] py-[1vw]' > Resources <RiArrowDropDownLine className='inline' size={30} /> </MenuButton>
                <MenuList className='ml-[5vw] w-[88vw] mr-[5vw] flex flex-col items-center justify-center'>
                  <Link href="/comingSoon"><MenuItem>How does solar works</MenuItem></Link>
                  <MenuDivider />
                  <Link href="/comingSoon"><MenuItem>Rebates</MenuItem></Link>
                  <MenuDivider />
                  <Link href="/comingSoon"><MenuItem>Calculate Savings</MenuItem></Link>
                  <MenuDivider />
                  <Link href="/comingSoon"><MenuItem>Complaint Handling Procedures</MenuItem></Link>
                  <MenuDivider />
                  <Link href="/comingSoon"><MenuItem>Covid - 19 Precautions</MenuItem></Link>
                  <MenuDivider />
                  <Link href="/comingSoon"><MenuItem>CEC Code of Conduct</MenuItem></Link>
                  <MenuDivider />
                  <Link href="/comingSoon"><MenuItem>Terms and Conditions</MenuItem></Link>
                </MenuList>
              </Menu>
              <Link href="/signin" className='ml-[-2vw] py-[1vw]' >Login</Link>
              <div className='bg-blue-900 ml-[-3vw] rounded-md items-center justify-center flex flex-row h-[40px] w-[150px]'>
                <p className='text-white font-bold text-base rounded cursor-pointer'>Call Now</p>
              </div>
            </div>
          </span> :
          <GiHamburgerMenu size={32} onClick={() => { setDropDown(true) }} className="cursor-pointer" />
        }
      </div>
      <div className='hidden md:flex pl-[10vw] pr-[6vw] lg:mr-[4vw]'>
        <Menu>
          <MenuButton className='px-[1vw] py-[1vw]'> <span className='flex flex-row'> <p className='min-w-[70px]'>About Us</p> <RiArrowDropDownLine className='inline mt-[-2px]' size={30} /> </span> </MenuButton>
          <MenuList>
            <Link href="/associations"><MenuItem> Accreditations</MenuItem></Link>
            <MenuDivider />
            <Link href="/associations"><MenuItem>Associations</MenuItem></Link>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton className='px-[1vw] py-[1vw]'> <span className='flex flex-row'> <p>Services</p> <RiArrowDropDownLine className='inline mt-[-2px]' size={30} /> </span> </MenuButton>
          <MenuList>
            <Link href="/comingSoon"><MenuItem>Solar Installation - Regional</MenuItem></Link>
            <MenuDivider />
            <Link href="/comingSoon"><MenuItem>Solar Installation - Metro</MenuItem></Link>
            <MenuDivider />
            <Link href="/comingSoon"><MenuItem>Solar Installation - Residential</MenuItem></Link>
            <MenuDivider />
            <Link href="/comingSoon"><MenuItem>Solar Installation - Commercial</MenuItem></Link>
            <MenuDivider />
            <Link href="/comingSoon"><MenuItem>Energy Efficiency Programmes</MenuItem></Link>
            <MenuDivider />
            <Link href="/comingSoon"><MenuItem>Energy Monitoring</MenuItem></Link>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton className='px-[1vw] py-[1vw]'> <span className='flex flex-row'> <p>Products</p> <RiArrowDropDownLine className='inline mt-[-2px]' size={30} /> </span> </MenuButton>
          <MenuList>
            <Link href="/panels"><MenuItem>Panels</MenuItem></Link>
            <MenuDivider />
            <Link href="/inverter"><MenuItem>Inverter</MenuItem></Link>
            <MenuDivider />
            <Link href="/battery"><MenuItem>Battery</MenuItem></Link>
            <MenuDivider />
            <Link href="/ev_charger"><MenuItem>EV Charger</MenuItem></Link>
            <MenuDivider />
            <Link href="/optimizer"><MenuItem>Optimizer</MenuItem></Link>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton className='px-[1vw] py-[1vw]'> <span className='flex flex-row'> <p>Resources</p> <RiArrowDropDownLine className='inline mt-[-2px]' size={30} /> </span> </MenuButton>
          <MenuList>
            <Link href="/comingSoon"><MenuItem>How does solar works</MenuItem></Link>
            <MenuDivider />
            <Link href="/comingSoon"><MenuItem>Rebates</MenuItem></Link>
            <MenuDivider />
            <Link href="/comingSoon"><MenuItem>Calculate Savings</MenuItem></Link>
            <MenuDivider />
            <Link href="/comingSoon"><MenuItem>Complaint Handling Procedures</MenuItem></Link>
            <MenuDivider />
            <Link href="/comingSoon"><MenuItem>Covid - 19 Precautions</MenuItem></Link>
            <MenuDivider />
            <Link href="/comingSoon"><MenuItem>CEC Code of Conduct</MenuItem></Link>
            <MenuDivider />
            <Link href="/comingSoon"><MenuItem>Terms and Conditions</MenuItem></Link>
          </MenuList>
        </Menu>
        <Menu>
          <div>
            {
              (email === null) ?
                <Link href="/signin" className='px-[1vw] py-[1vw]'><p className='font-bold'>Login</p></Link>
                :
                <div className=' items-center justify-center flex flex-row mt-[1.3vh]  h-[40px] w-[260px]'>
                  <Link href="/customerPanel/designReview" className='px-[1vw] py-[1vw] flex flex-ro' > <CgProfile size={40} /> <p className=' pl-2 pt-2 font-bold '>{email}</p></Link>
                  <MenuButton> <RiArrowDropDownLine size={35} /> </MenuButton>
                  <MenuList className='mr-[1.2vw]'>
                    <span onClick={() => { logOut() }}><MenuItem>Log Out</MenuItem></span>
                  </MenuList>
                </div>
            }
          </div>
        </Menu>
      </div>
    </div>
  )
}

export default Dropdown;