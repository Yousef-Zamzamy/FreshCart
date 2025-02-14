import React from 'react'
import style from "./Notfound.module.css"
import error from "../../assets/images/error.svg"
export default function Notfound() {
  return (
    <div className='my-4'>
      <img className='m-auto w-2/3' src={error} alt="" />
    </div>
  )
}
