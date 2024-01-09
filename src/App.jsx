import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import HomePage from './Paginas/HomePage';
import RegisterPage from './Paginas/RegisterPage';
import LoginPage from './Paginas/LoginPage';

const App = () => {
  return (
  <>
  <Router>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
    </Routes>
  </Router>
  </>
  )
}

export default App