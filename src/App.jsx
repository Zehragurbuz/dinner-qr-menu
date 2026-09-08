import { Routes, Route } from 'react-router-dom'
import OrderForm from './pages/OrderForm/OrderForm'
import KitchenDisplay from './pages/KitchenDisplay/KitchenDisplay'

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrderForm />} />
      <Route path="/kitchen" element={<KitchenDisplay />} />
    </Routes>
  )
}

export default App