import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Form from './pages/form'


const App = () => {
  return (
    <Routes>
       <Route path='/' element={<Form/>}></Route>
    </Routes>
  )
}

export default App
