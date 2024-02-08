import React from 'react'
import HomePage from './Paginas/HomePage';
import RegisterPage from './Paginas/RegisterPage';
import LoginPage from './Paginas/LoginPage';
import UserPage from './Paginas/UserPage';
import AdminPage from './Paginas/AdminPage';
import AdminPageUser from './Paginas/AdminPageUser';
import SobreNosotros from './Paginas/SobreNosotros';
import ProductPage from './Paginas/ProductPage';
import FavPage from './Paginas/FavPage';
import PrivateRoute from './Componentes/PrivateRoute';
import Err404 from './Componentes/Err404';
import { Route, Router, Routes } from 'react-router-dom';


const App = () => {
  return (
  <>
  <Router>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/user'  element={
        <PrivateRoute role={'user'}>
          <UserPage/>
        </PrivateRoute>}/>
        <Route path='/admin'  element={
        <PrivateRoute role={'admin'}>
          <AdminPage/>
        </PrivateRoute>}/>
        <Route path='/userAdmin'  element={
        <PrivateRoute role={'admin'}>
          <AdminPageUser/>
        </PrivateRoute>}/>
        <Route path='/sobreNosotros'  element={<SobreNosotros/>}/>
        <Route path='/productos/:id' element={<ProductPage/>}/>
        <Route path='/fav' element={
        <PrivateRoute role={'user'}>
          <FavPage/>
        </PrivateRoute>}/>
        <Route path='/Error' element={<Err404/>}/>
    </Routes>
  </Router>
  </>
  )
}

export default App