import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Update from './pages/Update'
import AddUser from './pages/AddUser'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/add' element={<AddUser/>} />
          <Route path='/update/:id' element={<Update/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
