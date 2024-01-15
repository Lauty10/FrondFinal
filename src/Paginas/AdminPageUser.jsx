import React, { useEffect, useState } from 'react'
import NavbarC from '../Componentes/NavbarC'
import axiosUrl from '../helps/axiosBase'
import { Col, Container, Row } from 'react-bootstrap'
import TableD from '../Componentes/TableD'
import "../Css/TableD.css"
import FooterC from '../Componentes/FooterC'

const AdminPageUser = () => {
  const [userData,setUserData]=useState([])
  const rockUser=async()=>{
    const allRockU= await axiosUrl.get("/usuarios")
    setUserData(allRockU.data.getUserAll)
  }

  useEffect(()=>{
    rockUser()
  },[])

  useEffect(()=>{
    console.log(userData)
  },[userData])
  return (
    <div className='style-table'>
    <>
    <NavbarC/>
    <Container>
      <Row>
        <Col lg={"12"} sm={"12"} md={"12"}>
        <TableD data={userData} />
        </Col>
      </Row>
    </Container>
    <FooterC/>
    </>
    </div>
  )
}

export default AdminPageUser