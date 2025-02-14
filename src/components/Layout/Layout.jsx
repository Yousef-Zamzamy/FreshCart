import React from 'react'
import style from "./Layout.module.css"
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return <> 
   <div className='flex flex-col justify-between h-screen'>
   <Navbar />
   <div className="container my-24 lg:my-12 py-2 lg:py-6 mx-auto">
   <Outlet />
   </div>
   <Footer />
   </div>
  </>
}