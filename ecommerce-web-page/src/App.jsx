import { Route, Routes } from 'react-router-dom'
import './App.css'
import CustomerRouters from './Routers/CustomerRouters'
import AdminRouters from './Routers/AdminRouters'

function App() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<CustomerRouters />}></Route>
        <Route path="/admin/*" element={<AdminRouters />}></Route>
      </Routes>
    </>
  )
}

export default App
