import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'
import CheckoutPage from './pages/CheckoutPage'
import ResultPage from './pages/ResultPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experience/:id" element={<DetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Layout>
  )
}

export default App