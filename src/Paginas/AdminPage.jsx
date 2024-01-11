
import React, { useEffect, useState } from 'react'
import axiosUrl from '../helps/axiosBase'
import TableC from '../Componentes/TableC'
import NavbarC from '../Componentes/NavbarC'
import FooterC from '../Componentes/FooterC'

const AdminPage = () => {

  const [rockProduct,setRockProduct]=useState([])

  const rockAllP=async()=>{
    const dataProductRock= await axiosUrl.get("/productos")
    setRockProduct(dataProductRock.data.getAllProducts)
  }

  useEffect(()=>{
    rockAllP()
  },[])

  useEffect(()=>{
    console.log(rockProduct)
  },[rockProduct])




  return (
    <>
    <div className='img-body'>
    <NavbarC/>
    <TableC data={rockProduct}/>
    <FooterC/>
    </div>
    </>
  )
}

export default AdminPage