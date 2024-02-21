import React, { useEffect, useState } from 'react'
import axiosUrl, { configToken } from '../helps/axiosBase'
import { Col, Container, Row } from 'react-bootstrap'
import TableD from '../components/TableD'
import FooterC from '../components/FooterC'
import "../Css/TableD.css"
import NavbarC from '../components/NavbarC'

const AdminPageUser = () => {
  const [userData,setUserData]=useState([])

  const[load,setLoad]=useState(false)

  const rockUser=async()=>{
    const token=JSON.parse(sessionStorage.getItem("token"))||"";
    const config=configToken(token)
    const allRockU= await axiosUrl.get("/usuarios",config)
    setUserData(allRockU.data.getUserAll)
  }

  useEffect(()=>{
    rockUser()
  },[load])

  return (
    <div className='style-table'>
    <>
    <NavbarC userRockLoad={load} userSetRock={setLoad}/>
    <Container>
      <Row>
        <Col lg={"12"} sm={"12"} md={"12"}>
       <TableD loadUser={{setLoad,load}} data={userData}/>
        </Col>
      </Row>
    </Container>
    <FooterC/>
    </>
    </div>
  )
}

export default AdminPageUser