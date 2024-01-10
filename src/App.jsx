import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import HomePage from './Paginas/HomePage';
import RegisterPage from './Paginas/RegisterPage';
import LoginPage from './Paginas/LoginPage';
import UserPage from './Paginas/UserPage';
import AdminPage from './Paginas/AdminPage';

const App = () => {
  return (
  <>
  <Router>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/user'  element={<UserPage/>}/>
        <Route path='/admin'  element={<AdminPage/>}/>
    </Routes>
  </Router>
  </>
  )
}

export default App