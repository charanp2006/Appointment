import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import DoctorProfile from './pages/DoctorProfile';
import HospitalProfile from './pages/HospitalProfile';
import BookAppointment from './pages/BookAppointment';
import Dashboard from './pages/Dashboard';
import InvalidPage from './pages/InvalidPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="/hospital/:id" element={<HospitalProfile />} />
            <Route path="/book/:type/:id" element={<BookAppointment />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<InvalidPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
