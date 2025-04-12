import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Form from './pages/form'



const App = () => {
  return (
    <Routes>
       <Route path='/' element={<Form/>}></Route>
       <Route path='/itenary' element={<Itenary/>}></Route>
    </Routes>
  )
}

export default App
