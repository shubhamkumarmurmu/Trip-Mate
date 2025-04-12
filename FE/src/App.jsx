import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Form from './pages/form'
import { Layout } from 'lucide-react'
import DestinationsForm from './components/destinationsFrom'
import Itenary from './pages/Itenary'


const App = () => {
  return (
    <Routes>
       <Route path='/' element={<Form/>}></Route>
       <Route path='/itenary' element={<Itenary/>}></Route>
    </Routes>
  )
}

export default App
