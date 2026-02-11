import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ModelSelection from './components/ModelSelection'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Constuctor from './components/Constructor'
import Profile from './components/Profile'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ModelSelection />} />
        <Route path="/constuctor" element={<Constuctor />} />
        <Route path="/constuctor/:brand/:model" element={<Constuctor />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
