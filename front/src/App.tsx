import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PlanView from './pages/PlanView'
import TripRoute from './pages/TripRoute'
import EventView from './pages/EventView'
import ExploreHub from './pages/ExploreHub'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'

export default function App() {
  return (
    <div className="min-h-screen bg-canvas font-body">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plan/:tripId/:slug" element={<PlanView />} />
        <Route path="/trips/:routeSlug" element={<TripRoute />} />
        <Route path="/events/:eventSlug" element={<EventView />} />
        <Route path="/explore/staedtetrips-unter-:budget-euro" element={<ExploreHub />} />
        <Route path="/legal/impressum" element={<Impressum />} />
        <Route path="/legal/datenschutz" element={<Datenschutz />} />
      </Routes>
      <Footer />
    </div>
  )
}
