"use client"
import React, { FC, useState  } from 'react'
import Protected from '../hooks/useProtected'
import  Heading  from '../utils/Heading';
import Header from '../components/Header';
import Profile from "../components/Profile/Profile"
import { useSelector } from 'react-redux';
import Footer from '../components/Routes/Footer';
type Props = {}

const Page:FC<Props> = (props) => {
      const [open,setOpen] = useState(false);
      const [activeItem,setActiveItem] = useState(6);
      const [route,setRoute] = useState('Login');
      const {user}=useSelector((state:any)=>state.auth);
  return (
    <div className='min-h-screen'>
        <Protected>
             <Heading
        title={`${user?.name} profile -Elerning`}
        description="Elearning is a platform for online education."
        keywords="react,programming,education,learning"
      />
      <Header 
      open={open}
      setOpen={setOpen}
      activeItem={activeItem}
      setRoute={setRoute}
      route={route}
      
      />
      <Profile user={user}/>
      <Footer/>

        </Protected>
    </div>
  )
}

export default Page
