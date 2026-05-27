import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Landing from './pages/Landing/Landing'
import Recommendation from './pages/Recommendation/Recommendation'
import Community from './pages/Community/Community'
import Reviews from './pages/Reviews/Reviews'
import Auth from './pages/Auth/Auth'
import Quiz from './pages/Quiz/Quiz'
import About from './pages/About/About'
import Discover from './pages/Discover/Discover'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/auth'

  return (
    <div className="app">
      <ScrollToTop />
      {!isAuthPage && <Navbar />}
      <main className={isAuthPage ? '' : 'main-content'}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/routine" element={<Recommendation />} />
          <Route path="/community" element={<Community />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  )
}

export default App
